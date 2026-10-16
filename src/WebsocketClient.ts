import { BaseWebsocketClient, EmittableEvent } from './lib/BaseWSClient.js';
import { signWSJWT } from './lib/jwtNode.js';
import { neverGuard } from './lib/misc-util.js';
import {
  isCBAdvancedTradeErrorEvent,
  isCBAdvancedTradeWSEvent,
  isCBExchangeWSEvent,
  isCBExchangeWSRequestOperation,
  isCBINTXWSRequestOperation,
  isCBPrimeWSRequestOperation,
} from './lib/websocket/typeGuards.js';
import {
  getCBExchangeWSSign,
  getCBInternationalWSSign,
  getCBPrimeWSSign,
  getMergedCBExchangeWSRequestOperations,
  getPromiseRefForWSAPIRequest,
  isAdvancedTradeGlobalWsKey,
  isMessageEvent,
  MessageEventLike,
  WS_KEY_MAP,
  WS_URL_MAP,
  WsKey,
  WsTopicRequest,
} from './lib/websocket/websocket-util.js';
import {
  WSConnectedResult,
  WsConnectionStateEnum,
} from './lib/websocket/WsStore.types.js';
import { AdvTradeGlobalAuthRequest } from './types/request/advanced-trade-global-client.js';
import { AdvTradeGlobalWSAuthResult } from './types/websockets/advanced-trade-global.js';
import { WsMarket } from './types/websockets/client.js';
import {
  WsAdvTradeGlobalRequestOperation,
  WsAdvTradeRequestOperation,
  WsExchangeAuthenticatedRequestOperation,
  WsExchangeRequestOperation,
  WsInternationalAuthenticatedRequestOperation,
  WsInternationalRequestOperation,
  WsOperation,
  WsPrimeAuthenticatedRequestOperation,
  WsPrimeRequestOperation,
} from './types/websockets/requests.js';
import {
  WSAPIRequest,
  WSAPIRequestFlags,
  WsAPITopicRequestParamMap,
  WsAPITopicResponseMap,
  WsAPIWsKeyTopicMap,
} from './types/websockets/wsAPI.js';

export const WS_LOGGER_CATEGORY = { category: 'coinbase-ws' };

/**
 * Any WS keys in this list will trigger automatic auth as required, if credentials are available
 */
const PRIVATE_WS_KEYS: WsKey[] = [
  // Account data (fills), requires auth.
  WS_KEY_MAP.advTradeUserData,
  WS_KEY_MAP.advTradeGlobalUserData,
  WS_KEY_MAP.advTradeGlobalWSAPI,
  // Coinbase Direct Market Data has direct access to Coinbase Exchange servers and requires auth.
  WS_KEY_MAP.exchangeDirectMarketData,
  // The INTX feed always requires auth.
  WS_KEY_MAP.internationalMarketData,
  // The Prime feed always requires auth.
  WS_KEY_MAP.primeMarketData,
];

/**
 * Any WS keys in this list will ALWAYS skip the authentication process, even if credentials are available
 */
export const PUBLIC_WS_KEYS: WsKey[] = [
  WS_KEY_MAP.advTradeMarketData,
  WS_KEY_MAP.advTradeGlobalMarketData,
  WS_KEY_MAP.exchangeMarketData,
];

/**
 * WS topics are always a string for this exchange. Some exchanges use complex objects.
 */
type WsTopic = string;

export class WebsocketClient extends BaseWebsocketClient<WsKey> {
  private globalAuthRequests: Partial<
    Record<WsKey, { id: number; startedAtMs: number }>
  > = {};

  /** Tracks either the pending auth reply or the next session renewal. */
  private globalAuthTimers: Partial<
    Record<WsKey, ReturnType<typeof setTimeout>>
  > = {};

  private globalLogoutRequestId?: number;

  /**
   * Preconnect the original product feeds, preserving the existing connection set.
   * Global connections open on demand and are excluded from this method.
   * Use connect(wsKey) to preconnect a specific feed, or connectWSAPI() for an authenticated Global WS API session.
   */
  public connectAll(): Promise<(WSConnectedResult | undefined)[]> {
    return Promise.all([
      this.connect(WS_KEY_MAP.advTradeMarketData),
      this.connect(WS_KEY_MAP.advTradeUserData),
      this.connect(WS_KEY_MAP.exchangeMarketData),
      this.connect(WS_KEY_MAP.exchangeDirectMarketData),
      this.connect(WS_KEY_MAP.internationalMarketData),
      this.connect(WS_KEY_MAP.primeMarketData),
    ]);
  }

