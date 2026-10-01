/**
 * Request parameters for Coinbase Advanced Trade Global Derivatives.
 *
 * JSON-RPC 2.0 on https://drb.coinbase.com/api/v2
 * https://docs.cdp.coinbase.com/api-reference/coinbase-deribit-app-api/adv-starbase-openapi.json
 *
 * Currency and index-name fields are string. The spec enums are sample lists and do not
 * include equity or commodity underlyings.
 */

/**
 * Request-only copies of enums and nested objects. Do not import these from the response
 * module. Response schemas can change without changing what a request accepts.
 */
export type AdvTradeGlobalRequestKind =
  | 'future'
  | 'option'
  | 'spot'
  | 'future_combo'
  | 'option_combo';

export type AdvTradeGlobalRequestKindFutureOrOptionWithAny =
  | 'future'
  | 'option'
  | 'any';

export type AdvTradeGlobalRequestKindWithComboAll =
  | 'future'
  | 'option'
  | 'spot'
  | 'future_combo'
  | 'option_combo'
  | 'combo'
  | 'any';

export type AdvTradeGlobalRequestKindWithoutSpot =
  | 'future'
  | 'option'
  | 'future_combo'
  | 'option_combo';

export type AdvTradeGlobalRequestComboState = 'active' | 'inactive';

export type AdvTradeGlobalRequestSettlementType =
  | 'settlement'
  | 'delivery'
  | 'bankruptcy';

export type AdvTradeGlobalRequestSorting = 'asc' | 'desc' | 'default';

export type AdvTradeGlobalRequestAdvanced = 'usd' | 'implv';

export type AdvTradeGlobalRequestTrigger =
  | 'index_price'
  | 'mark_price'
  | 'last_price';

export type AdvTradeGlobalRequestSimpleOrderType =
  | 'all'
  | 'limit'
  | 'trigger_all'
  | 'stop'
  | 'take'
  | 'trailing_stop';

export type AdvTradeGlobalRequestOrderType =
  | 'all'
  | 'limit'
  | 'trigger_all'
  | 'stop_all'
  | 'stop_limit'
  | 'stop_market'
  | 'take_all'
  | 'take_limit'
  | 'take_market'
  | 'trailing_all'
  | 'trailing_stop';

export type AdvTradeGlobalRequestCurrencyWithAnyAndList = string | string[];

export interface AdvTradeGlobalRequestOtocoConfig {
  /**
   * Required. The secondary order size. For perpetual and inverse futures the amount is
   * in USD units. For options and linear futures it is the underlying base currency
   * coin.
   */
  amount?: number;
  /** Required. Direction of the secondary order. */
  direction?: 'buy' | 'sell';
  /** User defined label for the order (maximum 64 characters). */
  label?: string;
  /**
   * If true, the order is considered post-only. If the new price would cause the order
   * to be filled immediately (as taker), the price will be changed to be just below or
   * above the spread (according to the direction of the order).
   */
  post_only?: boolean;
  /** The order price in base currency. Required for limit and stop_limit orders. */
  price?: number;
  /**
   * If true, the order is considered reduce-only which is intended to only reduce a
   * current position.
   */
  reduce_only?: boolean;
  /**
   * If an order is considered post-only and this field is set to true then the order is
   * put to the order book unmodified or the request is rejected.
   */
  reject_post_only?: boolean;
  /** Specifies how long the order remains in effect. Default "good_til_cancelled". */
  time_in_force?:
    | 'good_til_cancelled'
    | 'good_til_day'
    | 'fill_or_kill'
    | 'immediate_or_cancel';
  /** Defines the trigger type. Required for stop-loss, take-profit, and trailing stop orders. */
  trigger?: AdvTradeGlobalRequestTrigger;
  /**
   * The maximum deviation from the price peak beyond which the order will be triggered.
   * Used for trailing stop orders.
   */
  trigger_offset?: number;
  /** Trigger price. Required for trigger orders (stop-loss or take-profit orders). */
  trigger_price?: number;
  /** The order type, default: "limit" */
  type?:
    | 'limit'
    | 'stop_limit'
    | 'take_limit'
    | 'market'
    | 'stop_market'
    | 'take_market'
    | 'market_limit'
    | 'trailing_stop';
}

export interface AdvTradeGlobalRequestTrade {
  /**
   * It represents the requested order size. For perpetual and inverse futures the
   * amount is in USD units. For options and linear futures it is the underlying base
   * currency coin.
   */
  amount?: number;
  /** Direction: buy, or sell */
  direction?: 'buy' | 'sell';
  /** Unique instrument identifier */
  instrument_name?: string;
}

export interface AdvTradeGlobalRequestLeg {
  /**
   * It represents the requested trade size. For perpetual and inverse futures the
   * amount is in USD units. For options and linear futures it is the underlying base
   * currency coin.
   */
  amount?: number;
  /** Direction of selected leg */
  direction?: 'buy' | 'sell';
  /** Instrument name */
  instrument_name?: string;
}

export interface AdvTradeGlobalAuthRequest {
  /** Coinbase grant type used to authenticate. */
  grant_type: 'coinbase_cdp' | 'coinbase_oauth2';
  /** Coinbase-issued credential matching grant_type. */
  token: string;
}

export interface AdvTradeGlobalGetAnnouncementsRequest {
  /** The most recent timestamp to return the results for (milliseconds since the UNIX epoch) */
  start_timestamp?: number;
  /** Maximum count of returned announcements, default - 5, maximum - 50 */
  count?: number;
}

export interface AdvTradeGlobalGetBookSummaryByCurrencyRequest {
  /** The currency symbol The published enum is a sample list, so this field stays a string. */
  currency: string;
  /** Instrument kind, if not provided instruments of all kinds are considered */
  kind?: AdvTradeGlobalRequestKind;
}

export interface AdvTradeGlobalGetBookSummaryByInstrumentRequest {
  /** Instrument name */
  instrument_name: string;
}

export interface AdvTradeGlobalGetComboDetailsRequest {
  /** Combo ID */
  combo_id: string;
}

export interface AdvTradeGlobalGetComboIdsRequest {
  /** The currency symbol The published enum is a sample list, so this field stays a string. */
  currency: string;
  /** Combo state, if not provided combos of all states are considered */
  state?: AdvTradeGlobalRequestComboState;
}

export interface AdvTradeGlobalGetCombosRequest {
  /**
   * The currency symbol or "any" for all The published enum is a sample list, so this
   * field stays a string.
   */
  currency: string;
}

export interface AdvTradeGlobalGetContractSizeRequest {
  /** Instrument name */
  instrument_name: string;
}

