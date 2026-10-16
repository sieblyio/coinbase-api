import { WS_KEY_MAP } from '../../lib/websocket/websocket-util.js';
import {
  AdvTradeGlobalAuthResult,
  AdvTradeGlobalBookState,
  AdvTradeGlobalGetAnnouncementsItem,
  AdvTradeGlobalInstrument,
  AdvTradeGlobalKind,
  AdvTradeGlobalOrder,
  AdvTradeGlobalPosition,
  AdvTradeGlobalPublicTrade,
  AdvTradeGlobalTestResult,
  AdvTradeGlobalTickerNotification,
  AdvTradeGlobalUserTrade,
} from '../response/advanced-trade-global-client.js';

/** Public Global Derivatives channels. The raw interval requires authentication. */
export type AdvTradeGlobalPublicWSInterval = '100ms' | 'agg2';
export type AdvTradeGlobalPrivateWSInterval =
  | AdvTradeGlobalPublicWSInterval
  | 'raw';
export type AdvTradeGlobalWsKey =
  | typeof WS_KEY_MAP.advTradeGlobalMarketData
  | typeof WS_KEY_MAP.advTradeGlobalUserData
  | typeof WS_KEY_MAP.advTradeGlobalWSAPI;
export type AdvTradeGlobalWSBookGroup =
  | 'none'
  | 1
  | 2
  | 5
  | 10
  | 25
  | 100
  | 250;
export type AdvTradeGlobalWSBookDepth = 1 | 10 | 20;
export type AdvTradeGlobalWSChartResolution =
  | 1
  | 3
  | 5
  | 10
  | 15
  | 30
  | 60
  | 120
  | 180
  | 360
  | 720
  | '1D';

export type AdvTradeGlobalPublicWSTopic =
  | 'announcements'
  | `book.${string}.${AdvTradeGlobalWSBookGroup}.${AdvTradeGlobalWSBookDepth}.${AdvTradeGlobalPublicWSInterval}`
  | `book.${string}.${AdvTradeGlobalPublicWSInterval}`
  | `chart.trades.${string}.${AdvTradeGlobalWSChartResolution}`
  | `deribit_price_index.${string}`
  | `deribit_price_ranking.${string}`
  | `deribit_price_statistics.${string}`
  | `deribit_volatility_index.${string}`
  | `estimated_expiration_price.${string}`
  | `incremental_ticker.${string}`
  | `instrument.creation.${AdvTradeGlobalKind}.${string}`
  | `instrument.state.${AdvTradeGlobalKind}.${string}`
  | `markprice.options.${string}`
  | `perpetual.${string}.${AdvTradeGlobalPublicWSInterval}`
  | 'platform_state'
  | 'platform_state.public_methods_state'
  | `quote.${string}`
  | `ticker.${string}.${AdvTradeGlobalPublicWSInterval}`
  | `trades.${string}.${AdvTradeGlobalPublicWSInterval}`
  | `trades.${AdvTradeGlobalKind}.${string}.${AdvTradeGlobalPublicWSInterval}`;

/** The update event preserves Coinbase's JSON-RPC envelope and adds the SDK wsKey. */
export interface CBAdvancedTradeGlobalSubscriptionEvent<
  TData = unknown,
  TChannel extends string = AdvTradeGlobalPublicWSTopic,
  TWSKey extends
    AdvTradeGlobalWsKey = typeof WS_KEY_MAP.advTradeGlobalMarketData,
> {
  wsKey: TWSKey;
  jsonrpc: '2.0';
  method: 'subscription';
  params: { channel: TChannel; data: TData };
}

/** Subscription acknowledgements contain channels; liveness and heartbeat setup have other results. */
export interface CBAdvancedTradeGlobalResponseEvent<
  TResult = string[] | AdvTradeGlobalTestResult | 'ok',
  TWSKey extends AdvTradeGlobalWsKey = AdvTradeGlobalWsKey,
> {
  wsKey: TWSKey;
  jsonrpc: '2.0';
  id: string | number;
  result: TResult;
  usIn?: number;
  usOut?: number;
  usDiff?: number;
  testnet?: boolean;
}

export interface CBAdvancedTradeGlobalErrorEvent {
  wsKey: AdvTradeGlobalWsKey;
  jsonrpc: '2.0';
  id: string | number | null;
  error: { code: number; message: string; data?: unknown };
}

export interface CBAdvancedTradeGlobalHeartbeatEvent {
  wsKey: AdvTradeGlobalWsKey;
  jsonrpc: '2.0';
  method: 'heartbeat';
  params: { type: 'heartbeat' | 'test_request' };
}