  /**
   * Request subscription to one or more topics. Pass topics as either an array of strings, or array of objects (if the topic has parameters).
   * Objects should be formatted as {topic: string, params: object}.
   *
   * - Subscriptions are automatically routed to the correct websocket connection.
   * - Authentication/connection is automatic.
   * - Resubscribe after network issues is automatic.
   *
   * Call `unsubscribe(topics)` to remove topics
   */
  public subscribe(
    requests:
      | (WsTopicRequest<WsTopic> | WsTopic)
      | (WsTopicRequest<WsTopic> | WsTopic)[],
    wsKey: WsKey,
  ) {
    if (!Array.isArray(requests)) {
      this.subscribeTopicsForWsKey([requests], wsKey);
      return;
    }

    if (requests.length) {
      this.subscribeTopicsForWsKey(requests, wsKey);
    }
  }

  /**
   * Unsubscribe from one or more topics. Similar to subscribe() but in reverse.
   *
   * - Requests are automatically routed to the correct websocket connection.
   * - These topics will be removed from the topic cache, so they won't be subscribed to again.
   */
  public unsubscribe(
    requests:
      | (WsTopicRequest<WsTopic> | WsTopic)
      | (WsTopicRequest<WsTopic> | WsTopic)[],
    wsKey: WsKey,
  ) {
    if (!Array.isArray(requests)) {
      this.unsubscribeTopicsForWsKey([requests], wsKey);
      return;
    }

    if (requests.length) {
      this.unsubscribeTopicsForWsKey(requests, wsKey);
    }
  }

  /** Prepare the Global WS API connection and authenticate before the first private call. */
  public connectWSAPI(): Promise<unknown> {
    return this.assertIsAuthenticated(WS_KEY_MAP.advTradeGlobalWSAPI);
  }

  /**
   * Send a Global JSON-RPC method and await its matching reply. Public methods do not require auth.
   * Pending calls reject on API errors, timeout or disconnect.
   * The reply timeout starts after sending; connection/authentication use their own lifecycle handling.
   * public/auth signs automatically and uses the authentication timeout.
   * private/logout resolves on the server's normal close.
   */
  public sendWSAPIRequest<
    TWSKey extends keyof WsAPIWsKeyTopicMap,
    TMethod extends WsAPIWsKeyTopicMap[TWSKey],
  >(
    wsKey: TWSKey,
    method: TMethod,
    ...args: undefined extends WsAPITopicRequestParamMap[TMethod]
      ? [
          params?: WsAPITopicRequestParamMap[TMethod],
          requestFlags?: WSAPIRequestFlags,
        ]
      : [
          params: WsAPITopicRequestParamMap[TMethod],
          requestFlags?: WSAPIRequestFlags,
        ]
  ): Promise<WsAPITopicResponseMap[TMethod]>;

  public async sendWSAPIRequest(
    wsKey: keyof WsAPIWsKeyTopicMap,
    method: keyof WsAPITopicRequestParamMap,
    params?: unknown,
    requestFlags?: WSAPIRequestFlags,
  ): Promise<any> {
    if (wsKey !== WS_KEY_MAP.advTradeGlobalWSAPI) {
      throw new Error(`WS API requests are not supported on "${wsKey}"`);
    }

    if (this.globalLogoutRequestId !== undefined) {
      throw new Error('Global WS API logout is in progress');
    }

    const timeoutMs =
      requestFlags?.requestTimeout ?? this.options.wsAPITimeout ?? 10_000;

    if (!Number.isFinite(timeoutMs) || timeoutMs <= 0)
      throw new Error('WS API timeout must be positive');

    const timeoutMessage = `WS API request "${method}" timed out`;
    await this.assertIsConnected(wsKey);

    // An explicit auth call renews the session even if already authenticated.
    if (method === 'public/auth') {
      const authenticated = (await this.assertIsAuthenticated(wsKey, true)) as {
        event: object;
      };
      return { ...authenticated.event, wsKey, isWSAPIResponse: true };
    }

    if (
      method.startsWith('private/') &&
      requestFlags?.authIsOptional !== true
    ) {
      await this.assertIsAuthenticated(wsKey);
    }

    const request: WSAPIRequest = {
      jsonrpc: '2.0',
      id: Number(this.getNewRequestId()),
      method,
      params: params ?? {},
    };

    const promiseRef = getPromiseRefForWSAPIRequest(request);
    const store = this.getWsStore();
    const ws = store.getWs(wsKey);
    const pending = store.createDeferredPromise(wsKey, promiseRef, true);

    let timer: ReturnType<typeof setTimeout> | undefined;

    try {
      if (method === 'private/logout') {
        this.globalLogoutRequestId = request.id;
      }

      try {
        this.tryWsSend(wsKey, JSON.stringify(request), true);
        timer = setTimeout(() => {
          store.rejectDeferredPromise(
            wsKey,
            promiseRef,
            new Error(timeoutMessage),
            true,
          );
        }, timeoutMs);
        if (method === 'private/logout') {
          // Let the server process logout and close. Sending our own close first
          // could trigger cancel-on-disconnect before logout has been processed.
          store.setConnectionState(wsKey, WsConnectionStateEnum.CLOSING);
          this.clearTimers(wsKey);
        }
      } catch (error) {
        store.rejectDeferredPromise(wsKey, promiseRef, error, true);
      }

      const response = await pending.promise;

      if (method === 'private/logout') return;

      return { ...response, request: { ...request, wsKey } };
    } catch (error) {
      if (
        method === 'private/logout' &&
        store.getWs(wsKey) === ws &&
        ws?.readyState === ws?.OPEN
      ) {
        this.close(wsKey, true);
      }

      const failure =
        typeof error === 'object' && error !== null
          ? error
          : new Error(String(error));

      Object.assign(failure, { request: { ...request, wsKey } });

      throw failure;
    } finally {
      clearTimeout(timer);
      store.removeDeferredPromise(wsKey, promiseRef);
      if (method === 'private/logout') this.globalLogoutRequestId = undefined;
    }
  }