export interface AdvTradeGlobalGetDeliveryPricesRequest {
  /**
   * Index identifier, matches (base) cryptocurrency with quote currency The published
   * enum is a sample list, so this field stays a string.
   */
  index_name: string;
  /** The offset for pagination, default - 0 */
  offset?: number;
  /** Number of requested items, default - 10, maximum - 1000 */
  count?: number;
}

export interface AdvTradeGlobalGetExpirationsRequest {
  /**
   * The currency symbol or "any" for all or '"grouped"' for all grouped by currency The
   * published enum is a sample list, so this field stays a string.
   */
  currency: string;
  /** Instrument kind, "future" or "option" or "any" */
  kind: AdvTradeGlobalRequestKindFutureOrOptionWithAny;
  /**
   * The currency pair symbol The published enum is a sample list, so this field stays a
   * string.
   */
  currency_pair?: string;
}

export interface AdvTradeGlobalGetFundingChartDataRequest {
  /** Instrument name */
  instrument_name: string;
  /** Specifies time period. 8h - 8 hours, 24h - 24 hours, 1m - 1 month */
  length: '8h' | '24h' | '1m';
}

export interface AdvTradeGlobalGetFundingRateHistoryRequest {
  /** Instrument name */
  instrument_name: string;
  /** The earliest timestamp to return result from (milliseconds since the UNIX epoch) */
  start_timestamp: number;
  /** The most recent timestamp to return result from (milliseconds since the UNIX epoch) */
  end_timestamp: number;
}

export interface AdvTradeGlobalGetFundingRateValueRequest {
  /** Instrument name */
  instrument_name: string;
  /** The earliest timestamp to return result from (milliseconds since the UNIX epoch) */
  start_timestamp: number;
  /** The most recent timestamp to return result from (milliseconds since the UNIX epoch) */
  end_timestamp: number;
}

export interface AdvTradeGlobalGetHistoricalVolatilityRequest {
  /** The currency symbol The published enum is a sample list, so this field stays a string. */
  currency: string;
}

export interface AdvTradeGlobalGetIndexChartDataRequest {
  /**
   * Index identifier, matches (base) cryptocurrency with quote currency The published
   * enum is a sample list, so this field stays a string.
   */
  index_name: string;
  /** Range of the data to return */
  range: '1h' | '1d' | '2d' | '1m' | '1y' | 'all';
}

export interface AdvTradeGlobalGetIndexPriceRequest {
  /**
   * Index identifier, matches (base) cryptocurrency with quote currency The published
   * enum is a sample list, so this field stays a string.
   */
  index_name: string;
}

export interface AdvTradeGlobalGetIndexPriceNamesRequest {
  /**
   * When set to true, returns additional information including
   * future_combo_creation_enabled and option_combo_creation_enabled for each index
   */
  extended?: boolean;
}

export interface AdvTradeGlobalGetInstrumentRequest {
  /** Instrument name */
  instrument_name: string;
}

export interface AdvTradeGlobalGetInstrumentsRequest {
  /**
   * The currency symbol or "any" for all The published enum is a sample list, so this
   * field stays a string.
   */
  currency: string;
  /** Instrument kind, if not provided instruments of all kinds are considered */
  kind?: AdvTradeGlobalRequestKind;
  /** Set to true to show recently expired instruments instead of active ones. */
  expired?: boolean;
}

export interface AdvTradeGlobalGetLastSettlementsByCurrencyRequest {
  /** The currency symbol The published enum is a sample list, so this field stays a string. */
  currency: string;
  /** Settlement type */
  type?: AdvTradeGlobalRequestSettlementType;
  /** Number of requested items, default - 20, maximum - 1000 */
  count?: number;
  /** Continuation token for pagination */
  continuation?: string;
  /** The latest timestamp to return result from (milliseconds since the UNIX epoch) */
  search_start_timestamp?: number;
}

export interface AdvTradeGlobalGetLastSettlementsByInstrumentRequest {
  /** Instrument name */
  instrument_name: string;
  /** Settlement type */
  type?: AdvTradeGlobalRequestSettlementType;
  /** Number of requested items, default - 20, maximum - 1000 */
  count?: number;
  /** Continuation token for pagination */
  continuation?: string;
  /** The latest timestamp to return result from (milliseconds since the UNIX epoch) */
  search_start_timestamp?: number;
}

export interface AdvTradeGlobalGetLastTradesByCurrencyRequest {
  /** The currency symbol The published enum is a sample list, so this field stays a string. */
  currency: string;
  /**
   * Instrument kind, "combo" for any combo or "any" for all. If not provided
   * instruments of all kinds are considered
   */
  kind?: AdvTradeGlobalRequestKindWithComboAll;
  /**
   * The ID of the first trade to be returned. Number for BTC trades, or hyphen name in
   * ex. "ETH-15" # "ETH_USDC-16"
   */
  start_id?: string;
  /**
   * The ID of the last trade to be returned. Number for BTC trades, or hyphen name in
   * ex. "ETH-15" # "ETH_USDC-16"
   */
  end_id?: string;
  /**
   * The earliest timestamp to return result from (milliseconds since the UNIX epoch).
   * When param is provided trades are returned from the earliest
   */
  start_timestamp?: number;
  /**
   * The most recent timestamp to return result from (milliseconds since the UNIX
   * epoch). Only one of params: start_timestamp, end_timestamp is truly required
   */
  end_timestamp?: number;
  /** Number of requested items, default - 10, maximum - 1000 */
  count?: number;
  /**
   * Direction of results sorting (default value means no sorting, results will be
   * returned in order in which they left the database)
   */
  sorting?: AdvTradeGlobalRequestSorting;
}

export interface AdvTradeGlobalGetLastTradesByCurrencyAndTimeRequest {
  /** The currency symbol The published enum is a sample list, so this field stays a string. */
  currency: string;
  /**
   * Instrument kind, "combo" for any combo or "any" for all. If not provided
   * instruments of all kinds are considered
   */
  kind?: AdvTradeGlobalRequestKindWithComboAll;
  /**
   * The earliest timestamp to return result from (milliseconds since the UNIX epoch).
   * When param is provided trades are returned from the earliest
   */
  start_timestamp: number;
  /**
   * The most recent timestamp to return result from (milliseconds since the UNIX
   * epoch). Only one of params: start_timestamp, end_timestamp is truly required
   */
  end_timestamp: number;
  /** Number of requested items, default - 10, maximum - 1000 */
  count?: number;
  /**
   * Direction of results sorting (default value means no sorting, results will be
   * returned in order in which they left the database)
   */
  sorting?: AdvTradeGlobalRequestSorting;
}