/**
 * Public payloads from Coinbase's Global AsyncAPI and notification examples.
 * Trades, price rankings and option mark prices are arrays of the corresponding items.
 * Currency, index and instrument catalogs remain open strings.
 * https://docs.cdp.coinbase.com/api-reference/coinbase-deribit-app-api/adv-starbase-asyncapi.json
 */
export interface AdvTradeGlobalWSAnnouncement
  extends AdvTradeGlobalGetAnnouncementsItem {
  action: 'deleted' | 'new';
  unread?: number;
}

export interface AdvTradeGlobalWSGroupedBook {
  asks: [price: number, amount: number][];
  bids: [price: number, amount: number][];
  change_id: number;
  instrument_name: string;
  timestamp?: number;
}

export type AdvTradeGlobalWSBookLevel = [
  action: 'new' | 'change' | 'delete',
  price: number,
  amount: number,
];

export interface AdvTradeGlobalWSBook {
  asks: AdvTradeGlobalWSBookLevel[];
  bids: AdvTradeGlobalWSBookLevel[];
  change_id: number;
  instrument_name: string;
  /** Absent on the initial snapshot. Compare with the last change_id to detect gaps. */
  prev_change_id?: number;
  timestamp?: number;
  type?: 'change' | 'snapshot';
}

export interface AdvTradeGlobalWSChart {
  close: number;
  cost: number;
  high: number;
  low: number;
  open: number;
  tick: number;
  volume: number;
}

export interface AdvTradeGlobalWSPriceIndex {
  index_name: string;
  price: number;
  timestamp: number;
}

export interface AdvTradeGlobalWSPriceRanking {
  enabled?: boolean;
  identifier?: string;
  original_price?: number | null;
  price?: number | null;
  timestamp?: number;
  weight?: number;
}

export interface AdvTradeGlobalWSPriceStatistics {
  change24h: number;
  fast_market?: boolean;
  high24h: number;
  index_name: string;
  low24h: number;
}

export interface AdvTradeGlobalWSVolatilityIndex {
  index_name: string;
  timestamp: number;
  volatility: number;
}

export interface AdvTradeGlobalWSEstimatedExpirationPrice {
  is_estimated: boolean;
  left_ticks?: number;
  price: number;
  seconds: number;
  total_ticks?: number;
}

export type AdvTradeGlobalWSIncrementalTicker =
  Partial<AdvTradeGlobalTickerNotification> &
    Pick<AdvTradeGlobalTickerNotification, 'instrument_name' | 'timestamp'> & {
      type?: 'change' | 'snapshot';
    };

/** The creation schema is open; its example contains instrument details and lifecycle fields. */
export interface AdvTradeGlobalWSInstrumentCreated
  extends Partial<AdvTradeGlobalInstrument> {
  state?: AdvTradeGlobalBookState;
  timestamp?: number;
  lot_size?: number;
  [key: string]: unknown;
}

export interface AdvTradeGlobalWSInstrumentState {
  instrument_name?: string;
  state?: AdvTradeGlobalBookState;
  timestamp?: number;
}

export interface AdvTradeGlobalWSOptionMarkPrice {
  instrument_name?: string;
  iv?: number;
  mark_price?: number;
  timestamp?: number;
}

export interface AdvTradeGlobalWSPerpetual {
  index_price: number;
  interest: number;
  timestamp: number;
}

export interface AdvTradeGlobalWSPlatformState {
  locked?: boolean;
  maintenance?: boolean;
  price_index?: string;
}

export interface AdvTradeGlobalWSPublicMethodsState {
  allow_unauthenticated_public_requests: boolean;
}

export interface AdvTradeGlobalWSQuote {
  best_ask_amount?: number | null;
  best_ask_price?: number | null;
  best_bid_amount: number | null;
  best_bid_price: number | null;
  instrument_name: string;
  timestamp: number;
}

