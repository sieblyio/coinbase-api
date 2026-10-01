import { WS_KEY_MAP } from '../../lib/websocket/websocket-util.js';
import {
  AdvTradeGlobalBookState,
  AdvTradeGlobalGetAnnouncementsItem,
  AdvTradeGlobalInstrument,
  AdvTradeGlobalKind,
  AdvTradeGlobalPublicTrade,
  AdvTradeGlobalTestResult,
  AdvTradeGlobalTickerNotification,
} from '../response/advanced-trade-global-client.js';

/** Public Global Derivatives channels. The raw interval requires authentication. */
export type AdvTradeGlobalPublicWSInterval = '100ms' | 'agg2';
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
> {
  wsKey: typeof WS_KEY_MAP.advTradeGlobalMarketData;
  jsonrpc: '2.0';
  method: 'subscription';
  params: { channel: TChannel; data: TData };
}

/** Subscription acknowledgements contain channels; liveness and heartbeat setup have other results. */
export interface CBAdvancedTradeGlobalResponseEvent<
  TResult = string[] | AdvTradeGlobalTestResult | 'ok',
> {
  wsKey: typeof WS_KEY_MAP.advTradeGlobalMarketData;
  jsonrpc: '2.0';
  id: string | number;
  result: TResult;
  usIn?: number;
  usOut?: number;
  usDiff?: number;
  testnet?: boolean;
}

export interface CBAdvancedTradeGlobalErrorEvent {
  wsKey: typeof WS_KEY_MAP.advTradeGlobalMarketData;
  jsonrpc: '2.0';
  id: string | number | null;
  error: { code: number; message: string; data?: unknown };
}

export interface CBAdvancedTradeGlobalHeartbeatEvent {
  wsKey: typeof WS_KEY_MAP.advTradeGlobalMarketData;
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