export interface AdvTradeGlobalGetLastTradesByInstrumentRequest {
  /** Instrument name */
  instrument_name: string;
  /** The sequence number of the first trade to be returned */
  start_seq?: number;
  /** The sequence number of the last trade to be returned */
  end_seq?: number;
  /**
   * The earliest timestamp to return result from (milliseconds since the UNIX epoch).
   * When param is provided trades are returned from the earliest
   */
  start_timestamp?: number;
  /**
   * The most recent timestamp to return result from (milliseconds since the UNIX
   * epoch). Only one of params: start_timestamp, end_timestamp is truly required
   */
  end_timestamp?: number;
  /** Number of requested items, default - 10, maximum - 1000 */
  count?: number;
  /**
   * Direction of results sorting (default value means no sorting, results will be
   * returned in order in which they left the database)
   */
  sorting?: AdvTradeGlobalRequestSorting;
}

export interface AdvTradeGlobalGetLastTradesByInstrumentAndTimeRequest {
  /** Instrument name */
  instrument_name: string;
  /**
   * The earliest timestamp to return result from (milliseconds since the UNIX epoch).
   * When param is provided trades are returned from the earliest
   */
  start_timestamp: number;
  /**
   * The most recent timestamp to return result from (milliseconds since the UNIX
   * epoch). Only one of params: start_timestamp, end_timestamp is truly required
   */
  end_timestamp: number;
  /** Number of requested items, default - 10, maximum - 1000 */
  count?: number;
  /**
   * Direction of results sorting (default value means no sorting, results will be
   * returned in order in which they left the database)
   */
  sorting?: AdvTradeGlobalRequestSorting;
}

export interface AdvTradeGlobalGetMarkPriceHistoryRequest {
  /** Instrument name */
  instrument_name: string;
  /** The earliest timestamp to return result from (milliseconds since the UNIX epoch) */
  start_timestamp: number;
  /** The most recent timestamp to return result from (milliseconds since the UNIX epoch) */
  end_timestamp: number;
}

export interface AdvTradeGlobalGetOrderBookRequest {
  /**
   * The instrument name for which to retrieve the order book, see
   * public/get_instruments to obtain instrument names.
   */
  instrument_name: string;
  /** The number of entries to return for bids and asks, maximum - 10000. */
  depth?: number;
}

export interface AdvTradeGlobalGetOrderBookByInstrumentIdRequest {
  /**
   * The instrument ID for which to retrieve the order book, see public/get_instruments
   * to obtain instrument IDs.
   */
  instrument_id: number;
  /** The number of entries to return for bids and asks, maximum - 10000. */
  depth?: number;
}

export interface AdvTradeGlobalGetSupportedIndexNamesRequest {
  /** Type of a cryptocurrency price index */
  type?: 'all' | 'spot' | 'derivative';
}

export interface AdvTradeGlobalGetTradeVolumesRequest {
  /** Request for extended statistics. Including also 7 and 30 days volumes (default false) */
  extended?: boolean;
}

export interface AdvTradeGlobalGetTradingviewChartDataRequest {
  /** Instrument name */
  instrument_name: string;
  /** The earliest timestamp to return result from (milliseconds since the UNIX epoch) */
  start_timestamp: number;
  /** The most recent timestamp to return result from (milliseconds since the UNIX epoch) */
  end_timestamp: number;
  /**
   * Chart bars resolution given in full minutes or keyword 1D (only some specific
   * resolutions are supported)
   */
  resolution:
    | '1'
    | '3'
    | '5'
    | '10'
    | '15'
    | '30'
    | '60'
    | '120'
    | '180'
    | '360'
    | '720'
    | '1D';
}

export interface AdvTradeGlobalGetVolatilityIndexDataRequest {
  /** The currency symbol The published enum is a sample list, so this field stays a string. */
  currency: string;
  /** The earliest timestamp to return result from (milliseconds since the UNIX epoch) */
  start_timestamp: number;
  /** The most recent timestamp to return result from (milliseconds since the UNIX epoch) */
  end_timestamp: number;
  /**
   * Time resolution given in full seconds or keyword 1D (only some specific resolutions
   * are supported)
   */
  resolution: '1' | '60' | '3600' | '43200' | '1D';
}

export interface AdvTradeGlobalTestRequest {
  /**
   * The value "exception" will trigger an error response. This may be useful for
   * testing wrapper libraries.
   */
  expected_result?: 'exception';
}

export interface AdvTradeGlobalGetTickerRequest {
  /** Instrument name */
  instrument_name: string;
}