export type CBAdvancedTradeGlobalPublicWSEvent =
  | CBAdvancedTradeGlobalSubscriptionEvent<
      AdvTradeGlobalWSAnnouncement,
      'announcements'
    >
  | CBAdvancedTradeGlobalSubscriptionEvent<
      AdvTradeGlobalWSGroupedBook,
      `book.${string}.${AdvTradeGlobalWSBookGroup}.${AdvTradeGlobalWSBookDepth}.${AdvTradeGlobalPublicWSInterval}`
    >
  | CBAdvancedTradeGlobalSubscriptionEvent<
      AdvTradeGlobalWSBook,
      `book.${string}.${AdvTradeGlobalPublicWSInterval}`
    >
  | CBAdvancedTradeGlobalSubscriptionEvent<
      AdvTradeGlobalWSChart,
      `chart.trades.${string}.${AdvTradeGlobalWSChartResolution}`
    >
  | CBAdvancedTradeGlobalSubscriptionEvent<
      AdvTradeGlobalWSPriceIndex,
      `deribit_price_index.${string}`
    >
  | CBAdvancedTradeGlobalSubscriptionEvent<
      AdvTradeGlobalWSPriceRanking[],
      `deribit_price_ranking.${string}`
    >
  | CBAdvancedTradeGlobalSubscriptionEvent<
      AdvTradeGlobalWSPriceStatistics,
      `deribit_price_statistics.${string}`
    >
  | CBAdvancedTradeGlobalSubscriptionEvent<
      AdvTradeGlobalWSVolatilityIndex,
      `deribit_volatility_index.${string}`
    >
  | CBAdvancedTradeGlobalSubscriptionEvent<
      AdvTradeGlobalWSEstimatedExpirationPrice,
      `estimated_expiration_price.${string}`
    >
  | CBAdvancedTradeGlobalSubscriptionEvent<
      AdvTradeGlobalWSIncrementalTicker,
      `incremental_ticker.${string}`
    >
  | CBAdvancedTradeGlobalSubscriptionEvent<
      AdvTradeGlobalWSInstrumentCreated,
      `instrument.creation.${AdvTradeGlobalKind}.${string}`
    >
  | CBAdvancedTradeGlobalSubscriptionEvent<
      AdvTradeGlobalWSInstrumentState,
      `instrument.state.${AdvTradeGlobalKind}.${string}`
    >
  | CBAdvancedTradeGlobalSubscriptionEvent<
      AdvTradeGlobalWSOptionMarkPrice[],
      `markprice.options.${string}`
    >
  | CBAdvancedTradeGlobalSubscriptionEvent<
      AdvTradeGlobalWSPerpetual,
      `perpetual.${string}.${AdvTradeGlobalPublicWSInterval}`
    >
  | CBAdvancedTradeGlobalSubscriptionEvent<
      AdvTradeGlobalWSPlatformState,
      'platform_state'
    >
  | CBAdvancedTradeGlobalSubscriptionEvent<
      AdvTradeGlobalWSPublicMethodsState,
      'platform_state.public_methods_state'
    >
  | CBAdvancedTradeGlobalSubscriptionEvent<
      AdvTradeGlobalWSQuote,
      `quote.${string}`
    >
  | CBAdvancedTradeGlobalSubscriptionEvent<
      AdvTradeGlobalTickerNotification,
      `ticker.${string}.${AdvTradeGlobalPublicWSInterval}`
    >
  | CBAdvancedTradeGlobalSubscriptionEvent<
      AdvTradeGlobalPublicTrade[],
      `trades.${string}.${AdvTradeGlobalPublicWSInterval}`
    >
  | CBAdvancedTradeGlobalSubscriptionEvent<
      AdvTradeGlobalPublicTrade[],
      `trades.${AdvTradeGlobalKind}.${string}.${AdvTradeGlobalPublicWSInterval}`
    >;

/** Private payloads from the Global AsyncAPI. Currency and instrument catalogs remain open strings. */
export interface AdvTradeGlobalWSAccessLog {
  city: string;
  country: string;
  data?: unknown;
  id: number;
  ip: string;
  log: string;
  timestamp: number;
}

export interface AdvTradeGlobalWSPortfolio {
  additional_reserve?: number;
  available_funds: number;
  available_withdrawal_funds: number;
  balance: number;
  close_out_margin?: number;
  cross_collateral_enabled: boolean;
  currency: string;
  delta_total?: number;
  delta_total_map: Record<string, number>;
  equity: number;
  fee_balance?: number;
  futures_pl: number;
  futures_session_rpl: number;
  futures_session_upl: number;
  initial_margin: number;
  locked_balance?: number;
  maintenance_margin: number;
  margin_balance: number;
  margin_model: string;
  options_delta: number;
  options_gamma: number;
  options_gamma_map: Record<string, unknown>;
  options_pl: number;
  options_session_rpl: number;
  options_session_upl: number;
  options_theta: number;
  options_theta_map: Record<string, unknown>;
  options_value: number;
  options_vega: number;
  options_vega_map: Record<string, unknown>;
  portfolio_margining_enabled: boolean;
  projected_close_out_margin?: number;
  projected_delta_total: number;
  projected_initial_margin?: number;
  projected_maintenance_margin: number;
  session_rpl: number;
  session_upl: number;
  total_delta_total_usd?: number;
  total_equity_usd?: number;
  total_initial_margin_usd?: number;
  total_maintenance_margin_usd?: number;
  total_margin_balance_usd?: number;
  total_pl: number;
}