  /**
   *
   * Internal methods
   *
   */

  /**
   * Return a websocket URL, which is connected to as-is.
   * If a token or anything else is needed in the URL, this is a good place to add it.
   */
  protected async getWsUrl(wsKey: WsKey): Promise<string> {
    if (this.options.wsUrl) {
      return this.options.wsUrl;
    }

    const useSandbox = this.options.useSandbox;
    const networkKey = useSandbox ? 'testnet' : 'livenet';

    const baseUrl = WS_URL_MAP[wsKey][networkKey];

    return baseUrl;
  }

  protected sendPingEvent(wsKey: WsKey) {
    const wsState = this.getWsStore().get(wsKey);
    const ws = wsState?.ws;
    ws?.ping();
  }

  protected sendPongEvent(wsKey: WsKey) {
    if (isAdvancedTradeGlobalWsKey(wsKey)) {
      // Reply to the gateway's JSON-RPC test_request. Protocol ping frames are handled by BaseWSClient.
      this.tryWsSend(
        wsKey,
        JSON.stringify({
          jsonrpc: '2.0',
          id: Number(this.getNewRequestId()),
          method: 'public/test',
          params: {},
        }),
      );
      return;
    }

    try {
      this.logger.trace('Sending upstream ws PONG: ', {
        ...WS_LOGGER_CATEGORY,
        wsMessage: 'PONG',
        wsKey,
      });
      if (!wsKey) {
        throw new Error('Cannot send PONG, no wsKey provided');
      }

      const wsState = this.getWsStore().get(wsKey);
      if (!wsState || !wsState?.ws) {
        throw new Error(`Cannot send pong, ${wsKey} socket not connected yet`);
      }

      // Send a protocol layer pong
      wsState.ws.pong();
    } catch (e) {
      this.logger.error('Failed to send WS PONG', {
        ...WS_LOGGER_CATEGORY,
        wsMessage: 'PONG',
        wsKey,
        exception: e,
      });
    }
  }

  protected isWsPing(msg: any, wsKey: WsKey): boolean {
    if (isAdvancedTradeGlobalWsKey(wsKey)) {
      if (!isMessageEvent(msg)) {
        return false;
      }

      try {
        const parsed = JSON.parse(msg.data);
        return (
          parsed?.method === 'heartbeat' &&
          parsed.params?.type === 'test_request'
        );
      } catch {
        // Let the normal message parser report malformed JSON.
        return false;
      }
    }

    if (msg?.data === 'ping') {
      return true;
    }
    return false;
  }

  protected isWsPong(msg: any, wsKey: WsKey): boolean {
    if (isAdvancedTradeGlobalWsKey(wsKey)) {
      // Global uses native pong frames. JSON payloads can contain "pong" in
      // tokens, order labels or other user data and must reach the normal parser.
      return false;
    }
    if (msg?.data?.includes('pong')) {
      return true;
    }

    // this.logger.info(`Not a pong: `, msg);
    return false;
  }