export interface AdvTradeGlobalPlaceOrderRequest {
  /** Instrument name */
  instrument_name: string;
  /**
   * It represents the requested order size. For perpetual and inverse futures the
   * amount is in USD units. For options and linear futures it is the underlying base
   * currency coin. The amount is a mandatory parameter if contracts parameter is
   * missing. If both contracts and amount parameter are passed they must match each
   * other otherwise error is returned.
   */
  amount?: number;
  /**
   * It represents the requested order size in contract units and can be passed instead
   * of amount. The contracts is a mandatory parameter if amount parameter is missing.
   * If both contracts and amount parameter are passed they must match each other
   * otherwise error is returned.
   */
  contracts?: number;
  /**
   * The order type, default: "limit" stop_limit, stop_market, take_limit, take_market,
   * and trailing_stop (trigger/algo order types) are not supported for option and
   * option_combo instruments. For spot trading routed to Coinbase Exchange, only
   * "market", "limit" and "stop_limit" orders are supported. Other order types will be
   * rejected.
   */
  type?:
    | 'limit'
    | 'stop_limit'
    | 'take_limit'
    | 'market'
    | 'stop_market'
    | 'take_market'
    | 'market_limit'
    | 'trailing_stop';
  /** user defined label for the order (maximum 64 characters) */
  label?: string;
  /**
   * The order price in base currency (Only for limit and stop_limit orders) When adding
   * an order with advanced=usd, the field price should be the option price value in
   * USD. When adding an order with advanced=implv, the field price should be a value of
   * implied volatility in percentages. For example, price=100, means implied volatility
   * of 100%
   */
  price?: number;
  /**
   * Specifies how long the order remains in effect. Default "good_til_cancelled"
   * "good_til_cancelled" - unfilled order remains in order book until cancelled
   * "good_til_day" - unfilled order remains in order book till the end of the trading
   * session "fill_or_kill" - execute a transaction immediately and completely or not at
   * all "immediate_or_cancel" - execute a transaction immediately, and any portion of
   * the order that cannot be immediately filled is cancelled For spot trading, only
   * "good_til_cancelled", "immediate_or_cancel" and "fill_or_kill" are supported.
   * "good_til_day" is not supported and will be rejected.
   */
  time_in_force?:
    | 'good_til_cancelled'
    | 'good_til_day'
    | 'fill_or_kill'
    | 'immediate_or_cancel';
  /**
   * Initial display amount for iceberg order. Has to be at least 100 times minimum
   * amount for instrument and ratio of hidden part vs visible part has to be less than
   * 100 as well.
   */
  display_amount?: number;
  /**
   * If true, the order is considered post-only. If the new price would cause the order
   * to be filled immediately (as taker), the price will be changed to be just below the
   * spread. Only valid in combination with time_in_force="good_til_cancelled" For spot
   * trading routed to Coinbase Exchange, the price is never adjusted: "post_only" must
   * be combined with "reject_post_only" set to true, and the order is rejected if it
   * would be matched instantly.
   */
  post_only?: boolean;
  /**
   * If an order is considered post-only and this field is set to true then the order is
   * put to the order book unmodified or the request is rejected. Only valid in
   * combination with "post_only" set to true For spot trading routed to Coinbase
   * Exchange, this must be set to true whenever "post_only" is true; otherwise the
   * request is rejected with post_only_not_allowed.
   */
  reject_post_only?: boolean;
  /**
   * If true, the order is considered reduce-only which is intended to only reduce a
   * current position
   */
  reduce_only?: boolean;
  /** Trigger price, required for trigger orders only (Stop-loss or Take-profit orders) */
  trigger_price?: number;
  /** The maximum deviation from the price peak beyond which the order will be triggered */
  trigger_offset?: number;
  /**
   * Defines the trigger type. Required for "Stop-Loss", "Take-Profit" and "Trailing"
   * trigger orders For stop-limit orders routed to Coinbase Exchange, only "last_price"
   * is allowed.
   */
  trigger?: AdvTradeGlobalRequestTrigger;
  /**
   * Advanced option order type. (Only for options. Advanced USD orders are not
   * supported for linear options.)
   */
  advanced?: AdvTradeGlobalRequestAdvanced;
  /** Order MMP flag, only for order_type 'limit' */
  mmp?: boolean;
  /**
   * Timestamp, when provided server will start processing request in Matching Engine
   * only before given timestamp, in other cases timed_out error will be responded.
   * Remember that the given timestamp should be consistent with the server's time, use
   * /public/time method to obtain current server time.
   */
  valid_until?: number;
  /**
   * The type of the linked order. "one_triggers_other" - Execution of primary order
   * triggers the placement of one or more secondary orders. "one_cancels_other" - The
   * execution of one order in a pair automatically cancels the other, typically used to
   * set a stop-loss and take-profit simultaneously. "one_triggers_one_cancels_other" -
   * The execution of a primary order triggers two secondary orders (a stop-loss and
   * take-profit pair), where the execution of one secondary order cancels the other.
   */
  linked_order_type?:
    | 'one_triggers_other'
    | 'one_cancels_other'
    | 'one_triggers_one_cancels_other';
  /**
   * The fill condition of the linked order (Only for linked order types), default:
   * first_hit. "first_hit" - any execution of the primary order will fully cancel/place
   * all secondary orders. "complete_fill" - a complete execution (meaning the primary
   * order no longer exists) will cancel/place the secondary orders. "incremental" - any
   * fill of the primary order will cause proportional partial cancellation/placement of
   * the secondary order. The amount that will be subtracted/added to the secondary
   * order will be rounded down to the contract size.
   */
  trigger_fill_condition?: 'first_hit' | 'complete_fill' | 'incremental';
  /**
   * List of secondary orders to place or cancel when the primary order is filled. Each
   * entry in the array defines one secondary order. amount and direction are required;
   * all other fields are optional.
   */
  otoco_config?: AdvTradeGlobalRequestOtocoConfig[];
  /**
   * If true, places the order under isolated margin mode. A managed subaccount is
   * claimed or provisioned and bound to the instrument. Available to main accounts for
   * futures orders only; not supported for algo, advanced, or linked orders. Default -
   * false
   */
  isolated?: boolean;
  /**
   * Optional initial margin amount transferred from the main account to the isolated
   * subaccount for this order. Only applicable when isolated = true. On risk-increasing
   * orders, must meet the required minimum margin or placement fails with error 14033
   * (isolated_allocated_too_low).
   */
  allocated_margin?: number;
}

export interface AdvTradeGlobalEditRequest {
  /** The order id */
  order_id: string;
  /**
   * It represents the requested order size. For perpetual and inverse futures the
   * amount is in USD units. For options and linear futures it is the underlying base
   * currency coin. The amount is a mandatory parameter if contracts parameter is
   * missing. If both contracts and amount parameter are passed they must match each
   * other otherwise error is returned.
   */
  amount?: number;
  /**
   * It represents the requested order size in contract units and can be passed instead
   * of amount. The contracts is a mandatory parameter if amount parameter is missing.
   * If both contracts and amount parameter are passed they must match each other
   * otherwise error is returned.
   */
  contracts?: number;
  /**
   * The order price in base currency. When editing an option order with advanced=usd,
   * the field price should be the option price value in USD. When editing an option
   * order with advanced=implv, the field price should be a value of implied volatility
   * in percentages. For example, price=100, means implied volatility of 100%
   */
  price?: number;
  /**
   * If true, the order is considered post-only. If the new price would cause the order
   * to be filled immediately (as taker), the price will be changed to be just below or
   * above the spread (accordingly to the original order type). Only valid in
   * combination with time_in_force="good_til_cancelled" For spot trading routed to
   * Coinbase Exchange, the price is never adjusted: "post_only" must be combined with
   * "reject_post_only" set to true, and the order is rejected if it would be matched
   * instantly.
   */
  post_only?: boolean;
  /**
   * If true, the order is considered reduce-only which is intended to only reduce a
   * current position
   */
  reduce_only?: boolean;
  /**
   * If an order is considered post-only and this field is set to true then the order is
   * put to the order book unmodified or the request is rejected. Only valid in
   * combination with "post_only" set to true For spot trading routed to Coinbase
   * Exchange, this must be set to true whenever "post_only" is true; otherwise the
   * request is rejected with post_only_not_allowed.
   */
  reject_post_only?: boolean;
  /**
   * Advanced option order type. If you have posted an advanced option order, it is
   * necessary to re-supply this parameter when editing it (Only for options)
   */
  advanced?: AdvTradeGlobalRequestAdvanced;
  /** Trigger price, required for trigger orders only (Stop-loss or Take-profit orders) */
  trigger_price?: number;
  /** The maximum deviation from the price peak beyond which the order will be triggered */
  trigger_offset?: number;
  /** Order MMP flag, only for order_type 'limit' */
  mmp?: boolean;
  /**
   * Timestamp, when provided server will start processing request in Matching Engine
   * only before given timestamp, in other cases timed_out error will be responded.
   * Remember that the given timestamp should be consistent with the server's time, use
   * /public/time method to obtain current server time.
   */
  valid_until?: number;
  /**
   * Initial display amount for iceberg order. Has to be at least 100 times minimum
   * amount for instrument and ratio of hidden part vs visible part has to be less than
   * 100 as well.
   */
  display_amount?: number;
  /**
   * If true, routes the edit request to the isolated margin subaccount that owns the
   * order. Must be sent from the main account. Default - false
   */
  isolated?: boolean;
  /**
   * Optional additional margin amount transferred from the main account to the isolated
   * subaccount when editing an order to increase risk.
   */
  allocated_margin?: number;
}

