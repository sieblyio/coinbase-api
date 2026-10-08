import { AxiosError, AxiosHeaders, AxiosRequestConfig } from 'axios';

import { AdvTradeGlobalAuthRequest } from '../types/request/advanced-trade-global-client.js';
import { AdvTradeGlobalAuthResult } from '../types/response/advanced-trade-global-client.js';
import { signJWT } from './jwtNode.js';

export const ADVANCED_TRADE_GLOBAL_AUTH_ENDPOINT = '/api/v2/public/auth';

interface GlobalAuthOptions {
  baseUrl: string;
  apiKey?: string;
  apiSecret?: string;
  jwtExpiresSeconds: number;
  getSignTimestampMs: () => number;
  traceLogs?: boolean;
}

/** Remove credentials from gateway error data, including credentials echoed in strings. */
function redactCredentials(value: any, secrets: string[]): any {
  if (typeof value === 'string') {
    return secrets.reduce(
      (text, secret) => text.split(secret).join('omittedFromError'),
      value,
    );
  }
  if (Array.isArray(value)) {
    return value.map((item) => redactCredentials(item, secrets));
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        /^(authorization|token|access_token|refresh_token|apiSecret|privateKey)$/i.test(
          key,
        )
          ? 'omittedFromError'
          : redactCredentials(item, secrets),
      ]),
    );
  }
  return value;
}

/**
 * Global derivatives use a CDP JWT exchange followed by a reusable Bearer token.
 * Keep token state here; send the exchange through the client's public POST path.
 * https://docs.cdp.coinbase.com/coinbase-app/advanced-trade-apis/guides/derivatives/technical
 */
export class AdvancedTradeGlobalAuth {
  private token?: { accessToken: string; refreshAtMs: number };

  private authentication?: Promise<string>;

  constructor(
    private readonly authOptions: GlobalAuthOptions,
    private readonly requestAuth: (
      params: AdvTradeGlobalAuthRequest,
    ) => Promise<AdvTradeGlobalAuthResult>,
  ) {}

  getAccessToken(): Promise<string> {
    if (this.token && Date.now() < this.token.refreshAtMs) {
      return Promise.resolve(this.token.accessToken);
    }
    if (!this.authentication) {
      this.authentication = this.authenticate().finally(() => {
        this.authentication = undefined;
      });
    }
    return this.authentication;
  }

  private async authenticate(): Promise<string> {
    const { apiKey, apiSecret, baseUrl, jwtExpiresSeconds, traceLogs } =
      this.authOptions;
    if (!apiKey || !apiSecret) {
      throw new Error(
        'API key and private key are required for Advanced Trade Global authentication.',
      );
    }

    const url = `${baseUrl}${ADVANCED_TRADE_GLOBAL_AUTH_ENDPOINT}`;
    const startedAtMs = Date.now();
    const expiresIn = Math.min(jwtExpiresSeconds, 120);
    // Bind the JWT to the authentication POST, not the subsequent private call.
    const jwt = await signJWT({
      url,
      method: 'POST',
      timestampMs: this.authOptions.getSignTimestampMs(),
      jwtExpiresSeconds: expiresIn,
      apiPubKey: apiKey,
      apiPrivKey: apiSecret,
    });

    if (traceLogs) {
      console.log('1. Advanced Trade Global JWT: ', {
        url,
        jwt,
        startedAtMs,
        expiresIn,
      });
    }

    const authRequestParams: AdvTradeGlobalAuthRequest = {
      grant_type: 'coinbase_cdp',
      token: jwt,
    };

    if (traceLogs) {
      console.log(
        '2. Advanced Trade Global requestAuth.request: ',
        authRequestParams,
      );
    }

    const result = await this.requestAuth(authRequestParams);

    if (traceLogs) {
      console.log('3. Advanced Trade Global requestAuth: ', result);
    }

    if (
      typeof result?.access_token !== 'string' ||
      !result.access_token.trim() ||
      typeof result.expires_in !== 'number' ||
      !Number.isFinite(result.expires_in) ||
      result.expires_in <= 0 ||
      typeof result.token_type !== 'string' ||
      result.token_type.toLowerCase() !== 'bearer'
    ) {
      throw new Error('Invalid Advanced Trade Global authentication response.');
    }

    // Coinbase recommends renewing HTTP auth every 15 minutes. Respect shorter
    // server lifetimes, allow a margin, and include time spent on the exchange.
    const lifetimeMs = Math.min(result.expires_in * 1000, 15 * 60 * 1000);
    const marginMs = Math.min(30_000, lifetimeMs / 10);
    const refreshAtMs = startedAtMs + lifetimeMs - marginMs;
    if (refreshAtMs <= Date.now()) {
      throw new Error(
        'Advanced Trade Global access token expired before it could be used.',
      );
    }
    this.token = { accessToken: result.access_token, refreshAtMs };
    return this.token.accessToken;
  }

  /** Invalidate only the rejected token, without replaying the failed request. */
  handleRequestError(error: any, options: AxiosRequestConfig): AxiosError {
    const authorization = new AxiosHeaders(options.headers as AxiosHeaders).get(
      'Authorization',
    );
    const usedToken =
      typeof authorization === 'string'
        ? authorization.replace(/^Bearer /i, '')
        : undefined;
    const rpcError = error.response?.data?.error;
    if (
      // 13009 means the token is invalid or expired, even over HTTP 200.
      (error.response?.status === 401 || rpcError?.code === 13009) &&
      usedToken &&
      this.token?.accessToken === usedToken
    ) {
      this.token = undefined;
    }

    // Strip Axios config/request objects, which contain authentication material,
    // even when the client has parseExceptions disabled.
    const secrets = [
      this.authOptions.apiKey,
      this.authOptions.apiSecret,
      usedToken,
      options.data?.params?.token,
    ].filter((value): value is string => typeof value === 'string' && !!value);
    const safeError = new AxiosError(
      redactCredentials(
        error.message ||
          rpcError?.message ||
          'Advanced Trade Global request failed.',
        secrets,
      ),
      error.code || (rpcError ? String(rpcError.code) : undefined),
    );
    if (error.response) {
      safeError.response = {
        status: error.response.status,
        statusText: redactCredentials(error.response.statusText, secrets),
        headers: redactCredentials(error.response.headers, secrets),
        data: redactCredentials(error.response.data, secrets),
        config: { headers: new AxiosHeaders() },
      };
    }
    return safeError;
  }
}