  protected resolveEmittableEvents(
    wsKey: WsKey,
    event: MessageEventLike,
  ): EmittableEvent[] {
    const results: EmittableEvent[] = [];

    try {
      const parsed = JSON.parse(event.data);

      if (isAdvancedTradeGlobalWsKey(wsKey)) {
        if (
          (wsKey === WS_KEY_MAP.advTradeGlobalUserData ||
            wsKey === WS_KEY_MAP.advTradeGlobalWSAPI) &&
          this.globalAuthRequests[wsKey] &&
          parsed.id === this.globalAuthRequests[wsKey].id
        ) {
          const { startedAtMs } = this.globalAuthRequests[wsKey];
          this.globalAuthRequests[wsKey] = undefined;
          clearTimeout(this.globalAuthTimers[wsKey]);
          this.globalAuthTimers[wsKey] = undefined;

          if (parsed.error) {
            this.handleGlobalAuthFailure(wsKey, { ...parsed, wsKey });
            return [{ eventType: 'exception', event: parsed }];
          }

          const result: AdvTradeGlobalWSAuthResult | undefined = parsed.result;
          if (
            result?.token_type !== 'bearer' ||
            !Number.isFinite(result.expires_in) ||
            result.expires_in <= 0
          ) {
            this.handleGlobalAuthFailure(
              wsKey,
              new Error('Global WebSocket authentication failed'),
            );
            return [
              {
                eventType: 'exception',
                event: {
                  message: 'Invalid Global WebSocket authentication response',
                  id: parsed.id,
                },
              },
            ];
          }

          // Renew on the same socket with a fresh CDP JWT. The session, rather than
          // an access token attached to each subscription, authorizes requests.
          const lifetimeMs = Math.min(result.expires_in * 1000, 50 * 60 * 1000);
          const marginMs = Math.min(30_000, lifetimeMs / 10);
          const refreshInMs = startedAtMs + lifetimeMs - marginMs - Date.now();
          if (refreshInMs <= 0) {
            this.handleGlobalAuthFailure(
              wsKey,
              new Error('Global WebSocket authentication failed'),
            );
            return [
              {
                eventType: 'exception',
                event: {
                  message:
                    'Global WebSocket authentication expired before its reply arrived',
                  id: parsed.id,
                },
              },
            ];
          }
          this.globalAuthTimers[wsKey] = setTimeout(() => {
            this.sendAuthRequest(wsKey).catch(() => {});
          }, refreshInMs);
          return [
            {
              eventType: 'authenticated',
              event: {
                ...parsed,
                ...(wsKey === WS_KEY_MAP.advTradeGlobalWSAPI
                  ? { isWSAPI: true, WSAPIAuthChannel: 'public/auth' }
                  : {}),
              },
            },
          ];
        }

        if (wsKey === WS_KEY_MAP.advTradeGlobalWSAPI && 'id' in parsed) {
          const promiseRef = getPromiseRefForWSAPIRequest(parsed);
          const response = { ...parsed, wsKey, isWSAPIResponse: true };
          if (parsed.error) {
            this.getWsStore().rejectDeferredPromise(
              wsKey,
              promiseRef,
              response,
              true,
            );
            return [{ eventType: 'exception', event: response }];
          }
          this.getWsStore().resolveDeferredPromise(
            wsKey,
            promiseRef,
            response,
            true,
          );
          return [{ eventType: 'response', event: response }];
        }

        if (parsed.error) {
          return [{ eventType: 'exception', event: parsed }];
        }

        if (parsed.method === 'subscription') {
          return [{ eventType: 'update', event: parsed }];
        }

        if (parsed.method === 'heartbeat') {
          // Passive heartbeat notification. test_request is handled by the ping/pong hooks.
          return [{ eventType: 'response', event: parsed }];
        }

        // Preserve the JSON-RPC envelope for subscription acknowledgements and liveness replies.
        if ('id' in parsed) {
          return [{ eventType: 'response', event: parsed }];
        }
      }

      const responseEvents = ['subscriptions'];

      // E.g. {"type":"error","message":"rate limit exceeded","wsKey":"advTradeMarketData"}
      if (isCBAdvancedTradeErrorEvent(parsed)) {
        return [{ eventType: 'exception', event: parsed }];
      }

      // Parse Advanced Trade WS events (update & response)
      if (isCBAdvancedTradeWSEvent(parsed)) {
        const eventType = parsed.channel;

        // These are request/reply pattern events (e.g. after subscribing to topics or authenticating)
        if (responseEvents.includes(eventType)) {
          return [
            {
              eventType: 'response',
              event: parsed,
            },
          ];
        }

        // Generic data for a channel
        if (typeof eventType === 'string') {
          return [
            {
              eventType: 'update',
              event: parsed,
            },
          ];
        }
      }

      // Parse CB Exchange WS events
      if (isCBExchangeWSEvent(parsed, wsKey)) {
        const eventType = parsed.type;

        if (responseEvents.includes(eventType)) {
          return [
            {
              eventType: 'response',
              event: parsed,
            },
          ];
        }

        // Generic data for a channel
        if (typeof eventType === 'string') {
          return [
            {
              eventType: 'update',
              event: parsed,
            },
          ];
        }
      }

      this.logger.error(
        `!! (${wsKey}) Unhandled non-string event type... Defaulting to "update" channel...` +
          JSON.stringify(parsed),
      );

      return [
        {
          eventType: 'update',
          event: parsed,
        },
      ];
    } catch (e) {
      results.push({
        event: {
          message: 'Failed to parse event data due to exception',
          exception: e,
          eventData: event.data,
        },
        eventType: 'exception',
      });

      this.logger.error('Failed to parse event data due to exception: ', {
        exception: e,
        eventData: event.data,
      });
    }

    return results;
  }