export interface AdvTradeGlobalEditByLabelRequest {
  /** user defined label for the order (maximum 64 characters) */
  label?: string;
  /** Instrument name */
  instrument_name: string;
  /**
   * It represents the requested order size. For perpetual and inverse futures the
   * amount is in USD units. For options and linear futures it is the underlying base
   * currency coin. The amount is a mandatory parameter if contracts parameter is
   * missing. If both contracts and amount parameter are passed they must match each
   * other otherwise error is returned.
   */
  amount?: number;
  /**
   * It represents the requested order size in contract units and can be passed instead
   * of amount. The contracts is a mandatory parameter if amount parameter is missing.
   * If both contracts and amount parameter are passed they must match each other
   * otherwise error is returned.
   */
  contracts?: number;
  /**
   * The order price in base currency. When editing an option order with advanced=usd,
   * the field price should be the option price value in USD. When editing an option
   * order with advanced=implv, the field price should be a value of implied volatility
   * in percentages. For example, price=100, means implied volatility of 100%
   */
  price?: number;
  /**
   * If true, the order is considered post-only. If the new price would cause the order
   * to be filled immediately (as taker), the price will be changed to be just below or
   * above the spread (accordingly to the original order type). Only valid in
   * combination with time_in_force="good_til_cancelled" For spot trading routed to
   * Coinbase Exchange, the price is never adjusted: "post_only" must be combined with
   * "reject_post_only" set to true, and the order is rejected if it would be matched
   * instantly.
   */
  post_only?: boolean;
  /**
   * If true, the order is considered reduce-only which is intended to only reduce a
   * current position
   */
  reduce_only?: boolean;
  /**
   * If an order is considered post-only and this field is set to true then the order is
   * put to the order book unmodified or the request is rejected. Only valid in
   * combination with "post_only" set to true For spot trading routed to Coinbase
   * Exchange, this must be set to true whenever "post_only" is true; otherwise the
   * request is rejected with post_only_not_allowed.
   */
  reject_post_only?: boolean;
  /**
   * Advanced option order type. If you have posted an advanced option order, it is
   * necessary to re-supply this parameter when editing it (Only for options)
   */
  advanced?: AdvTradeGlobalRequestAdvanced;
  /** Trigger price, required for trigger orders only (Stop-loss or Take-profit orders) */
  trigger_price?: number;
  /** Order MMP flag, only for order_type 'limit' */
  mmp?: boolean;
  /**
   * Timestamp, when provided server will start processing request in Matching Engine
   * only before given timestamp, in other cases timed_out error will be responded.
   * Remember that the given timestamp should be consistent with the server's time, use
   * /public/time method to obtain current server time.
   */
  valid_until?: number;
  /**
   * If true, routes the edit by label request to the isolated margin subaccount that
   * owns the order. Must be sent from the main account. Default - false
   */
  isolated?: boolean;
  /**
   * Optional additional margin amount transferred from the main account to the isolated
   * subaccount when editing an order to increase risk.
   */
  allocated_margin?: number;
}

export interface AdvTradeGlobalCancelRequest {
  /** The order id */
  order_id: string;
  /**
   * If true, routes the order cancellation to the isolated margin subaccount that owns
   * the order. Omitting this flag searches only the main account and returns
   * order_not_found or not_owner_of_order for isolated orders. Default - false
   */
  isolated?: boolean;
}

export interface AdvTradeGlobalCancelByLabelRequest {
  /** user defined label for the order (maximum 64 characters) */
  label: string;
  /** The currency symbol The published enum is a sample list, so this field stays a string. */
  currency?: string;
  /**
   * If true, extends label cancellation to include matching open orders across active
   * isolated-margin subaccounts. Default - false
   */
  include_isolated?: boolean;
}

export interface AdvTradeGlobalCancelAllRequest {
  /**
   * When detailed is set to true, the output format is changed to include a list of all
   * cancelled orders.
   */
  detailed?: boolean;
  /**
   * Whether or not to reject incoming quotes for 1 second after cancelling (false by
   * default). Related to private/mass_quote request.
   */
  freeze_quotes?: boolean;
  /**
   * If true, extends mass cancellation to include open orders across active
   * isolated-margin subaccounts. Default - false
   */
  include_isolated?: boolean;
}

export interface AdvTradeGlobalCancelAllByCurrencyRequest {
  /** The currency symbol The published enum is a sample list, so this field stays a string. */
  currency: string;
  /**
   * Instrument kind, "combo" for any combo or "any" for all. If not provided
   * instruments of all kinds are considered
   */
  kind?: AdvTradeGlobalRequestKindWithComboAll;
  /** Order type - limit, stop, take, trigger_all or all, default - all */
  type?: AdvTradeGlobalRequestSimpleOrderType;
  /**
   * When detailed is set to true, the output format is changed to include a list of all
   * cancelled orders.
   */
  detailed?: boolean;
  /**
   * Whether or not to reject incoming quotes for 1 second after cancelling (false by
   * default). Related to private/mass_quote request.
   */
  freeze_quotes?: boolean;
  /**
   * If true, extends currency mass cancellation to include open orders across active
   * isolated-margin subaccounts. Default - false
   */
  include_isolated?: boolean;
}

export interface AdvTradeGlobalCancelAllByCurrencyPairRequest {
  /**
   * The currency pair symbol The published enum is a sample list, so this field stays a
   * string.
   */
  currency_pair: string;
  /**
   * Instrument kind, "combo" for any combo or "any" for all. If not provided
   * instruments of all kinds are considered
   */
  kind?: AdvTradeGlobalRequestKindWithComboAll;
  /** Order type - limit, stop, take, trigger_all or all, default - all */
  type?: AdvTradeGlobalRequestSimpleOrderType;
  /**
   * When detailed is set to true, the output format is changed to include a list of all
   * cancelled orders.
   */
  detailed?: boolean;
  /**
   * Whether or not to reject incoming quotes for 1 second after cancelling (false by
   * default). Related to private/mass_quote request.
   */
  freeze_quotes?: boolean;
}