export interface AdvTradeGlobalWSIsolatedOrder {
  amount: number;
  average_price?: number;
  creation_timestamp?: number;
  direction: string;
  filled_amount?: number;
  instrument_name: string;
  isolated: boolean;
  last_update_timestamp?: number;
  main_uid: number;
  order_id: string;
  order_state: string;
  order_type?: string;
  price?: number;
  user_id: number;
}

export interface AdvTradeGlobalWSIsolatedTrade {
  amount: number;
  direction: string;
  fee?: number;
  instrument_name: string;
  isolated: boolean;
  main_uid: number;
  order_id: string;
  price: number;
  timestamp?: number;
  trade_id: string;
  user_id: number;
}

export interface AdvTradeGlobalWSIsolatedPortfolio {
  available_funds?: number;
  currency: string;
  equity: number;
  initial_margin?: number;
  main_uid?: number;
  maintenance_margin?: number;
  margin_balance: number;
  user_id: number;
}

export interface AdvTradeGlobalWSIsolatedLiquidation {
  amount?: number;
  close_out_margin?: number;
  commission?: number;
  currency?: string;
  direction?: 'buy' | 'sell';
  equity?: number;
  initial_margin?: number;
  instrument_name?: string;
  isolated?: boolean;
  maintenance_margin?: number;
  margin_balance?: number;
  price?: number;
  state:
    | 'adl_transfer'
    | 'adl_transfer_received'
    | 'close_out_liquidation_completed'
    | 'close_out_liquidation_started'
    | 'liquidation_completed'
    | 'liquidation_started'
    | 'lsp_transfer';
  timestamp: number;
  user_id: number;
}

/** WS examples use booleans and null here, despite string fields in the shared schema. */
export interface AdvTradeGlobalWSUserTrade
  extends Omit<
    AdvTradeGlobalUserTrade,
    'post_only' | 'reduce_only' | 'matching_id' | 'legs'
  > {
  post_only?: boolean;
  reduce_only?: boolean;
  matching_id: string | null;
  legs?: AdvTradeGlobalWSUserTrade[];
}

/** Changes contain arrays, including positions (plural), as shown in the notification examples. */
export interface AdvTradeGlobalWSUserChanges {
  instrument_name?: string;
  orders?: AdvTradeGlobalOrder[];
  positions?: AdvTradeGlobalPosition[];
  trades?: AdvTradeGlobalWSUserTrade[];
}

export interface AdvTradeGlobalWSIsolatedChanges {
  instrument_name: string;
  isolated: boolean;
  main_uid: number;
  user_id: number;
  // The isolated change schema leaves the nested objects open.
  orders?: Record<string, unknown>[];
  positions?: Record<string, unknown>[];
  trades?: Record<string, unknown>[];
}

export interface AdvTradeGlobalWSUserLock {
  currency: string;
  locked: boolean;
}

export interface AdvTradeGlobalWSPositionLock {
  locked: boolean;
}

/** Keys identify trailing orders; values are their current trigger prices. */
export type AdvTradeGlobalWSTrailingOrderPrices = Record<string, number>;

/** All 23 private channel templates, including separate raw order notifications. */
export type AdvTradeGlobalPrivateWSTopic =
  | 'user.access_log'
  | `user.changes.${string}.${AdvTradeGlobalPrivateWSInterval}`
  | `user.changes.${AdvTradeGlobalKind}.${string}.${AdvTradeGlobalPrivateWSInterval}`
  | `user.combo_trades.${string}.${AdvTradeGlobalPrivateWSInterval}`
  | `user.combo_trades.${AdvTradeGlobalKind}.${string}.${AdvTradeGlobalPrivateWSInterval}`
  | `user.isolated.changes.${string}.${AdvTradeGlobalPrivateWSInterval}`
  | `user.isolated.changes.${'future' | 'any'}.${string}.${AdvTradeGlobalPrivateWSInterval}`
  | 'user.isolated.liquidation'
  | `user.isolated.orders.${string}.${AdvTradeGlobalPrivateWSInterval}`
  | `user.isolated.orders.${'future' | 'any'}.${string}.${AdvTradeGlobalPrivateWSInterval}`
  | `user.isolated.portfolio.${string}`
  | `user.isolated.trades.${string}.${AdvTradeGlobalPrivateWSInterval}`
  | `user.isolated.trades.${'future' | 'any'}.${string}.${AdvTradeGlobalPrivateWSInterval}`
  | 'user.lock'
  | `user.orders.${string}.${AdvTradeGlobalPrivateWSInterval}`
  | `user.orders.${AdvTradeGlobalKind}.${string}.${AdvTradeGlobalPrivateWSInterval}`
  | `user.portfolio.${string}`
  | 'user.position_lock'
  | `user.trades.${string}.${AdvTradeGlobalPrivateWSInterval}`
  | `user.trades.${AdvTradeGlobalKind}.${string}.${AdvTradeGlobalPrivateWSInterval}`
  | `user.trailing_orders.trigger_price.${string}`;