  /**
   * Determines if a topic is for a private channel, using a hardcoded list of strings
   */
  protected isPrivateTopicRequest(
    request: WsTopicRequest<string>,
    wsKey: WsKey,
  ): boolean {
    return request && PRIVATE_WS_KEYS.includes(wsKey);
  }

  protected getWsKeyForMarket(market: WsMarket, isPrivate: boolean): WsKey {
    switch (market) {
      case 'advancedTrade': {
        return isPrivate
          ? WS_KEY_MAP.advTradeUserData
          : WS_KEY_MAP.advTradeMarketData;
      }
      case 'advancedTradeGlobal': {
        return isPrivate
          ? WS_KEY_MAP.advTradeGlobalUserData
          : WS_KEY_MAP.advTradeGlobalMarketData;
      }
      case 'exchange': {
        return isPrivate
          ? WS_KEY_MAP.exchangeDirectMarketData
          : WS_KEY_MAP.exchangeMarketData;
      }
      case 'international': {
        return isPrivate
          ? WS_KEY_MAP.internationalMarketData
          : WS_KEY_MAP.internationalMarketData;
      }
      case 'prime': {
        return isPrivate
          ? WS_KEY_MAP.primeMarketData
          : WS_KEY_MAP.primeMarketData;
      }
      default: {
        throw neverGuard(market, `Unhandled "market": "${market}"`);
      }
    }
  }

  protected getWsMarketForWsKey(wsKey: WsKey): WsMarket {
    switch (wsKey) {
      case WS_KEY_MAP.advTradeMarketData:
      case WS_KEY_MAP.advTradeUserData: {
        return 'advancedTrade';
      }
      case WS_KEY_MAP.advTradeGlobalMarketData:
      case WS_KEY_MAP.advTradeGlobalUserData:
      case WS_KEY_MAP.advTradeGlobalWSAPI: {
        return 'advancedTradeGlobal';
      }
      case WS_KEY_MAP.exchangeMarketData:
      case WS_KEY_MAP.exchangeDirectMarketData: {
        return 'exchange';
      }
      case WS_KEY_MAP.internationalMarketData: {
        return 'international';
      }
      case WS_KEY_MAP.primeMarketData: {
        return 'prime';
      }
      default: {
        throw neverGuard(wsKey, `Unhandled WsKey: "${wsKey}"`);
      }
    }
  }

  protected getPrivateWSKeys(): WsKey[] {
    return PRIVATE_WS_KEYS;
  }

  protected authPrivateConnectionsOnConnect(wsKey: WsKey): boolean {
    if (wsKey === WS_KEY_MAP.advTradeGlobalWSAPI) {
      return (
        this.options.reauthWSAPIOnReconnect !== false &&
        !!this.getWsStore().get(wsKey)?.didAuthWSAPI
      );
    }
    return (
      wsKey === WS_KEY_MAP.advTradeGlobalUserData ||
      super.authPrivateConnectionsOnConnect(wsKey)
    );
  }

  protected clearTimers(wsKey: WsKey) {
    super.clearTimers(wsKey);
    if (
      wsKey === WS_KEY_MAP.advTradeGlobalUserData ||
      wsKey === WS_KEY_MAP.advTradeGlobalWSAPI
    ) {
      clearTimeout(this.globalAuthTimers[wsKey]);
      this.globalAuthTimers[wsKey] = undefined;
      this.globalAuthRequests[wsKey] = undefined;
    }
  }

  protected onWsClose(event: unknown, wsKey: WsKey) {
    if (
      wsKey === WS_KEY_MAP.advTradeGlobalWSAPI &&
      this.globalLogoutRequestId !== undefined
    ) {
      const code = (event as { code?: number })?.code;
      if (code === 1000) {
        this.getWsStore().resolveDeferredPromise(
          wsKey,
          getPromiseRefForWSAPIRequest({ id: this.globalLogoutRequestId }),
          undefined,
          true,
        );
      }
    }
    super.onWsClose(event, wsKey);
  }