export interface AdvTradeGlobalCancelAllByInstrumentRequest {
  /** Instrument name */
  instrument_name: string;
  /** Order type - limit, stop, take, trigger_all or all, default - all */
  type?: AdvTradeGlobalRequestSimpleOrderType;
  /**
   * When detailed is set to true, the output format is changed to include a list of all
   * cancelled orders.
   */
  detailed?: boolean;
  /**
   * When set to true orders in combo instruments affecting a given position will also
   * be cancelled. Default: false
   */
  include_combos?: boolean;
  /**
   * Whether or not to reject incoming quotes for 1 second after cancelling (false by
   * default). Related to private/mass_quote request.
   */
  freeze_quotes?: boolean;
  /**
   * If true, extends instrument mass cancellation to include open orders across active
   * isolated-margin subaccounts. Default - false
   */
  include_isolated?: boolean;
}

export interface AdvTradeGlobalCancelAllByKindOrTypeRequest {
  /**
   * The currency symbol, list of currency symbols or "any" for all The published enum
   * is a sample list, so this field stays a string.
   */
  currency: AdvTradeGlobalRequestCurrencyWithAnyAndList;
  /**
   * Instrument kind, "combo" for any combo or "any" for all. If not provided
   * instruments of all kinds are considered
   */
  kind?: AdvTradeGlobalRequestKindWithComboAll;
  /** Order type - limit, stop, take, trigger_all or all, default - all */
  type?: AdvTradeGlobalRequestSimpleOrderType;
  /**
   * When detailed is set to true, the output format is changed to include a list of all
   * cancelled orders.
   */
  detailed?: boolean;
  /**
   * Whether or not to reject incoming quotes for 1 second after cancelling (false by
   * default). Related to private/mass_quote request.
   */
  freeze_quotes?: boolean;
}

export interface AdvTradeGlobalClosePositionRequest {
  /** Instrument name */
  instrument_name: string;
  /** The order type */
  type: 'limit' | 'market';
  /** Optional price for limit order. */
  price?: number;
  /**
   * If true, resolves the isolated subaccount bound to the instrument and submits an
   * opposite-side reduce-only order for the full position size. Default - false
   */
  isolated?: boolean;
}

export interface AdvTradeGlobalGetOpenOrdersRequest {
  /** Instrument kind, if not provided instruments of all kinds are considered */
  kind?: AdvTradeGlobalRequestKind;
  /** Order type, default - all */
  type?: AdvTradeGlobalRequestOrderType;
  /**
   * If true, widens the open orders query to include orders owned by hidden
   * isolated-margin subaccounts. Default - false
   */
  include_isolated?: boolean;
  /**
   * The user id for the subaccount. Main accounts can specify an isolated subaccount ID
   * to query its open orders directly.
   */
  subaccount_id?: number;
}

export interface AdvTradeGlobalGetOpenOrdersByCurrencyRequest {
  /** The currency symbol The published enum is a sample list, so this field stays a string. */
  currency: string;
  /** Instrument kind, if not provided instruments of all kinds are considered */
  kind?: AdvTradeGlobalRequestKind;
  /** Order type, default - all */
  type?: AdvTradeGlobalRequestOrderType;
}

export interface AdvTradeGlobalGetOpenOrdersByInstrumentRequest {
  /** Instrument name */
  instrument_name: string;
  /** Order type, default - all */
  type?: AdvTradeGlobalRequestOrderType;
}

export interface AdvTradeGlobalGetOpenOrdersByLabelRequest {
  /** The currency symbol The published enum is a sample list, so this field stays a string. */
  currency: string;
  /** user defined label for the order (maximum 64 characters) */
  label: string;
}

export interface AdvTradeGlobalGetOrderStateRequest {
  /** The order id */
  order_id: string;
  /**
   * If true, retrieves order state for an order owned by an isolated margin subaccount.
   * Default - false
   */
  isolated?: boolean;
}

export interface AdvTradeGlobalGetOrderStateByLabelRequest {
  /** The currency symbol The published enum is a sample list, so this field stays a string. */
  currency: string;
  /** user defined label for the order (maximum 64 characters) */
  label: string;
  /**
   * If true, searches open orders across hidden isolated-margin subaccounts as well as
   * the main account. Default - false
   */
  include_isolated?: boolean;
}

export interface AdvTradeGlobalGetOrderHistoryByCurrencyRequest {
  /** The currency symbol The published enum is a sample list, so this field stays a string. */
  currency: string;
  /**
   * Instrument kind, "combo" for any combo or "any" for all. If not provided
   * instruments of all kinds are considered
   */
  kind?: AdvTradeGlobalRequestKindWithComboAll;
  /** Number of requested items, default - 20, maximum - 1000 */
  count?: number;
  /** The offset for pagination, default - 0 */
  offset?: number;
  /** Include in result orders older than 2 days, default - false */
  include_old?: boolean;
  /** Include in result fully unfilled closed orders, default - false */
  include_unfilled?: boolean;
  /**
   * When set to true, the API response format changes from a simple list of orders to
   * an object containing the orders and a continuation token.
   */
  with_continuation?: boolean;
  /** Continuation token for pagination */
  continuation?: string;
  /**
   * Determines whether historical trade and order records should be retrieved. - false
   * (default): Returns recent records: orders for 30 min, trades for 24h. - true:
   * Fetches historical records, available after a short delay due to indexing. Recent
   * data is not included.
   */
  historical?: boolean;
  /**
   * The user id for the subaccount. Required to query order history for an isolated
   * margin subaccount; history queries for isolated subaccounts do not aggregate with
   * include_isolated.
   */
  subaccount_id?: number;
}

export interface AdvTradeGlobalGetOrderHistoryByInstrumentRequest {
  /** Instrument name */
  instrument_name: string;
  /** Number of requested items, default - 20, maximum - 1000 */
  count?: number;
  /** The offset for pagination, default - 0 */
  offset?: number;
  /** Include in result orders older than 2 days, default - false */
  include_old?: boolean;
  /** Include in result fully unfilled closed orders, default - false */
  include_unfilled?: boolean;
  /**
   * When set to true, the API response format changes from a simple list of orders to
   * an object containing the orders and a continuation token.
   */
  with_continuation?: boolean;
  /** Continuation token for pagination */
  continuation?: string;
  /**
   * Determines whether historical trade and order records should be retrieved. - false
   * (default): Returns recent records: orders for 30 min, trades for 24h. - true:
   * Fetches historical records, available after a short delay due to indexing. Recent
   * data is not included.
   */
  historical?: boolean;
}

export interface AdvTradeGlobalGetOrderMarginByIdsRequest {
  /** Ids of orders */
  ids: string[];
  /**
   * If true, calculates initial margin requirements under isolated margin scope.
   * Default - false
   */
  isolated?: boolean;
}