export type CBAdvancedTradeGlobalPrivateSubscriptionEvent<
  TData = unknown,
  TChannel extends string = AdvTradeGlobalPrivateWSTopic,
> = CBAdvancedTradeGlobalSubscriptionEvent<
  TData,
  TChannel,
  typeof WS_KEY_MAP.advTradeGlobalUserData
>;

/** WebSocket authentication authorizes the session without requiring a bearer token. */
export interface AdvTradeGlobalWSAuthResult
  extends Omit<AdvTradeGlobalAuthResult, 'access_token'> {
  access_token?: string;
}

export type CBAdvancedTradeGlobalAuthenticatedEvent =
  CBAdvancedTradeGlobalResponseEvent<
    AdvTradeGlobalWSAuthResult,
    | typeof WS_KEY_MAP.advTradeGlobalUserData
    | typeof WS_KEY_MAP.advTradeGlobalWSAPI
  >;

export type CBAdvancedTradeGlobalPrivateWSEvent =
  | CBAdvancedTradeGlobalPrivateSubscriptionEvent<
      AdvTradeGlobalWSAccessLog,
      'user.access_log'
    >
  | CBAdvancedTradeGlobalPrivateSubscriptionEvent<
      AdvTradeGlobalWSUserChanges,
      `user.changes.${string}.${AdvTradeGlobalPrivateWSInterval}`
    >
  | CBAdvancedTradeGlobalPrivateSubscriptionEvent<
      AdvTradeGlobalWSUserTrade[],
      `user.combo_trades.${string}.${AdvTradeGlobalPrivateWSInterval}`
    >
  | CBAdvancedTradeGlobalPrivateSubscriptionEvent<
      AdvTradeGlobalWSIsolatedChanges,
      `user.isolated.changes.${string}.${AdvTradeGlobalPrivateWSInterval}`
    >
  | CBAdvancedTradeGlobalPrivateSubscriptionEvent<
      AdvTradeGlobalWSIsolatedLiquidation,
      'user.isolated.liquidation'
    >
  | CBAdvancedTradeGlobalPrivateSubscriptionEvent<
      AdvTradeGlobalWSIsolatedOrder,
      `user.isolated.orders.${string}.${AdvTradeGlobalPrivateWSInterval}`
    >
  | CBAdvancedTradeGlobalPrivateSubscriptionEvent<
      AdvTradeGlobalWSIsolatedPortfolio,
      `user.isolated.portfolio.${string}`
    >
  | CBAdvancedTradeGlobalPrivateSubscriptionEvent<
      AdvTradeGlobalWSIsolatedTrade[],
      `user.isolated.trades.${string}.${AdvTradeGlobalPrivateWSInterval}`
    >
  | CBAdvancedTradeGlobalPrivateSubscriptionEvent<
      AdvTradeGlobalWSUserLock,
      'user.lock'
    >
  | CBAdvancedTradeGlobalPrivateSubscriptionEvent<
      AdvTradeGlobalOrder[],
      `user.orders.${string}.${AdvTradeGlobalPublicWSInterval}`
    >
  | CBAdvancedTradeGlobalPrivateSubscriptionEvent<
      AdvTradeGlobalOrder,
      `user.orders.${string}.raw`
    >
  | CBAdvancedTradeGlobalPrivateSubscriptionEvent<
      AdvTradeGlobalWSPortfolio,
      `user.portfolio.${string}`
    >
  | CBAdvancedTradeGlobalPrivateSubscriptionEvent<
      AdvTradeGlobalWSPositionLock,
      'user.position_lock'
    >
  | CBAdvancedTradeGlobalPrivateSubscriptionEvent<
      AdvTradeGlobalWSUserTrade[],
      `user.trades.${string}.${AdvTradeGlobalPrivateWSInterval}`
    >
  | CBAdvancedTradeGlobalPrivateSubscriptionEvent<
      AdvTradeGlobalWSTrailingOrderPrices,
      `user.trailing_orders.trigger_price.${string}`
    >;