  private handleGlobalAuthFailure(wsKey: WsKey, error: unknown) {
    this.getWsStore().rejectAuthenticationInProgressPromise(wsKey, error);
    const state = this.getWsStore().get(wsKey);
    if (!state) return;
    const wasAuthenticated = state.isAuthenticated;
    state.isAuthenticated = false;
    // A failed renewal cannot leave a stale session looking healthy. Reconnect
    // and authenticate again; initial auth failures are surfaced without looping.
    if (wasAuthenticated) state.ws?.close();
  }

  /** Force subscription requests to be sent in smaller batches, if a number is returned */
  protected getMaxTopicsPerSubscribeEvent(wsKey: WsKey): number | null {
    switch (wsKey) {
      case WS_KEY_MAP.advTradeMarketData:
      case WS_KEY_MAP.advTradeUserData:
      // Technically, INTX supports request batching but not with nested parameters, so we'll send one at a time
      case WS_KEY_MAP.internationalMarketData:
        return 1;
      // Exchange supports request batching, no known limit to max topics per request
      case WS_KEY_MAP.exchangeDirectMarketData:
      case WS_KEY_MAP.exchangeMarketData: {
        return null;
      }
      default: {
        return null;
      }
    }
  }

  /**
   * Map one or more topics into fully prepared "subscribe request" events (already stringified and ready to send)
   */
  protected async getWsOperationEventsForTopics(
    topicRequests: WsTopicRequest<string>[],
    wsKey: WsKey,
    operation: WsOperation,
  ): Promise<string[]> {
    if (!topicRequests.length) {
      return [];
    }

    if (isAdvancedTradeGlobalWsKey(wsKey)) {
      // Unlike the older Advanced Trade feed, Global accepts all channels in one request.
      const request: WsAdvTradeGlobalRequestOperation = {
        jsonrpc: '2.0',
        id: Number(this.getNewRequestId()),
        method: `${wsKey === WS_KEY_MAP.advTradeGlobalMarketData ? 'public' : 'private'}/${operation}`,
        params: { channels: topicRequests.map(({ topic }) => topic) },
      };
      return [JSON.stringify(request)];
    }

    const apiKey = this.options.apiKey;
    const apiSecret = this.options.apiSecret;
    const apiPassphrase = this.options.apiPassphrase;

    /**
     * Operations need to be structured in a way that this exchange understands.
     * Parse the internal format into the format expected by the exchange. One request per operation.
     */
    const operationEvents = topicRequests.map((topicRequest) => {
      switch (wsKey) {
        case WS_KEY_MAP.advTradeMarketData:
        case WS_KEY_MAP.advTradeUserData: {
          const wsRequestEvent: WsAdvTradeRequestOperation<WsTopic> = {
            type: operation,
            channel: topicRequest.topic,
            ...topicRequest.payload,
          };

          return wsRequestEvent;
        }
        case WS_KEY_MAP.exchangeMarketData:
        case WS_KEY_MAP.exchangeDirectMarketData: {
          const wsRequestEvent: WsExchangeRequestOperation<WsTopic> = {
            type: operation,
            channels: [
              topicRequest.payload
                ? {
                    name: topicRequest.topic,
                    ...topicRequest.payload,
                  }
                : topicRequest.topic,
            ],
          };

          return wsRequestEvent;
        }
        case WS_KEY_MAP.internationalMarketData: {
          // In case there's ever more operation types than "subscribe" and "unsubscribe"
          if (!['subscribe', 'unsubscribe'].includes(operation)) {
            throw new Error(
              `Unhandled request operation type for CB International WS: "${operation}"`,
            );
          }

          const wsRequestEvent: WsInternationalRequestOperation<WsTopic> = {
            type: operation === 'subscribe' ? 'SUBSCRIBE' : 'UNSUBSCRIBE',
            // As of Sep 2024, parameters (such as product_id[]) cannot be nested with the channels array
            channels: [topicRequest.topic],
            // This merges parametrs (such as product_id[]) into the top level request object
            ...topicRequest.payload,
          };

          return wsRequestEvent;
        }
        case WS_KEY_MAP.primeMarketData: {
          const wsRequestEvent: WsPrimeRequestOperation<WsTopic> = {
            type: operation,
            channel: topicRequest.topic,
            ...topicRequest.payload,
          };

          return wsRequestEvent;
        }
        default: {
          throw new Error(
            `Not implemented for "${wsKey}" yet - if you need Prime or INTX, please get in touch.`,
          );
        }
      }
    });

    const maxTopicsPerEvent = this.getMaxTopicsPerSubscribeEvent(wsKey);
    const isPrivateChannel = PRIVATE_WS_KEYS.includes(wsKey);

    /**
     * - Merge commands into one if the exchange supports batch requests,
     * - Apply auth/sign, if needed,
     * - Apply any final formatting to return a string array, ready to be sent upstream.
     */
    switch (wsKey) {
      case WS_KEY_MAP.advTradeMarketData:
      case WS_KEY_MAP.advTradeUserData: {
        // Events that are ready to send (usually stringified JSON)
        // ADV trade only supports sending one at a time, so we don't try to merge them
        // These are already signed, if needed.
        const signedEvents: string[] = [];

        for (const evt of operationEvents) {
          if (!isPrivateChannel) {
            signedEvents.push(JSON.stringify(evt));
            continue;
          }

          if (!apiKey || !apiSecret) {
            throw new Error(
              '"options.apiKey" (api key name) and/or "options.apiSecret" missing, unable to generate JWT',
            );
          }
          const jwtExpiresSeconds = this.options.jwtExpiresSeconds || 120;
          const timestamp = Date.now();

          /**
           * No batching is supported for this product group, so we can already
           * handle sign here and return it as is
           */
          const sign = await signWSJWT({
            timestampMs: timestamp,
            jwtExpiresSeconds,
            apiPubKey: apiKey,
            apiPrivKey: apiSecret,
          });

          const operationEventWithSign = {
            ...evt,
            jwt: sign,
          };

          signedEvents.push(JSON.stringify(operationEventWithSign));
        }

        return signedEvents;
      }
      case WS_KEY_MAP.exchangeMarketData:
      case WS_KEY_MAP.exchangeDirectMarketData: {
        if (
          !operationEvents.every((evt) =>
            isCBExchangeWSRequestOperation(evt, wsKey),
          )
        ) {
          // Don't expect this to ever happen, but just to please typescript...
          throw new Error(
            'Unexpected request schema for exchange WS request builder',
          );
        }

        const mergedOperationEvents =
          getMergedCBExchangeWSRequestOperations(operationEvents);

        // We're under the max topics per request limit.
        // Send operation requests as one merged request
        if (
          !maxTopicsPerEvent ||
          mergedOperationEvents.channels.length <= maxTopicsPerEvent
        ) {
          if (!isPrivateChannel) {
            return [JSON.stringify(mergedOperationEvents)];
          }

          if (!apiKey || !apiSecret || !apiPassphrase) {
            throw new Error(
              'One or more of apiKey, apiSecret and/or apiPassphrase are missing. These must be provided to use private channels.',
            );
          }

          const { sign, timestampInSeconds } =
            await getCBExchangeWSSign(apiSecret);

          const mergedOperationEventsWithSign: WsExchangeAuthenticatedRequestOperation<WsTopic> =
            {
              ...mergedOperationEvents,
              signature: sign,
              key: apiKey,
              passphrase: apiPassphrase,
              timestamp: timestampInSeconds,
            };

          return [JSON.stringify(mergedOperationEventsWithSign)];
        }

        // We're over the max topics per request limit. Break into batches.
        const finalOperations: string[] = [];
        for (
          let i = 0;
          i < mergedOperationEvents.channels.length;
          i += maxTopicsPerEvent
        ) {
          const batchChannels = mergedOperationEvents.channels.slice(
            i,
            i + maxTopicsPerEvent,
          );

          const wsRequestEvent: WsExchangeRequestOperation<WsTopic> = {
            type: mergedOperationEvents.type,
            channels: [...batchChannels],
          };

          if (isPrivateChannel) {
            if (!apiKey || !apiSecret || !apiPassphrase) {
              throw new Error(
                'One or more of apiKey, apiSecret and/or apiPassphrase are missing. These must be provided to use private channels.',
              );
            }

            const { sign, timestampInSeconds } =
              await getCBExchangeWSSign(apiSecret);

            const wsRequestEventWithSign: WsExchangeAuthenticatedRequestOperation<WsTopic> =
              {
                ...wsRequestEvent,
                signature: sign,
                key: apiKey,
                passphrase: apiPassphrase,
                timestamp: timestampInSeconds,
              };
            finalOperations.push(JSON.stringify(wsRequestEventWithSign));
          } else {
            finalOperations.push(JSON.stringify(wsRequestEvent));
          }
        }

        return finalOperations;
      }
      case WS_KEY_MAP.internationalMarketData: {
        if (
          !operationEvents.every((evt) =>
            isCBINTXWSRequestOperation(evt, wsKey),
          )
        ) {
          // Don't expect this to ever happen, but just to please typescript...
          throw new Error(
            'Unexpected request schema for exchange WS request builder',
          );
        }

        // We're over the max topics per request limit. Break into batches.
        const finalOperations: string[] = [];
        for (const operationEvent of operationEvents) {
          if (!apiKey || !apiSecret || !apiPassphrase) {
            throw new Error(
              'One or more of apiKey, apiSecret and/or apiPassphrase are missing. These must be provided to use private channels.',
            );
          }

          const { sign, timestampInSeconds } = await getCBInternationalWSSign(
            apiKey,
            apiSecret,
            apiPassphrase,
          );

          const wsRequestEventWithSign: WsInternationalAuthenticatedRequestOperation<WsTopic> =
            {
              ...operationEvent,
              time: timestampInSeconds,
              key: apiKey,
              passphrase: apiPassphrase,
              signature: sign,
            };

          finalOperations.push(JSON.stringify(wsRequestEventWithSign));
        }

        // throw new Error(
        //   'CB INTX is not fully implemented yet - awaiting test environment... if you need this, please get in touch.',
        // );
        return finalOperations;
      }
      case WS_KEY_MAP.primeMarketData: {
        if (
          !operationEvents.every((evt) =>
            isCBPrimeWSRequestOperation(evt, wsKey),
          )
        ) {
          // Don't expect this to ever happen, but just to please typescript...
          throw new Error(
            'Unexpected request schema for exchange WS request builder',
          );
        }
        if (!apiKey || !apiSecret || !apiPassphrase) {
          throw new Error(
            'One or more of apiKey, apiSecret and/or apiPassphrase are missing. These must be provided to use private channels.',
          );
        }

        const finalOperations: string[] = [];
        for (const operationEvent of operationEvents) {
          const { sign, timestampInSeconds } = await getCBPrimeWSSign({
            channelName: operationEvent.channel,
            svcAccountId: operationEvent.svcAccountId,
            portfolioId: operationEvent.portfolio_id,
            apiKey,
            apiSecret,
            product_ids: operationEvent.product_ids,
          });

          const wsRequestEventWithSign: WsPrimeAuthenticatedRequestOperation<WsTopic> =
            {
              ...operationEvent,
              api_key_id: apiKey,
              access_key: apiSecret,
              passphrase: apiPassphrase,
              signature: sign,
              timestamp: timestampInSeconds,
            };

          finalOperations.push(JSON.stringify(wsRequestEventWithSign));
        }

        // throw new Error(
        //   'CB Prime is not fully implemented yet - awaiting test environment... if you need this, please get in touch.',
        // );
        return finalOperations;
      }
      default: {
        throw neverGuard(wsKey, `Not implemented for "${wsKey}" yet`);
        // throw new Error(`Not implemented for "${wsKey}" yet`);
      }
    }
  }