export interface AdvTradeGlobalGetTriggerOrderHistoryRequest {
  /** The currency symbol The published enum is a sample list, so this field stays a string. */
  currency: string;
  /** Instrument name */
  instrument_name?: string;
  /** Number of requested items, default - 20, maximum - 1000 */
  count?: number;
  /** Continuation token for pagination */
  continuation?: string;
}

export interface AdvTradeGlobalGetUserTradesByCurrencyRequest {
  /** The currency symbol The published enum is a sample list, so this field stays a string. */
  currency: string;
  /**
   * Instrument kind, "combo" for any combo or "any" for all. If not provided
   * instruments of all kinds are considered
   */
  kind?: AdvTradeGlobalRequestKindWithComboAll;
  /**
   * The ID of the first trade to be returned. Number for BTC trades, or hyphen name in
   * ex. "ETH-15" # "ETH_USDC-16"
   */
  start_id?: string;
  /**
   * The ID of the last trade to be returned. Number for BTC trades, or hyphen name in
   * ex. "ETH-15" # "ETH_USDC-16"
   */
  end_id?: string;
  /** Number of requested items, default - 10, maximum - 1000 */
  count?: number;
  /**
   * The earliest timestamp to return result from (milliseconds since the UNIX epoch).
   * When param is provided trades are returned from the earliest
   */
  start_timestamp?: number;
  /**
   * The most recent timestamp to return result from (milliseconds since the UNIX
   * epoch). Only one of params: start_timestamp, end_timestamp is truly required
   */
  end_timestamp?: number;
  /**
   * Direction of results sorting (default value means no sorting, results will be
   * returned in order in which they left the database)
   */
  sorting?: AdvTradeGlobalRequestSorting;
  /**
   * Determines whether historical trade and order records should be retrieved. - false
   * (default): Returns recent records: orders for 30 min, trades for 24h. - true:
   * Fetches historical records, available after a short delay due to indexing. Recent
   * data is not included.
   */
  historical?: boolean;
  /** The user id for the subaccount */
  subaccount_id?: number;
}

export interface AdvTradeGlobalGetUserTradesByCurrencyAndTimeRequest {
  /** The currency symbol The published enum is a sample list, so this field stays a string. */
  currency: string;
  /**
   * Instrument kind, "combo" for any combo or "any" for all. If not provided
   * instruments of all kinds are considered
   */
  kind?: AdvTradeGlobalRequestKindWithComboAll;
  /**
   * The earliest timestamp to return result from (milliseconds since the UNIX epoch).
   * When param is provided trades are returned from the earliest
   */
  start_timestamp: number;
  /**
   * The most recent timestamp to return result from (milliseconds since the UNIX
   * epoch). Only one of params: start_timestamp, end_timestamp is truly required
   */
  end_timestamp: number;
  /** Number of requested items, default - 10, maximum - 1000 */
  count?: number;
  /**
   * Direction of results sorting (default value means no sorting, results will be
   * returned in order in which they left the database)
   */
  sorting?: AdvTradeGlobalRequestSorting;
  /**
   * Determines whether historical trade and order records should be retrieved. - false
   * (default): Returns recent records: orders for 30 min, trades for 24h. - true:
   * Fetches historical records, available after a short delay due to indexing. Recent
   * data is not included.
   */
  historical?: boolean;
  /** Id of a subaccount */
  subaccount_id?: number;
}

export interface AdvTradeGlobalGetUserTradesByInstrumentRequest {
  /** Instrument name */
  instrument_name: string;
  /** The sequence number of the first trade to be returned */
  start_seq?: number;
  /** The sequence number of the last trade to be returned */
  end_seq?: number;
  /** Number of requested items, default - 10, maximum - 1000 */
  count?: number;
  /**
   * The earliest timestamp to return result from (milliseconds since the UNIX epoch).
   * When param is provided trades are returned from the earliest
   */
  start_timestamp?: number;
  /**
   * The most recent timestamp to return result from (milliseconds since the UNIX
   * epoch). Only one of params: start_timestamp, end_timestamp is truly required
   */
  end_timestamp?: number;
  /**
   * Determines whether historical trade and order records should be retrieved. - false
   * (default): Returns recent records: orders for 30 min, trades for 24h. - true:
   * Fetches historical records, available after a short delay due to indexing. Recent
   * data is not included.
   */
  historical?: boolean;
  /**
   * Direction of results sorting (default value means no sorting, results will be
   * returned in order in which they left the database)
   */
  sorting?: AdvTradeGlobalRequestSorting;
  /** Id of a subaccount */
  subaccount_id?: number;
}

export interface AdvTradeGlobalGetUserTradesByInstrumentAndTimeRequest {
  /** Instrument name */
  instrument_name: string;
  /**
   * The earliest timestamp to return result from (milliseconds since the UNIX epoch).
   * When param is provided trades are returned from the earliest
   */
  start_timestamp: number;
  /**
   * The most recent timestamp to return result from (milliseconds since the UNIX
   * epoch). Only one of params: start_timestamp, end_timestamp is truly required
   */
  end_timestamp: number;
  /** Number of requested items, default - 10, maximum - 1000 */
  count?: number;
  /**
   * Direction of results sorting (default value means no sorting, results will be
   * returned in order in which they left the database)
   */
  sorting?: AdvTradeGlobalRequestSorting;
  /**
   * Determines whether historical trade and order records should be retrieved. - false
   * (default): Returns recent records: orders for 30 min, trades for 24h. - true:
   * Fetches historical records, available after a short delay due to indexing. Recent
   * data is not included.
   */
  historical?: boolean;
  /** Id of a subaccount */
  subaccount_id?: number;
}

export interface AdvTradeGlobalGetUserTradesByOrderRequest {
  /** The order id */
  order_id: string;
  /**
   * Direction of results sorting (default value means no sorting, results will be
   * returned in order in which they left the database)
   */
  sorting?: AdvTradeGlobalRequestSorting;
  /**
   * Determines whether historical trade and order records should be retrieved. - false
   * (default): Returns recent records: orders for 30 min, trades for 24h. - true:
   * Fetches historical records, available after a short delay due to indexing. Recent
   * data is not included.
   */
  historical?: boolean;
  /** Id of a subaccount */
  subaccount_id?: number;
  /**
   * If true, retrieves trade fills for an order owned by an isolated margin subaccount.
   * Without this flag, isolated order fills read as not found. Default - false
   */
  isolated?: boolean;
}

export interface AdvTradeGlobalGetMarginsRequest {
  /** Instrument name */
  instrument_name: string;
  /**
   * It represents the requested order size. For perpetual and inverse futures the
   * amount is in USD units. For options and linear futures it is the underlying base
   * currency coin.
   */
  amount: number;
  /** Price */
  price: number;
  /**
   * If true, calculates margin requirements and estimated fees under isolated margin
   * scope instead of cross margin. Default - false
   */
  isolated?: boolean;
}

export interface AdvTradeGlobalGetAccountSummariesRequest {
  /** The user id for the subaccount */
  subaccount_id?: number;
  /** Include additional fields */
  extended?: boolean;
  /**
   * If true, includes isolated_account_summaries in the response containing account
   * summaries for active isolated margin subaccounts. Default - false
   */
  include_isolated?: boolean;
}

export interface AdvTradeGlobalGetAccountSummaryRequest {
  /** The currency symbol The published enum is a sample list, so this field stays a string. */
  currency: string;
  /** The user id for the subaccount */
  subaccount_id?: number;
  /** Include additional fields */
  extended?: boolean;
}

export interface AdvTradeGlobalGetPositionRequest {
  /** Instrument name */
  instrument_name: string;
  /**
   * If true, retrieves the position from a bound isolated margin subaccount for the
   * instrument. Omit to read the main account cross position. Default - false
   */
  include_isolated?: boolean;
}

export interface AdvTradeGlobalGetPositionsRequest {
  /** The published enum is a sample list, so this field stays a string. */
  currency?: string;
  /** Kind filter on positions */
  kind?: AdvTradeGlobalRequestKindWithoutSpot;
  /** The user id for the subaccount */
  subaccount_id?: number;
  /**
   * If true, widens the positions query to include positions owned by hidden
   * isolated-margin subaccounts. Default - false
   */
  include_isolated?: boolean;
}

export interface AdvTradeGlobalChangeMarginModelRequest {
  /** Id of a (sub)account - by default current user id is used */
  user_id?: number;
  /** Margin model */
  margin_model: 'cross_pm' | 'cross_sm' | 'segregated_pm' | 'segregated_sm';
  /** If true request returns the result without switching the margining model. Default: false */
  dry_run?: boolean;
}

export interface AdvTradeGlobalGetAccessLogRequest {
  /** The offset for pagination, default - 0 */
  offset?: number;
  /** Number of requested items, default - 10, maximum - 1000 */
  count?: number;
}

export interface AdvTradeGlobalGetTransactionLogRequest {
  /** The currency symbol The published enum is a sample list, so this field stays a string. */
  currency: string;
  /** The earliest timestamp to return result from (milliseconds since the UNIX epoch) */
  start_timestamp: number;
  /** The most recent timestamp to return result from (milliseconds since the UNIX epoch) */
  end_timestamp: number;
  /**
   * The following keywords can be used to filter the results: trade, maker, taker,
   * open, close, liquidation, buy, sell, withdrawal, delivery, settlement, deposit,
   * transfer, option, future, correction, block_trade, swap, expiry. Plus withdrawal or
   * transfer addresses
   */
  query?: string;
  /** Count of transaction log entries returned, default - 100, maximum - 250 */
  count?: number;
  /** Id of a subaccount */
  subaccount_id?: number;
  /** Continuation token for pagination */
  continuation?: number;
}

export interface AdvTradeGlobalGetSettlementHistoryByCurrencyRequest {
  /** The currency symbol The published enum is a sample list, so this field stays a string. */
  currency: string;
  /** Settlement type */
  type?: AdvTradeGlobalRequestSettlementType;
  /** Number of requested items, default - 20, maximum - 1000 */
  count?: number;
  /** Continuation token for pagination */
  continuation?: string;
  /** The latest timestamp to return result from (milliseconds since the UNIX epoch) */
  search_start_timestamp?: number;
  /**
   * The user id for the subaccount. Isolated perpetual settlements are recorded per
   * subaccount and only visible when targeting the subaccount directly.
   */
  subaccount_id?: number;
}

export interface AdvTradeGlobalGetSettlementHistoryByInstrumentRequest {
  /** Instrument name */
  instrument_name: string;
  /** Settlement type */
  type?: AdvTradeGlobalRequestSettlementType;
  /** Number of requested items, default - 20, maximum - 1000 */
  count?: number;
  /** Continuation token for pagination */
  continuation?: string;
  /** The latest timestamp to return result from (milliseconds since the UNIX epoch) */
  search_start_timestamp?: number;
}

export interface AdvTradeGlobalSimulatePortfolioRequest {
  /** The currency symbol The published enum is a sample list, so this field stays a string. */
  currency: string;
  /**
   * If true, adds simulated positions to current positions, otherwise uses only
   * simulated positions. By default true
   */
  add_positions?: boolean;
  /**
   * Object with positions in following form: {InstrumentName1: Position1,
   * InstrumentName2: Position2...}, for example {"BTC-PERPETUAL": -1000.0} (or
   * corresponding URI-encoding for GET). For futures in USD, for options in base
   * currency.
   */
  simulated_positions?: string;
}

export interface AdvTradeGlobalSimulatePmeRequest {
  /**
   * The currency for which the Extended Risk Matrix will be calculated. Use CROSS for
   * Cross Collateral simulation. The published enum is a sample list, so this field
   * stays a string.
   */
  currency: string;
  /**
   * If true, adds simulated positions to current positions, otherwise uses only
   * simulated positions. By default true
   */
  add_positions?: boolean;
  /**
   * Object with positions in following form: {InstrumentName1: Position1,
   * InstrumentName2: Position2...}, for example {"BTC-PERPETUAL": -1.0} (or
   * corresponding URI-encoding for GET). Size in base currency.
   */
  simulated_positions?: string;
}

export interface AdvTradeGlobalEnableCancelOnDisconnectRequest {
  /**
   * Specifies if Cancel On Disconnect change should be applied/checked for the current
   * connection or the account (default - connection) NOTICE: Scope connection can be
   * used only when working via Websocket.
   */
  scope?: 'connection' | 'account';
}

export interface AdvTradeGlobalDisableCancelOnDisconnectRequest {
  /**
   * Specifies if Cancel On Disconnect change should be applied/checked for the current
   * connection or the account (default - connection) NOTICE: Scope connection can be
   * used only when working via Websocket.
   */
  scope?: 'connection' | 'account';
}

export interface AdvTradeGlobalGetCancelOnDisconnectRequest {
  /**
   * Specifies if Cancel On Disconnect change should be applied/checked for the current
   * connection or the account (default - connection) NOTICE: Scope connection can be
   * used only when working via Websocket.
   */
  scope?: 'connection' | 'account';
}

export interface AdvTradeGlobalCreateComboRequest {
  /** List of trades used to create a combo */
  trades: AdvTradeGlobalRequestTrade[];
}

export interface AdvTradeGlobalGetLegPricesRequest {
  /** List of legs for which the prices will be calculated */
  legs: AdvTradeGlobalRequestLeg[];
  /** Price for the whole leg structure */
  price: number;
}