  /**
   * Global authenticates the socket session; older Coinbase feeds sign per request.
   */
  protected async getWsAuthRequestEvent(wsKey: WsKey): Promise<object> {
    if (
      wsKey === WS_KEY_MAP.advTradeGlobalUserData ||
      wsKey === WS_KEY_MAP.advTradeGlobalWSAPI
    ) {
      const { apiKey, apiSecret, jwtExpiresSeconds } = this.options;
      if (!apiKey || !apiSecret) {
        throw new Error(
          'API key and private key are required for Global WebSocket authentication.',
        );
      }

      const ws = this.getWsStore().getWs(wsKey);
      let token: string;
      try {
        token = await signWSJWT({
          timestampMs: Date.now(),
          jwtExpiresSeconds: Math.min(jwtExpiresSeconds || 120, 120),
          apiPubKey: apiKey,
          apiPrivKey: apiSecret,
        });
      } catch (error) {
        if (this.getWsStore().getWs(wsKey) === ws && this.isConnected(wsKey)) {
          this.handleGlobalAuthFailure(
            wsKey,
            new Error('Global WebSocket authentication failed'),
          );
        }
        throw error;
      }
      if (this.getWsStore().getWs(wsKey) !== ws || !this.isConnected(wsKey)) {
        throw new Error(
          'Global WebSocket closed while signing authentication.',
        );
      }
      const id = Number(this.getNewRequestId());
      this.globalAuthRequests[wsKey] = { id, startedAtMs: Date.now() };
      clearTimeout(this.globalAuthTimers[wsKey]);
      this.globalAuthTimers[wsKey] = setTimeout(() => {
        this.globalAuthRequests[wsKey] = undefined;
        this.globalAuthTimers[wsKey] = undefined;
        this.emit('exception', {
          wsKey,
          message: 'Global WebSocket authentication timed out',
          id,
        });
        this.handleGlobalAuthFailure(
          wsKey,
          new Error('Global WebSocket authentication failed'),
        );
      }, 10_000);
      const params: AdvTradeGlobalAuthRequest = {
        grant_type: 'coinbase_cdp',
        token,
      };
      return { jsonrpc: '2.0', id, method: 'public/auth', params };
    }
    return { wsKey };
  }
}
