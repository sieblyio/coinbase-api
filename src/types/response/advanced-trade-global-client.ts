/**
 * Types for Coinbase Advanced Trade Global Derivatives responses and shared schemas.
 *
 * Source: https://docs.cdp.coinbase.com/api-reference/coinbase-deribit-app-api/adv-starbase-openapi.json
 *
 * Methods return the JSON-RPC result, not the jsonrpc/id envelope.
 * Currency and index-name catalogs in that spec are sample lists, so those fields are string.
 */

export interface AdvTradeGlobalAuthResult {
  /** Access token to be used for authentication of subsequent requests. */
  access_token: string;
  /**
   * List of enabled advanced on-key features. Available options: -
   * restricted_block_trades : Limit the block_trade read the scope of the API key to
   * block trades that have been made using this specific API key - block_trade_approval
   * : Block trades created using this API key require additional user approval. Methods
   * that use block_rfq scope are not affected by Block Trade approval feature
   */
  enabled_features?: string[];
  /** Token lifetime in seconds */
  expires_in: number;
  /** The access token was acquired by logging in through Google. */
  google_login?: boolean;
  /** 2FA is required for privileged methods */
  mandatory_tfa_status?: string;
  /** Can be used to request a new token (with a new lifetime) */
  refresh_token?: string;
  /** Space-separated list of granted scopes */
  scope: string;
  /** Optional Session id */
  sid?: string;
  /** Copied from the input (if applicable) */
  state?: string;
  /** Authorization type, always bearer */
  token_type: 'bearer';
}

export interface AdvTradeGlobalGetAnnouncementsItem {
  /** The HTML body of the announcement */
  body: string;
  /** Whether the user confirmation is required for this announcement */
  confirmation?: boolean;
  /** A unique identifier for the announcement */
  id: number;
  /** Whether the announcement is marked as important */
  important: boolean;
  /** The timestamp (milliseconds since the Unix epoch) of announcement publication */
  publication_timestamp: number;
  /** The title of the announcement */
  title: string;
}

export interface AdvTradeGlobalBookSummary {
  /** The current best ask price, null if there aren't any asks */
  ask_price: number;
  /** Base currency */
  base_currency: string;
  /** The current best bid price, null if there aren't any bids */
  bid_price: number;
  /** The timestamp (milliseconds since the Unix epoch) */
  creation_timestamp: number;
  /**
   * Current instantaneous funding rate (perpetual only). Calculated as (mark_price −
   * index_price) / index_price at this moment. This is the rate that would apply if a
   * funding settlement occurred right now.
   */
  current_funding?: number;
  /** Optional (only for derivatives). Estimated delivery price for the market. */
  estimated_delivery_price?: number;
  /**
   * Projected 8-hour funding rate for the current settlement window (perpetual only).
   * This is the time-weighted accumulation of the funding rate since the last 8-hour
   * settlement - i.e. the total rate that will be charged or received at the next
   * settlement. current_funding shows the instantaneous rate; funding_8h shows what has
   * accumulated toward the next settlement.
   */
  funding_8h?: number;
  /** Price of the 24h highest trade */
  high: number;
  /** Unique instrument identifier */
  instrument_name: string;
  /** Interest rate used in implied volatility calculations (options only) */
  interest_rate?: number;
  /** The price of the latest trade, null if there weren't any trades */
  last: number;
  /** Price of the 24h lowest trade, null if there weren't any trades */
  low: number;
  /** (Only for option) implied volatility for mark price */
  mark_iv?: number;
  /** The current instrument market price */
  mark_price: number;
  /** The average of the best bid and ask, null if there aren't any asks or bids */
  mid_price: number;
  /**
   * Optional (only for derivatives). The total amount of outstanding contracts in the
   * corresponding amount units. For perpetual and inverse futures the amount is in USD
   * units. For options and linear futures it is the underlying base currency coin.
   */
  open_interest: number;
  /** 24-hour price change expressed as a percentage, null if there weren't any trades */
  price_change?: number;
  /** Quote currency */
  quote_currency: string;
  /** Name of the underlying future, or 'index_price' (options only) */
  underlying_index?: string;
  /** underlying price for implied volatility calculations (options only) */
  underlying_price?: number;
  /** The total 24h traded volume (in base currency) */
  volume: number;
  /** Volume in quote currency (futures and spots only) */
  volume_notional?: number;
  /** Volume in USD */
  volume_usd?: number;
}

export interface AdvTradeGlobalComboLeg {
  /**
   * Size multiplier of a leg. A negative value indicates that the trades on given leg
   * are in opposite direction to the combo trades they originate from
   */
  amount?: number;
  /** Unique instrument identifier */
  instrument_name?: string;
}

export type AdvTradeGlobalComboState = 'active' | 'inactive';

export interface AdvTradeGlobalGetContractSizeResult {
  /**
   * Contract size for the instrument, expressed in the same unit as the order amount.
   * For inverse (reversed) futures and perpetuals this is USD - BTC-PERPETUAL has a
   * contract size of 10 USD. For options, spots, and for linear futures and perpetuals
   * it is the base currency coin - BTC_USDC-PERPETUAL has a contract size of 0.0001
   * BTC. Note that on an inverse instrument base_currency identifies the underlying and
   * settlement coin and does not indicate the unit of contract_size.
   */
  contract_size: number;
}

export interface AdvTradeGlobalKeyNumberPair {
  name: string;
  value: number;
}

export interface AdvTradeGlobalData {
  /** The event date with year, month and day */
  date: string;
  /** The settlement price for the instrument. Only when state = closed */
  delivery_price: number;
}

export type AdvTradeGlobalKindFutureOrOptionWithAny =
  | 'future'
  | 'option'
  | 'any';

export interface AdvTradeGlobalGetFundingRateHistoryItem {
  /** Price in base currency */
  index_price?: number;
  /** 1hour interest rate */
  interest_1h?: number;
  /** 8hour interest rate */
  interest_8h?: number;
  /** Price in base currency */
  prev_index_price?: number;
  /** The timestamp (milliseconds since the Unix epoch) */
  timestamp?: number;
}

export interface AdvTradeGlobalGetHistoricalVolatilityItem {
  timestamp: number;
  value: number;
}

export interface AdvTradeGlobalGetIndexPriceResult {
  /**
   * Estimated delivery price for the market. For more details, see Documentation >
   * General > Expiration Price
   */
  estimated_delivery_price: number;
  /** Value of requested index */
  index_price: number;
}

export interface AdvTradeGlobalGetIndexPriceNamesItem {
  /** Whether future combo creation is enabled for this index (only present when extended=true) */
  future_combo_creation_enabled?: boolean;
  /** Index name */
  name: string;
  /** Whether option combo creation is enabled for this index (only present when extended=true) */
  option_combo_creation_enabled?: boolean;
}

export type AdvTradeGlobalKind =
  | 'future'
  | 'option'
  | 'spot'
  | 'future_combo'
  | 'option_combo';

export type AdvTradeGlobalBookState =
  | 'open'
  | 'settlement'
  | 'delivered'
  | 'inactive'
  | 'locked'
  | 'halted'
  | 'archivized';

export interface AdvTradeGlobalTickSizeStep {
  /** The price from which the increased tick size applies */
  above_price?: number;
  /** Tick size to be used above the price. It must be multiple of the minimum tick size. */
  tick_size?: number;
}

export type AdvTradeGlobalSettlementType =
  | 'settlement'
  | 'delivery'
  | 'bankruptcy';

export type AdvTradeGlobalDirection = 'buy' | 'sell';

export interface AdvTradeGlobalGreeks {
  /**
   * (Only for option) The delta value for the option. This is the Black Scholes Delta
   * for individual option expiries. Note that DeltaTotal in account summary uses Net
   * Transaction Delta instead. See the greeks object description for more details.
   */
  delta: number;
  /**
   * (Only for option) The gamma value for the option. Calculated using standard Black
   * Scholes without adjustments. Gamma measures the rate of change of delta with
   * respect to changes in the underlying asset price.
   */
  gamma: number;
  /**
   * (Only for option) The rho value for the option. Calculated using standard Black
   * Scholes without adjustments. Rho measures the sensitivity of the option price to
   * changes in the risk-free interest rate.
   */
  rho: number;
  /**
   * (Only for option) The theta value for the option. Deribit uses the minimum of (1
   * day Theta, lifetime theta of the option). So if you take an option with 1 hour to
   * expire for example, generally Black Scholes Theta will give you the equivalent 1
   * day Theta. Whereas we show the 1 hour Theta, so our Theta would differ from Black
   * Scholes Theta when time to expiry is less than 1 day. Theta measures the rate of
   * change of the option price with respect to time decay.
   */
  theta: number;
  /**
   * (Only for option) The vega value for the option. Calculated using standard Black
   * Scholes without adjustments. Vega (not actually a Greek symbol) measures the
   * sensitivity of the option price to changes in implied volatility.
   */
  vega: number;
}

export interface AdvTradeGlobalStats {
  /** Highest price during 24h */
  high: number;
  /** Lowest price during 24h */
  low: number;
  /** 24-hour price change expressed as a percentage, null if there weren't any trades */
  price_change?: number;
  /** Volume during last 24h in base currency */
  volume: number;
  /** Volume in usd (futures only) */
  volume_usd?: number;
}

export interface AdvTradeGlobalGetSupportedIndexNamesItem {
  /** Whether future combo creation is enabled for this index (only present when extended=true) */
  future_combo_creation_enabled?: boolean;
  /** Index name */
  name: string;
  /** Whether option combo creation is enabled for this index (only present when extended=true) */
  option_combo_creation_enabled?: boolean;
}

export interface AdvTradeGlobalTradesVolumes {
  /** Total 24h trade volume for call options. */
  calls_volume: number;
  /** Total 30d trade volume for call options. */
  calls_volume_30d?: number;
  /** Total 7d trade volume for call options. */
  calls_volume_7d?: number;
  /** Currency, i.e "BTC", "ETH", "USDC" */
  currency: string;
  /** Total 24h trade volume for futures. */
  futures_volume: number;
  /** Total 30d trade volume for futures. */
  futures_volume_30d?: number;
  /** Total 7d trade volume for futures. */
  futures_volume_7d?: number;
  /** Total 24h trade volume for put options. */
  puts_volume: number;
  /** Total 30d trade volume for put options. */
  puts_volume_30d?: number;
  /** Total 7d trade volume for put options. */
  puts_volume_7d?: number;
  /** Total 24h trade for spot. */
  spot_volume?: number;
  /** Total 30d trade for spot. */
  spot_volume_30d?: number;
  /** Total 7d trade for spot. */
  spot_volume_7d?: number;
}

export interface AdvTradeGlobalGetTradingviewChartDataResult {
  /** List of prices at close (one per candle) */
  close?: number[];
  /** List of cost bars (volume in quote currency, one per candle) */
  cost?: number[];
  /** List of highest price levels (one per candle) */
  high?: number[];
  /** List of lowest price levels (one per candle) */
  low?: number[];
  /** List of prices at open (one per candle) */
  open?: number[];
  /** Status of the query: ok or no_data */
  status?: 'ok' | 'no_data';
  /** Values of the time axis given in milliseconds since UNIX epoch */
  ticks?: number[];
  /** List of volume bars (in base currency, one per candle) */
  volume?: number[];
}

export interface AdvTradeGlobalGetVolatilityIndexDataResult {
  /**
   * Continuation - to be used as the end_timestamp parameter on the next request. NULL
   * when no continuation.
   */
  continuation?: number;
  /**
   * Candles as an array of arrays with 5 values each. The inner values correspond to
   * the timestamp in ms, open, high, low, and close values of the volatility index
   * correspondingly.
   */
  data?: any[];
}

export interface AdvTradeGlobalGetStatusResult {
  /**
   * true when platform is locked in all currencies, partial when some currencies are
   * locked, false - when there are not currencies locked
   */
  locked: string;
  /** List of currency indices locked platform-wise */
  locked_indices?: string[];
}

export interface AdvTradeGlobalTestResult {
  /** The API version */
  version: string;
}

export type AdvTradeGlobalAdvanced = 'usd' | 'implv';

export type AdvTradeGlobalOrderState =
  | 'open'
  | 'filled'
  | 'rejected'
  | 'cancelled'
  | 'untriggered'
  | 'triggered';

export type AdvTradeGlobalOrderType =
  | 'market'
  | 'limit'
  | 'stop_market'
  | 'stop_limit'
  | 'take_market'
  | 'take_limit'
  | 'trailing_stop';

export type AdvTradeGlobalOriginalOrderType = 'market' | 'market_limit';

export type AdvTradeGlobalOpenOrderPrice = number | 'market_price';

export type AdvTradeGlobalTimeInForce =
  | 'good_til_cancelled'
  | 'good_til_day'
  | 'fill_or_kill'
  | 'immediate_or_cancel';

export type AdvTradeGlobalTrigger = 'index_price' | 'mark_price' | 'last_price';

export type AdvTradeGlobalTriggerFillCondition =
  | 'first_hit'
  | 'complete_fill'
  | 'incremental';

export type AdvTradeGlobalOrderStateInUserTrade =
  | 'open'
  | 'filled'
  | 'rejected'
  | 'cancelled'
  | 'untriggered'
  | 'archive';

export interface AdvTradeGlobalClientInfo {
  /** ID of a client; available to broker. Represents a group of users under a common name. */
  client_id?: number;
  /** ID assigned to a single user in a client; available to broker. */
  client_link_id?: number;
  /** Name of the linked user within the client; available to broker. */
  name?: string;
}

export interface AdvTradeGlobalOrderIdInitialMarginPair {
  /** Initial margin of order */
  initial_margin: number;
  /** Currency of initial margin */
  initial_margin_currency?: string;
  /** Unique order identifier */
  order_id: string;
}

export interface AdvTradeGlobalGetMarginsResult {
  /** Margin when buying */
  buy: number;
  /** Estimated fee when buying as a maker */
  buy_maker_fee: number;
  /** Estimated fee when buying as a taker */
  buy_taker_fee: number;
  /**
   * The maximum price for the future. Any buy orders you submit higher than this price,
   * will be clamped to this maximum.
   */
  max_price: number;
  /**
   * The minimum price for the future. Any sell orders you submit lower than this price
   * will be clamped to this minimum.
   */
  min_price: number;
  /** Margin when selling */
  sell: number;
  /** Estimated fee when selling as a maker */
  sell_maker_fee: number;
  /** Estimated fee when selling as a taker */
  sell_taker_fee: number;
}

export type AdvTradeGlobalIsolatedAccountSummaries = object;

export type AdvTradeGlobalDeltaTotalMap = Record<string, number>;

export type AdvTradeGlobalFees = Record<string, any>;

export type AdvTradeGlobalAdvTradeGlobalFeesEntry = Record<string, any>;

export interface AdvTradeGlobalDefault {
  /** Maker fee */
  maker: number;
  /** Taker fee */
  taker: number;
  /** Fee calculation type (e.g., fixed, relative) */
  type: string;
}

export type AdvTradeGlobalApiLimits = object;

export type AdvTradeGlobalOptionsGammaMap = Record<string, number>;

export type AdvTradeGlobalOptionsThetaMap = Record<string, number>;

export type AdvTradeGlobalOptionsVegaMap = Record<string, number>;

export type AdvTradeGlobalTradingProductsDetails = object;

export type AdvTradeGlobalPositionDirection = 'buy' | 'sell' | 'zero';

export interface AdvTradeGlobalNewState {
  /** Available balance after change */
  available_balance: number;
  /** Initial margin rate after change */
  initial_margin_rate: number;
  /** Maintenance margin rate after change */
  maintenance_margin_rate: number;
}

export interface AdvTradeGlobalOldState {
  /** Available balance before change */
  available_balance: number;
  /** Initial margin rate before change */
  initial_margin_rate: number;
  /** Maintenance margin rate before change */
  maintenance_margin_rate: number;
}

export type AdvTradeGlobalFeeRole = 'maker' | 'taker';

export type AdvTradeGlobalInfo = object;

export type AdvTradeGlobalRole = 'maker' | 'taker';

export type AdvTradeGlobalSimulatePmeResult = object;

export type AdvTradeGlobalCodScope = 'connection' | 'account';

export interface AdvTradeGlobalLegStructureItem {
  /** Direction: buy, or sell */
  direction?: 'buy' | 'sell';
  /** Unique instrument identifier */
  instrument_name?: string;
  /** Price for a leg */
  price?: number;
  /** Ratio of amount between legs */
  ratio?: number;
}

export type AdvTradeGlobalKindWithComboAll =
  | 'future'
  | 'option'
  | 'spot'
  | 'future_combo'
  | 'option_combo'
  | 'combo'
  | 'any';

export type AdvTradeGlobalSorting = 'asc' | 'desc' | 'default';

export interface AdvTradeGlobalOtocoConfig {
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
  trigger?: 'index_price' | 'mark_price' | 'last_price';
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

export type AdvTradeGlobalSimpleOrderType =
  | 'all'
  | 'limit'
  | 'trigger_all'
  | 'stop'
  | 'take'
  | 'trailing_stop';

export type AdvTradeGlobalCurrencyWithAnyAndList = string | string[];

export type AdvTradeGlobalOrderType2 =
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

export type AdvTradeGlobalKindWithoutSpot =
  | 'future'
  | 'option'
  | 'future_combo'
  | 'option_combo';

export interface AdvTradeGlobalCombo {
  /** The timestamp (milliseconds since the Unix epoch) */
  creation_timestamp?: number;
  /** Unique combo identifier */
  id?: string;
  /** Instrument ID */
  instrument_id?: number;
  legs?: AdvTradeGlobalComboLeg[];
  /** Combo state: "active", "inactive" */
  state?: AdvTradeGlobalComboState;
  /** The timestamp (milliseconds since the Unix epoch) */
  state_timestamp?: number;
}

export interface AdvTradeGlobalCurrencyWithApr {
  /**
   * Simple Moving Average (SMA) of the last 7 days of rewards. If fewer than 7 days of
   * reward data are available, the APR is calculated as the average of the available
   * rewards. Only applicable to yield-generating tokens (USDE, STETH, USDC, BUILD).
   */
  apr?: number;
  /** The type of the currency. */
  coin_type: 'BITCOIN' | 'ETHER';
  /**
   * The abbreviation of the currency. This abbreviation is used elsewhere in the API to
   * identify the currency.
   */
  currency: string;
  /** The full name for the currency. */
  currency_long: string;
  /**
   * Internal identifier for this currency. Absent if the currency does not have an
   * assigned identifier.
   */
  currency_uuid?: string;
  /** The number of decimal places for the currency */
  decimals?: number;
  /** true if the currency is part of the cross collateral pool */
  in_cross_collateral_pool: boolean;
  /** Minimum number of block chain confirmations before deposit is accepted. */
  min_confirmations: number;
  /** The minimum transaction fee paid for withdrawals */
  min_withdrawal_fee?: number;
  /** The currency of the network */
  network_currency?: string;
  /** The network fee */
  network_fee?: number;
  /** The total transaction fee paid for withdrawals */
  withdrawal_fee: number;
  withdrawal_priorities?: AdvTradeGlobalKeyNumberPair[];
}

export interface AdvTradeGlobalGetDeliveryPricesResult {
  data: AdvTradeGlobalData[];
  /** Available delivery prices */
  records_total: number;
}

export interface AdvTradeGlobalGetFundingChartDataResult {
  /** Current interest */
  current_interest: number;
  data: AdvTradeGlobalData[];
  /** Current interest 8h */
  interest_8h: number;
}

export interface AdvTradeGlobalAccessLog {
  /** City where the IP address is registered (estimated) */
  city: string;
  /** Country where the IP address is registered (estimated) */
  country: string;
  /** Optional, additional information about action, type depends on log value */
  data?: AdvTradeGlobalData | string;
  /** Unique identifier */
  id: number;
  /** IP address of source that generated action */
  ip: string;
  /**
   * Action description. Possible values: - changed_email - email was changed -
   * changed_password - password was changed - disabled_tfa - TFA was disabled -
   * enabled_tfa - TFA was enabled - success - successful login - failure - login
   * failure - enabled_subaccount_login - login was enabled for subaccount (in data -
   * subaccount uid) - disabled_subaccount_login - login was disabled for subaccount (in
   * data - subaccount uid) - new_api_key - API key was created (in data key client id)
   * - removed_api_key - API key was removed (in data key client id) - changed_scope -
   * scope of API key was changed (in data key client id) - changed_whitelist -
   * whitelist of API key was edited (in data key client id) - disabled_api_key - API
   * key was disabled (in data key client id) - enabled_api_key - API key was enabled
   * (in data key client id) - reset_api_key - API key was reset (in data key client id)
   */
  log: string;
  /** The timestamp (milliseconds since the Unix epoch) */
  timestamp: number;
}

export interface AdvTradeGlobalExpirations {
  /** Currency name or "any" if don't care or "grouped" if grouped by currencies */
  currency?: string;
  /** Instrument kind: "future", "option" or "any" for all */
  kind?: AdvTradeGlobalKindFutureOrOptionWithAny;
}

export interface AdvTradeGlobalInstrument {
  /** The underlying currency being traded. */
  base_currency: string;
  /**
   * Internal identifier for the base currency. Absent if the base currency does not
   * have an assigned identifier.
   */
  base_currency_uuid?: string;
  /** Block Trade commission for instrument. */
  block_trade_commission?: number;
  /** Minimum amount for block trading. */
  block_trade_min_trade_amount?: number;
  /** Specifies minimal price change for block trading. */
  block_trade_tick_size?: number;
  /**
   * Contract size for the instrument, expressed in the same unit as the order amount.
   * For inverse (reversed) futures and perpetuals this is USD - BTC-PERPETUAL has a
   * contract size of 10 USD. For options, spots, and for linear futures and perpetuals
   * it is the base currency coin - BTC_USDC-PERPETUAL has a contract size of 0.0001
   * BTC. Note that on an inverse instrument base_currency identifies the underlying and
   * settlement coin and does not indicate the unit of contract_size.
   */
  contract_size: number;
  /** Counter currency for the instrument. */
  counter_currency?: string;
  /** The time when the instrument was first created (milliseconds since the UNIX epoch). */
  creation_timestamp: number;
  /** The time when the instrument will expire (milliseconds since the UNIX epoch). */
  expiration_timestamp: number;
  /**
   * Future type (only for futures)(field is deprecated and will be removed in the
   * future, instrument_type should be used instead).
   */
  future_type?: 'linear' | 'reversed';
  /**
   * Numeric identifier of the price index used by this instrument. Derived from the
   * index currency pair, so all instruments sharing the same price_index also share the
   * same index_id.
   */
  index_id: number;
  /** Instrument ID */
  instrument_id?: number;
  /** Unique instrument identifier */
  instrument_name: string;
  /** Type of the instrument. linear or reversed */
  instrument_type?: string;
  /** Indicates if the instrument can currently be traded. */
  is_active: boolean;
  /**
   * Optional (only for spot routed to Coinbase Exchange). Alias of is_csr added by
   * public/get_instrument and public/get_instruments; other surfaces that return
   * instrument metadata, such as the instrument.creation.{kind}.{currency}
   * notification, carry is_csr only. When present it is always true and is omitted for
   * every other instrument, so test for its presence rather than for a false value.
   */
  is_cbe_routed?: boolean;
  /**
   * Optional (only for spot routed to Coinbase Exchange). When present it is always
   * true, meaning orders on this instrument are routed to Coinbase Exchange (CBE) for
   * matching instead of the native Deribit matching engine. The field is omitted for
   * every other instrument, so test for its presence rather than for a false value.
   */
  is_csr?: boolean;
  /** Instrument kind: "future", "option", "spot", "future_combo", "option_combo" */
  kind: AdvTradeGlobalKind;
  /** Lot size for instrument, used as the unit for fee lot counting. */
  lot_size?: number;
  /** Maker commission for instrument. */
  maker_commission?: number;
  /** Maximal leverage for instrument (only for futures). */
  max_leverage?: number;
  /** Maximal liquidation trade commission for instrument (only for futures). */
  max_liquidation_commission?: number;
  /**
   * Minimum amount for trading. For perpetual and inverse futures the amount is in USD
   * units. For options and linear futures it is the underlying base currency coin.
   */
  min_trade_amount: number;
  /** The option type (only for options). */
  option_type?: 'call' | 'put';
  /** Name of price index that is used for this instrument */
  price_index: string;
  /**
   * Product group classification of the instrument's base currency. Determines gateway
   * and multicast channel assignment - see Underlying Tiers.
   */
  product_group: 'BTC' | 'ETH' | 'TIER_2' | 'TIER_3';
  /** Minimum quantity change (step size) for order amounts on this instrument. */
  qty_tick_size?: number;
  /** The currency in which the instrument prices are quoted. */
  quote_currency: string;
  /**
   * Internal identifier for the quote currency. Absent if the quote currency does not
   * have an assigned identifier.
   */
  quote_currency_uuid?: string;
  /** Optional (not added for spot). Settlement currency for the instrument. */
  settlement_currency?: string;
  /** Optional (not added for spot). The settlement period. */
  settlement_period: 'month' | 'week' | 'perpetual';
  /**
   * The state of the order book. Represents the current lifecycle stage of the
   * instrument. State Lifecycle and Meanings: - open: Default state for running books.
   * In this state book is accepting new orders, edits, cancels; prices should be
   * updated, trading is live. - settlement: Books enters to this state during
   * settlement/delivery. New orders, edits, cancels are not accepted. After this state
   * normally next state should be open if it was settlement, or delivered if it was
   * delivery. On enter to this state good till day orders in book are canceled. -
   * delivered: Final state of book that has been delivered. New orders, edits, cancels
   * are not accepted. After some time book process will be terminated and, instrument
   * moved to expired_instruments and its instrument_state will become archivized. On
   * enter to this all open orders in book are canceled. - inactive: After a book is
   * deactivated, this state is set on book. New orders, edits, cancels are not
   * accepted. On enter to this all open orders in book are canceled. Book in this state
   * is not considered as open. This can be also final state for book. - locked: New
   * orders, edits, are not accepted, only cancels ARE accepted. In some cases when
   * configured books can start as locked or it may become locked on admin request.
   * Settlement is possible on locked books. - halted: The state that books enter as a
   * result of an error. Settlement is not possible when there is at least one book in
   * this state. - archivized: Set when instrument is moved to expired_instruments
   * table, final state.
   */
  state?: AdvTradeGlobalBookState;
  /** The strike value (only for options). */
  strike?: number;
  /** Taker commission for instrument. */
  taker_commission?: number;
  /**
   * Specifies minimal price change and, as follows, the number of decimal places for
   * instrument prices.
   */
  tick_size: number;
  tick_size_steps?: AdvTradeGlobalTickSizeStep;
  /** The type of the underlying asset. */
  underlying_type:
    | 'crypto'
    | 'equity'
    | 'commodity'
    | 'preipo'
    | 'equity_etf'
    | 'crypto_index'
    | 'adr'
    | 'foreign_equity'
    | 'equity_index'
    | 'commodity_index'
    | 'commodity_etf'
    | 'otc';
}

export interface AdvTradeGlobalSettlement {
  /** funded amount (bankruptcy only) */
  funded?: number;
  /** funding (in base currency ; settlement for perpetual product only) */
  funding: number;
  /** underlying index price at time of event (in quote currency; settlement and delivery only) */
  index_price: number;
  /** instrument name (settlement and delivery only) */
  instrument_name: string;
  /** mark price for at the settlement time (in quote currency; settlement and delivery only) */
  mark_price?: number;
  /** position size (in quote currency; settlement and delivery only) */
  position: number;
  /**
   * Platform-wide aggregate realized profit and loss for this settlement event, in base
   * currency. This is the sum of the realized P&L of every position holder at the
   * settlement or delivery price - it is not a per-account value. Present for
   * settlement and delivery types only.
   */
  profit_loss?: number;
  /** value of session bankruptcy (in base currency; bankruptcy only) */
  session_bankruptcy?: number;
  /**
   * Platform-wide aggregate total session profit and loss for this settlement event, in
   * base currency. This is the sum of each position holder's session P&L (combining
   * realized and unrealized components) across all users who held positions in the
   * instrument - it is not a per-account value.
   */
  session_profit_loss: number;
  /** total amount of paid taxes/fees (in base currency; bankruptcy only) */
  session_tax?: number;
  /** rate of paid taxes/fees (in base currency; bankruptcy only) */
  session_tax_rate?: number;
  /** the amount of the socialized losses (in base currency; bankruptcy only) */
  socialized?: number;
  /** The timestamp (milliseconds since the Unix epoch) */
  timestamp: number;
  /**
   * The type of settlement event. settlement: daily settlement of futures and perpetual
   * positions at 08:00 UTC, converting unrealized profit and loss into realized profit
   * and loss (option positions do not settle). delivery: one-time expiration of a
   * futures or options contract at 08:00 UTC, closing any remaining open position at
   * the delivery price (does not apply to perpetual or spot instruments). bankruptcy.
   */
  type: AdvTradeGlobalSettlementType;
}

export interface AdvTradeGlobalPublicTrade {
  /**
   * Trade amount. For perpetual and inverse futures the amount is in USD units. For
   * options and linear futures it is the underlying base currency coin.
   */
  amount: number;
  /** ID of the Block RFQ - when trade was part of the Block RFQ */
  block_rfq_id?: number;
  /** Block trade id - when trade was part of a block trade */
  block_trade_id?: string;
  /** Block trade leg count - when trade was part of a block trade */
  block_trade_leg_count?: number;
  /** Optional field containing combo instrument name if the trade is a combo trade */
  combo_id?: string;
  /** Optional field containing combo trade identifier if the trade is a combo trade */
  combo_trade_id?: string;
  /** Trade size in contract units (optional, may be absent in historical trades) */
  contracts?: number;
  /** Trade direction of the taker */
  direction: AdvTradeGlobalDirection;
  /** Index Price at the moment of trade */
  index_price: number;
  /** Unique instrument identifier */
  instrument_name: string;
  /** Option implied volatility for the price (Option only) */
  iv?: number;
  /**
   * Optional field (only for trades caused by liquidation): "M" when maker side of
   * trade was under liquidation, "T" when taker side was under liquidation, "MT" when
   * both sides of trade were under liquidation
   */
  liquidation?: 'M' | 'T' | 'MT';
  /** Mark Price at the moment of trade */
  mark_price: number;
  /** The price of the trade */
  price: number;
  /**
   * Optional field containing the Starbase match identifier (present only for trades
   * matched via Starbase)
   */
  starbase_match_id?: number;
  /**
   * Optional field: the Starbase causal timestamp of the trade, in nanoseconds since
   * the UNIX epoch (present only for trades matched in Starbase)
   */
  starbase_timestamp?: number;
  /**
   * Direction of the "tick" (0 = Plus Tick, 1 = Zero-Plus Tick, 2 = Minus Tick, 3 =
   * Zero-Minus Tick).
   */
  tick_direction: number;
  /** The timestamp of the trade (milliseconds since the UNIX epoch) */
  timestamp: number;
  /** Unique (per currency) trade identifier */
  trade_id: string;
  /** The sequence number of the trade within instrument */
  trade_seq: number;
}

export interface AdvTradeGlobalTrades {
  /**
   * It represents the requested order size. For perpetual and inverse futures the
   * amount is in USD units. For options and linear futures it is the underlying base
   * currency coin.
   */
  amount?: number;
  /** Direction: buy, or sell */
  direction?: AdvTradeGlobalDirection;
  /** Unique instrument identifier */
  instrument_name?: string;
}

export interface AdvTradeGlobalLegs {
  /**
   * It represents the requested trade size. For perpetual and inverse futures the
   * amount is in USD units. For options and linear futures it is the underlying base
   * currency coin.
   */
  amount?: number;
  /** Direction of selected leg */
  direction?: AdvTradeGlobalDirection;
  /** Instrument name */
  instrument_name?: string;
}

export interface AdvTradeGlobalTickerNotificationWithBidsAndAsks {
  /** (Only for option) implied volatility for best ask */
  ask_iv?: number;
  asks: number[][];
  /** It represents the requested order size of all best asks */
  best_ask_amount: number | null;
  /** The current best ask price, null if there aren't any asks */
  best_ask_price: number | null;
  /** It represents the requested order size of all best bids */
  best_bid_amount: number | null;
  /** The current best bid price, null if there aren't any bids */
  best_bid_price: number | null;
  /** (Only for option) implied volatility for best bid */
  bid_iv?: number;
  bids: number[][];
  /** Current funding (perpetual only) */
  current_funding?: number;
  /** The settlement price for the instrument. Only when state = closed */
  delivery_price?: number;
  /** Funding 8h (perpetual only) */
  funding_8h?: number;
  /**
   * Only for options. Greeks are risk measures that describe how the option's price
   * changes with respect to various factors. Delta (Δ) Deribit uses two different
   * Deltas: - DeltaTotal in the account summary uses the Net Transaction Delta (NTD) -
   * Delta for individual option expiries is the Black Scholes Delta In the settings
   * section you can toggle Net Transaction Delta instead. What is DeltaTotal in the
   * account summary? DeltaTotal = Net Transaction Delta of options + BTC Position of
   * Futures What is Net Transaction Delta? Net Transaction Delta = Black Scholes Delta
   * - Mark Price of Options Why do we use a Net Transaction Delta? The Delta Total uses
   * the Net Transaction Delta (or price adjusted Delta) of the options. This is
   * because, from a risk perspective, we are interested in the change in Bitcoin price
   * as the underlying changes. You should actually treat your delta as Equity + Delta
   * Total if you want to have less risk for your USD PnL. Example: Consider a call
   * option with strike 0, which has a Black Scholes Delta of 1 and Net Transaction
   * Delta = 0. Imagine you have 2 BTC equity and no positions and BTC price is at USD
   * 60k. In that case you would short 2 Futures contracts to hedge your USD exposure to
   * BTC. Now let's say you buy one call with strike 0. The question is if you should
   * sell another future? The call will always have a price of 1 BTC. So you buy it at 1
   * BTC which equates to USD 60k. Let's say the price increases to USD 70k. The value
   * of the call is still 1 BTC. At settlement you receive 1 BTC for the call. So you
   * paid 1 BTC and then receive 1 BTC which means your USD PnL on buying the call is 0.
   * If you sold a future on it, then you would actually lose on the future. ⚠️ During
   * the 30 minute settlement period we decay your Delta. See Delta decay during
   * settlement for more details. Theta (Θ) The Theta that Deribit uses is the minimum
   * of (1 day Theta, lifetime theta of the option). So if you take an option with 1
   * hour to expire for example, generally Black Scholes Theta will give you the
   * equivalent 1 day Theta. Whereas we show the 1 hour Theta, so our Theta would differ
   * from Black Scholes Theta when time to expiry is less than 1 day. Vega, Gamma, and
   * Rho Vega (not actually a Greek symbol), Gamma, Theta and Rho values shown on
   * Deribit are calculated using standard Black Scholes without adjustments.
   */
  greeks?: AdvTradeGlobalGreeks;
  /** Current index price */
  index_price: number;
  /** Unique instrument identifier */
  instrument_name: string;
  /** Interest rate used in implied volatility calculations (options only) */
  interest_rate?: number;
  /** The price for the last trade */
  last_price: number | null;
  /** (Only for option) implied volatility for mark price */
  mark_iv?: number;
  /** The mark price for the instrument */
  mark_price: number;
  /**
   * The maximum price for the future. Any buy orders you submit higher than this price,
   * will be clamped to this maximum.
   */
  max_price: number;
  /**
   * The minimum price for the future. Any sell orders you submit lower than this price
   * will be clamped to this minimum.
   */
  min_price: number;
  /**
   * The total amount of outstanding contracts in the corresponding amount units. For
   * perpetual and inverse futures the amount is in USD units. For options and linear
   * futures it is the underlying base currency coin.
   */
  open_interest: number;
  /**
   * Optional (not added for spot). The settlement price for the instrument. Only when
   * state = open
   */
  settlement_price?: number;
  /**
   * The state of the order book. Represents the current lifecycle stage of the
   * instrument. State Lifecycle and Meanings: - open: Default state for running books.
   * In this state book is accepting new orders, edits, cancels; prices should be
   * updated, trading is live. - settlement: Books enters to this state during
   * settlement/delivery. New orders, edits, cancels are not accepted. After this state
   * normally next state should be open if it was settlement, or delivered if it was
   * delivery. On enter to this state good till day orders in book are canceled. -
   * delivered: Final state of book that has been delivered. New orders, edits, cancels
   * are not accepted. After some time book process will be terminated and, instrument
   * moved to expired_instruments and its instrument_state will become archivized. On
   * enter to this all open orders in book are canceled. - inactive: After a book is
   * deactivated, this state is set on book. New orders, edits, cancels are not
   * accepted. On enter to this all open orders in book are canceled. Book in this state
   * is not considered as open. This can be also final state for book. - locked: New
   * orders, edits, are not accepted, only cancels ARE accepted. In some cases when
   * configured books can start as locked or it may become locked on admin request.
   * Settlement is possible on locked books. - halted: The state that books enter as a
   * result of an error. Settlement is not possible when there is at least one book in
   * this state. - archivized: Set when instrument is moved to expired_instruments
   * table, final state.
   */
  state: AdvTradeGlobalBookState;
  stats: AdvTradeGlobalStats;
  /** The timestamp (milliseconds since the Unix epoch) */
  timestamp: number;
  /** Name of the underlying future, or index_price (options only) */
  underlying_index?: number;
  /** Underlying price for implied volatility calculations (options only) */
  underlying_price?: number;
}

export interface AdvTradeGlobalTickerNotification {
  /**
   * The upper bound of the anchor price band, computed as anchor_price * (1 +
   * bandwidth). Only present for RWA perpetual instruments when an anchor price and
   * bandwidth are defined.
   */
  anchor_max_price?: number;
  /**
   * The lower bound of the anchor price band, computed as anchor_price * (1 -
   * bandwidth). Only present for RWA perpetual instruments when an anchor price and
   * bandwidth are defined.
   */
  anchor_min_price?: number;
  /** (Only for option) implied volatility for best ask */
  ask_iv?: number;
  /** It represents the requested order size of all best asks */
  best_ask_amount: number | null;
  /** The current best ask price, null if there aren't any asks */
  best_ask_price: number | null;
  /** It represents the requested order size of all best bids */
  best_bid_amount: number | null;
  /** The current best bid price, null if there aren't any bids */
  best_bid_price: number | null;
  /** (Only for option) implied volatility for best bid */
  bid_iv?: number;
  /** Current funding (perpetual only) */
  current_funding?: number;
  /** The settlement price for the instrument. Only when state = closed */
  delivery_price?: number;
  /**
   * Estimated delivery price for the market. For more details, see Contract
   * Specification > General Documentation > Expiration Price
   */
  estimated_delivery_price: number;
  /** Funding 8h (perpetual only) */
  funding_8h?: number;
  /**
   * Only for options. Greeks are risk measures that describe how the option's price
   * changes with respect to various factors. Delta (Δ) Deribit uses two different
   * Deltas: - DeltaTotal in the account summary uses the Net Transaction Delta (NTD) -
   * Delta for individual option expiries is the Black Scholes Delta In the settings
   * section you can toggle Net Transaction Delta instead. What is DeltaTotal in the
   * account summary? DeltaTotal = Net Transaction Delta of options + BTC Position of
   * Futures What is Net Transaction Delta? Net Transaction Delta = Black Scholes Delta
   * - Mark Price of Options Why do we use a Net Transaction Delta? The Delta Total uses
   * the Net Transaction Delta (or price adjusted Delta) of the options. This is
   * because, from a risk perspective, we are interested in the change in Bitcoin price
   * as the underlying changes. You should actually treat your delta as Equity + Delta
   * Total if you want to have less risk for your USD PnL. Example: Consider a call
   * option with strike 0, which has a Black Scholes Delta of 1 and Net Transaction
   * Delta = 0. Imagine you have 2 BTC equity and no positions and BTC price is at USD
   * 60k. In that case you would short 2 Futures contracts to hedge your USD exposure to
   * BTC. Now let's say you buy one call with strike 0. The question is if you should
   * sell another future? The call will always have a price of 1 BTC. So you buy it at 1
   * BTC which equates to USD 60k. Let's say the price increases to USD 70k. The value
   * of the call is still 1 BTC. At settlement you receive 1 BTC for the call. So you
   * paid 1 BTC and then receive 1 BTC which means your USD PnL on buying the call is 0.
   * If you sold a future on it, then you would actually lose on the future. ⚠️ During
   * the 30 minute settlement period we decay your Delta. See Delta decay during
   * settlement for more details. Theta (Θ) The Theta that Deribit uses is the minimum
   * of (1 day Theta, lifetime theta of the option). So if you take an option with 1
   * hour to expire for example, generally Black Scholes Theta will give you the
   * equivalent 1 day Theta. Whereas we show the 1 hour Theta, so our Theta would differ
   * from Black Scholes Theta when time to expiry is less than 1 day. Vega, Gamma, and
   * Rho Vega (not actually a Greek symbol), Gamma, Theta and Rho values shown on
   * Deribit are calculated using standard Black Scholes without adjustments.
   */
  greeks?: AdvTradeGlobalGreeks;
  /** Current index price */
  index_price: number;
  /** Unique instrument identifier */
  instrument_name: string;
  /** Interest rate used in implied volatility calculations (options only) */
  interest_rate?: number;
  /** Value used to calculate realized_funding in positions (perpetual only) */
  interest_value?: number;
  /**
   * Whether the mark price has breached the anchor price band. Only present for RWA
   * perpetual instruments when an anchor price is active.
   */
  is_anchor_breached?: boolean;
  /** The price for the last trade */
  last_price: number | null;
  /** (Only for option) implied volatility for mark price */
  mark_iv?: number;
  /** The mark price for the instrument */
  mark_price: number;
  /**
   * The maximum price for the future. Any buy orders you submit higher than this price,
   * will be clamped to this maximum.
   */
  max_price: number;
  /**
   * The minimum price for the future. Any sell orders you submit lower than this price
   * will be clamped to this minimum.
   */
  min_price: number;
  /**
   * The total amount of outstanding contracts in the corresponding amount units. For
   * perpetual and inverse futures the amount is in USD units. For options and linear
   * futures it is the underlying base currency coin.
   */
  open_interest: number;
  /**
   * Optional (not added for spot). The settlement price for the instrument. Only when
   * state = open
   */
  settlement_price?: number;
  /**
   * The state of the order book. Represents the current lifecycle stage of the
   * instrument. State Lifecycle and Meanings: - open: Default state for running books.
   * In this state book is accepting new orders, edits, cancels; prices should be
   * updated, trading is live. - settlement: Books enters to this state during
   * settlement/delivery. New orders, edits, cancels are not accepted. After this state
   * normally next state should be open if it was settlement, or delivered if it was
   * delivery. On enter to this state good till day orders in book are canceled. -
   * delivered: Final state of book that has been delivered. New orders, edits, cancels
   * are not accepted. After some time book process will be terminated and, instrument
   * moved to expired_instruments and its instrument_state will become archivized. On
   * enter to this all open orders in book are canceled. - inactive: After a book is
   * deactivated, this state is set on book. New orders, edits, cancels are not
   * accepted. On enter to this all open orders in book are canceled. Book in this state
   * is not considered as open. This can be also final state for book. - locked: New
   * orders, edits, are not accepted, only cancels ARE accepted. In some cases when
   * configured books can start as locked or it may become locked on admin request.
   * Settlement is possible on locked books. - halted: The state that books enter as a
   * result of an error. Settlement is not possible when there is at least one book in
   * this state. - archivized: Set when instrument is moved to expired_instruments
   * table, final state.
   */
  state: AdvTradeGlobalBookState;
  stats: AdvTradeGlobalStats;
  /** The timestamp (milliseconds since the Unix epoch) */
  timestamp: number;
  /** Name of the underlying future, or index_price (options only) */
  underlying_index?: number;
  /** Underlying price for implied volatility calculations (options only) */
  underlying_price?: number;
}

export interface AdvTradeGlobalTriggerOrderHistoryRecord {
  /**
   * It represents the requested order size. For perpetual and inverse futures the
   * amount is in USD units. For options and linear futures it is the underlying base
   * currency coin.
   */
  amount: number;
  /** Direction: buy, or sell */
  direction: AdvTradeGlobalDirection;
  /** Unique instrument identifier */
  instrument_name: string;
  /**
   * true if the order is an order that can be triggered by another order, otherwise not
   * present.
   */
  is_secondary_oto?: boolean;
  /** User defined label (presented only when previously set for order by user) */
  label?: string;
  /** The timestamp (milliseconds since the Unix epoch) */
  last_update_timestamp?: number;
  /** Unique reference that identifies a one_cancels_others (OCO) pair. */
  oco_ref?: string;
  /** Unique order identifier */
  order_id: string;
  /**
   * Order state: "triggered", "cancelled", or "rejected" with rejection reason (e.g.
   * "rejected:reduce_direction").
   */
  order_state: string;
  /** Requested order type: "limit" or "market" */
  order_type: 'limit' | 'market';
  /** true for post-only orders only */
  post_only: boolean;
  /** Price in base currency */
  price: number;
  /** Optional (not added for spot). 'true for reduce-only orders only' */
  reduce_only: boolean;
  /**
   * Type of last request performed on the trigger order by user or system. "cancel" -
   * when order was cancelled, "trigger:order" - when trigger order spawned market or
   * limit order after being triggered
   */
  request: string;
  /** Source of the order that is linked to the trigger order. */
  source?: string;
  /** The timestamp (milliseconds since the Unix epoch) */
  timestamp: number;
  /**
   * Trigger type (only for trigger orders). Allowed values: "index_price",
   * "mark_price", "last_price".
   */
  trigger: AdvTradeGlobalTrigger;
  /**
   * The maximum deviation from the price peak beyond which the order will be triggered
   * (Only for trailing trigger orders)
   */
  trigger_offset: number;
  /** Id of the user order used for the trigger-order reference before triggering */
  trigger_order_id: string;
  /** Trigger price (Only for future trigger orders) */
  trigger_price: number;
}

export interface AdvTradeGlobalOrder {
  /** advanced type: "usd" or "implv" (Only for options; field is omitted if not applicable). */
  advanced?: AdvTradeGlobalAdvanced;
  /**
   * It represents the requested order size. For perpetual and inverse futures the
   * amount is in USD units. For options and linear futures it is the underlying base
   * currency coin.
   */
  amount?: number;
  /** true if created with API */
  api: boolean;
  /** The name of the application that placed the order on behalf of the user (optional). */
  app_name?: string;
  /**
   * Options, advanced orders only - true if last modification of the order was
   * performed by the pricing engine, otherwise false.
   */
  auto_replaced?: boolean;
  /** Average fill price of the order */
  average_price?: number;
  /** true if order made from block_trade trade, added only in that case. */
  block_trade?: boolean;
  /**
   * Enumerated reason behind cancel "user_request", "autoliquidation",
   * "cancel_on_disconnect", "risk_mitigation", "pme_risk_reduction" (portfolio
   * margining risk reduction), "pme_account_locked" (portfolio margining account locked
   * per currency), "position_locked", "mmp_trigger" (market maker protection),
   * "mmp_config_curtailment" (market maker configured quantity decreased),
   * "edit_post_only_reject" (cancelled on edit because of reject_post_only setting),
   * "oco_other_closed" (the oco order linked to this order was closed),
   * "oto_primary_closed" (the oto primary order that was going to trigger this order
   * was cancelled), "settlement" (closed because of a settlement event, e.g.
   * good-til-day orders are cancelled when an instrument enters the daily settlement).
   * Note: orders cancelled because an instrument expired (delivery) currently do not
   * include a cancel_reason field.
   */
  cancel_reason?: string;
  /**
   * Id of the combo order that created this order (only present for orders that were
   * created as legs of a combo order).
   */
  combo_order_id?: string;
  /**
   * It represents the order size in contract units. (Optional, may be absent in
   * historical data).
   */
  contracts?: number;
  /** The timestamp (milliseconds since the Unix epoch) */
  creation_timestamp: number;
  /** Direction: buy, or sell */
  direction: AdvTradeGlobalDirection;
  /** The actual display amount of iceberg order. Absent for other types of orders. */
  display_amount?: number;
  /**
   * Filled amount of the order. For perpetual and futures the filled_amount is in USD
   * units, for options - in units or corresponding cryptocurrency contracts, e.g., BTC
   * or ETH.
   */
  filled_amount?: number;
  /** Implied volatility in percent. (Only if advanced="implv") */
  implv?: number;
  /** Unique instrument identifier */
  instrument_name: string;
  /** Optional (not added for spot). true if order was automatically created during liquidation */
  is_liquidation?: boolean;
  /** true if the order is an order that can trigger an OCO pair, otherwise not present. */
  is_primary_otoco?: boolean;
  /**
   * Optional (only for spot). true if order was automatically created during
   * cross-collateral balance restoration
   */
  is_rebalance?: boolean;
  /**
   * true if the order is an order that can be triggered by another order, otherwise not
   * present.
   */
  is_secondary_oto?: boolean;
  /**
   * Flag indicating whether the order belongs to an isolated margin subaccount. Present
   * and true on isolated orders only.
   */
  isolated?: boolean;
  /** User defined label (up to 64 characters) */
  label: string;
  /** The timestamp (milliseconds since the Unix epoch) */
  last_update_timestamp: number;
  /** User identifier for the owning main account. Present on isolated orders only. */
  main_uid?: number;
  /** true if the order is a MMP order, otherwise false. */
  mmp?: boolean;
  /** true if order was cancelled by mmp trigger (optional) */
  mmp_cancelled?: boolean;
  /**
   * Name of the MMP group supplied in the private/mass_quote request. Only present for
   * quote orders.
   */
  mmp_group?: string;
  /** Optional field with value true added only when created with Mobile Application */
  mobile?: boolean;
  /** Unique reference that identifies a one_cancels_others (OCO) pair. */
  oco_ref?: string;
  /** Unique order identifier */
  order_id: string;
  /** Order state: "open", "filled", "rejected", "cancelled", "untriggered" */
  order_state: AdvTradeGlobalOrderState;
  /**
   * Order type: "limit", "market", "stop_limit", "stop_market", "take_limit",
   * "take_market", "trailing_stop"
   */
  order_type: AdvTradeGlobalOrderType;
  /**
   * Original API order type when an order is represented internally as a limit order.
   * For example, Starbase market orders use "limit" as order_type with "market" in this
   * optional field.
   */
  original_order_type?: AdvTradeGlobalOriginalOrderType;
  /** The Ids of the orders that will be triggered if the order is filled */
  oto_order_ids?: string[];
  /** true for post-only orders only */
  post_only: boolean;
  /** Price in base currency or "market_price" in case of open trigger market orders */
  price: AdvTradeGlobalOpenOrderPrice;
  /** ID of the order that triggered this order. */
  primary_order_id?: string;
  /** If order is a quote. Present only if true. */
  quote?: boolean;
  /**
   * The same QuoteID as supplied in the private/mass_quote request. Only present for
   * quote orders.
   */
  quote_id?: string;
  /**
   * Identifier of the QuoteSet supplied in the private/mass_quote request. Only present
   * for quote orders.
   */
  quote_set_id?: string;
  /** Optional (not added for spot). 'true for reduce-only orders only' */
  reduce_only?: boolean;
  /**
   * The initial display amount of iceberg order. Iceberg order display amount will be
   * refreshed to that value after match consuming actual display amount. Absent for
   * other types of orders
   */
  refresh_amount?: number;
  /** true if order has reject_post_only flag (field is present only when post_only is true) */
  reject_post_only?: boolean;
  /**
   * true if the order was edited (by user or - in case of advanced options orders - by
   * pricing engine), otherwise false.
   */
  replaced?: boolean;
  /**
   * true if the order is marked by the platform as a risk reducing order (can apply
   * only to orders placed by PM users), otherwise false.
   */
  risk_reducing?: boolean;
  /**
   * Client order id of an order submitted directly to Starbase via direct access; not
   * returned for orders placed through the Deribit API (combo legs inherit the parent
   * combo order's client order id)
   */
  starbase_client_order_id?: string;
  /**
   * The Starbase causal timestamp (nanoseconds since the Unix epoch) of the last book
   * update that affected this order. Present only for orders placed in Starbase,
   * including combo leg order updates; not always available for direct access orders
   */
  starbase_last_update_timestamp?: number;
  /**
   * Raw Starbase order id, in Starbase's own (non currency-prefixed) id namespace. Only
   * present for orders placed in Starbase. Combo leg orders expose the parent combo
   * order's Starbase order id.
   */
  starbase_order_id?: number;
  /**
   * Order time in force: "good_til_cancelled", "good_til_day", "fill_or_kill" or
   * "immediate_or_cancel"
   */
  time_in_force: AdvTradeGlobalTimeInForce;
  /**
   * Trigger type (only for trigger orders). Allowed values: "index_price",
   * "mark_price", "last_price".
   */
  trigger?: AdvTradeGlobalTrigger;
  /**
   * The fill condition of the linked order (Only for linked order types), default:
   * first_hit. "first_hit" - any execution of the primary order will fully cancel/place
   * all secondary orders. "complete_fill" - a complete execution (meaning the primary
   * order no longer exists) will cancel/place the secondary orders. "incremental" - any
   * fill of the primary order will cause proportional partial cancellation/placement of
   * the secondary order. The amount that will be subtracted/added to the secondary
   * order will be rounded down to the contract size.
   */
  trigger_fill_condition?: AdvTradeGlobalTriggerFillCondition;
  /**
   * The maximum deviation from the price peak beyond which the order will be triggered
   * (Only for trailing trigger orders)
   */
  trigger_offset?: number;
  /**
   * Id of the trigger order that created the order (Only for orders that were created
   * by triggered orders).
   */
  trigger_order_id?: string;
  /** Trigger price (Only for future trigger orders) */
  trigger_price?: number;
  /**
   * The price of the given trigger at the time when the order was placed (Only for
   * trailing trigger orders)
   */
  trigger_reference_price?: number;
  /** Whether the trigger order has been triggered */
  triggered?: boolean;
  /** Option price in USD (Only if advanced="usd") */
  usd?: number;
  /**
   * User identifier for the account that owns the order. For isolated orders, this is
   * the subaccount ID.
   */
  user_id?: number;
  /** true if created via Deribit frontend (optional) */
  web?: boolean;
}

export interface AdvTradeGlobalTradeAllocations {
  /** Amount allocated to this user. */
  amount: number;
  /** Optional client allocation info for brokers. */
  client_info?: AdvTradeGlobalClientInfo;
  /** Fee for the allocated part of the trade. */
  fee: number;
  /** User ID to which part of the trade is allocated. For brokers the User ID is obstructed. */
  user_id?: number;
}

export interface AdvTradeGlobalAdvTradeGlobalAdvTradeGlobalFeesEntryEntry {
  /** Block trade fee (if applicable) */
  block_trade?: number;
  default: AdvTradeGlobalDefault;
}

export interface AdvTradeGlobalSimulatePortfolioResult {
  /**
   * The account's balance reserved for open buy option orders and option combo orders
   * (the premium payable if they fill). Only non-zero on the cross_sm margin model;
   * balance reserved by spot orders is reported separately in spot_reserve.
   */
  additional_reserve?: number;
  /**
   * Funds available to increase margin usage (open or enlarge positions). Equal to
   * margin_balance - initial_margin, floored at 0 in the API response. When initial
   * margin usage exceeds 100%, this is 0 and only reducing orders can be placed. When
   * cross collateral is enabled, this aggregated value is calculated by converting the
   * sum of each cross collateral currency's value to the given currency, using each
   * cross collateral currency's index.
   */
  available_funds?: number;
  /** The account's available funds for subaccount transfers */
  available_subaccount_transfer_funds?: number;
  /**
   * Funds available to withdraw in the selected currency. Typically lower than
   * available_funds because withdrawals also exclude positive session profit, locked
   * balance, spot_reserve, additional_reserve, and non-withdrawable external/implied
   * equity components. Always ≥ 0.
   */
  available_withdrawal_funds?: number;
  /**
   * The account's cash balance in the selected currency (deposits, withdrawals,
   * transfers, option premiums, settlements/deliveries, corrections, costs, and
   * insurance refills). Does not include open futures PnL or options mark value.
   */
  balance?: number;
  /** When true cross collateral is enabled for user */
  cross_collateral_enabled?: boolean;
  /** Currency of the simulation */
  currency?: string;
  /**
   * The sum of position deltas. DeltaTotal = Net Transaction Delta of options + BTC
   * Position of Futures The DeltaTotal uses the Net Transaction Delta (or price
   * adjusted Delta) of the options, where Net Transaction Delta = Black Scholes Delta -
   * Mark Price of Options. This is because, from a risk perspective, we are interested
   * in the change in Bitcoin price as the underlying changes. You should actually treat
   * your delta as Equity + Delta Total if you want to have less risk for your USD PnL.
   * ⚠️ During the 30 minute settlement period we decay your Delta. See Delta decay
   * during settlement for more details.
   */
  delta_total?: number;
  /** Map of total deltas per index */
  delta_total_map?: AdvTradeGlobalDeltaTotalMap;
  /**
   * The account's equity in the selected currency: balance + futures (session UPL +
   * RPL) + options mark value (plus any external/implied equity). Related:
   * margin_balance excludes options mark value under standard margin.
   */
  equity?: number;
  /** The account's fee balance (it can be used to pay for fees) */
  fee_balance?: number;
  /** Futures profit and loss */
  futures_pl?: number;
  /** Futures session realized profit and loss */
  futures_session_rpl?: number;
  /** Futures session unrealized profit and loss */
  futures_session_upl?: number;
  /**
   * The account's initial margin. When cross collateral is enabled, this aggregated
   * value is calculated by converting the sum of each cross collateral currency's value
   * to the given currency, using each cross collateral currency's index.
   */
  initial_margin?: number;
  /** The account's locked balance */
  locked_balance?: number;
  /**
   * The maintenance margin. When cross collateral is enabled, this aggregated value is
   * calculated by converting the sum of each cross collateral currency's value to the
   * given currency, using each cross collateral currency's index.
   */
  maintenance_margin?: number;
  /**
   * Collateral available against margin requirements. Under standard margin (SM):
   * equity - options_value (cash balance plus futures session UPL and RPL). Under
   * portfolio margin (PM): equal to equity on a segregated account, and equity -
   * outstanding_loan_amount on a cross account. When cross collateral is enabled, this
   * aggregated value is calculated by converting the sum of each cross collateral
   * currency's value to the given currency, using each cross collateral currency's
   * index.
   */
  margin_balance?: number;
  /** Name of user's currently enabled margin model */
  margin_model?: string;
  /**
   * Sum of the deltas of all options positions. For inverse (coin-margined) options
   * this is the Black-Scholes delta; for linear options it is the index-price-adjusted
   * delta. Unlike account-level delta_total, the options mark value is not subtracted.
   */
  options_delta?: number;
  /** Sum of options position gammas (Black-Scholes). */
  options_gamma?: number;
  /** Map of options' gammas per index */
  options_gamma_map?: AdvTradeGlobalOptionsGammaMap;
  /** Options profit and loss */
  options_pl?: number;
  /** Options session realized profit and loss */
  options_session_rpl?: number;
  /** Options session unrealized profit and loss */
  options_session_upl?: number;
  /**
   * Sum of the thetas of all options positions. Theta is expressed per day; for options
   * with less than one day left to expiry it is scaled down to the fraction of a day
   * remaining.
   */
  options_theta?: number;
  /** Map of options' thetas per index */
  options_theta_map?: AdvTradeGlobalOptionsThetaMap;
  /**
   * Mark value of all open options positions in the selected currency. Under standard
   * margin, margin_balance = equity - options_value.
   */
  options_value?: number;
  /** Sum of options position vegas (Black-Scholes). */
  options_vega?: number;
  /** Map of options' vegas per index */
  options_vega_map?: AdvTradeGlobalOptionsVegaMap;
  /** true when portfolio margining is enabled for user */
  portfolio_margining_enabled?: boolean;
  /**
   * The sum of position deltas excluding positions that expire at the nearest
   * expiration, so it shows the delta that will remain once those positions have
   * expired. Calculated on the same Net Transaction Delta basis as delta_total,
   * including delta decay during the settlement period.
   */
  projected_delta_total?: number;
  /**
   * Initial margin calculated as if instruments expiring at the nearest expiration were
   * excluded, so it shows the requirement that will remain once those instruments have
   * expired. When cross collateral is enabled, this aggregated value is calculated by
   * converting the sum of each cross collateral currency's value to the given currency,
   * using each cross collateral currency's index.
   */
  projected_initial_margin?: number;
  /**
   * Maintenance margin calculated as if instruments expiring at the nearest expiration
   * were excluded, so it shows the requirement that will remain once those instruments
   * have expired. When cross collateral is enabled, this aggregated value is calculated
   * by converting the sum of each cross collateral currency's value to the given
   * currency, using each cross collateral currency's index.
   */
  projected_maintenance_margin?: number;
  /**
   * Realized profit and loss accrued in the current trading session (since the last
   * daily settlement). Resets at each daily settlement.
   */
  session_rpl?: number;
  /**
   * Unrealized profit and loss on open positions in the current trading session (since
   * the last daily settlement).
   */
  session_upl?: number;
  /** The account's balance reserved in active spot orders */
  spot_reserve?: number;
  /**
   * Optional (only for users using cross margin). The account's total delta total in
   * all cross collateral currencies, expressed in USD
   */
  total_delta_total_usd?: number;
  /**
   * Optional (only for users using cross margin). The account's total equity in all
   * cross collateral currencies, expressed in USD
   */
  total_equity_usd?: number;
  /**
   * Optional (only for users using cross margin). The account's total initial margin in
   * all cross collateral currencies, expressed in USD
   */
  total_initial_margin_usd?: number;
  /**
   * Optional (only for users using cross margin). The account's total maintenance
   * margin in all cross collateral currencies, expressed in USD
   */
  total_maintenance_margin_usd?: number;
  /**
   * Optional (only for users using cross margin). The account's total margin balance in
   * all cross collateral currencies, expressed in USD
   */
  total_margin_balance_usd?: number;
  /**
   * Total profit and loss of all open positions since each position was opened (not
   * limited to the current session). Differs from session_rpl + session_upl, which
   * reset at daily settlement.
   */
  total_pl?: number;
}

export interface AdvTradeGlobalSummaries {
  /**
   * The account's balance reserved for open buy option orders and option combo orders
   * (the premium payable if they fill). Only non-zero on the cross_sm margin model;
   * balance reserved by spot orders is reported separately in spot_reserve.
   */
  additional_reserve?: number;
  /** Affiliate promotion fee (if greater than 0.0) */
  affiliate_promotion_fee?: number;
  /**
   * Funds available to increase margin usage (open or enlarge positions). Equal to
   * margin_balance - initial_margin, floored at 0 in the API response. When initial
   * margin usage exceeds 100%, this is 0 and only reducing orders can be placed. When
   * cross collateral is enabled, this aggregated value is calculated by converting the
   * sum of each cross collateral currency's value to the given currency, using each
   * cross collateral currency's index.
   */
  available_funds: number;
  /**
   * Funds available to withdraw in the selected currency. Typically lower than
   * available_funds because withdrawals also exclude positive session profit, locked
   * balance, spot_reserve, additional_reserve, and non-withdrawable external/implied
   * equity components. Always ≥ 0.
   */
  available_withdrawal_funds: number;
  /**
   * The account's cash balance in the selected currency (deposits, withdrawals,
   * transfers, option premiums, settlements/deliveries, corrections, costs, and
   * insurance refills). Does not include open futures PnL or options mark value.
   */
  balance: number;
  /**
   * Close-out margin threshold in the selected currency, equal to 50% of the positional
   * maintenance margin. Because it sits below maintenance_margin, it marks a later and
   * more severe stage than ordinary liquidation: when margin_balance falls to or below
   * this level, close-out liquidation takes over. On a cross account with an
   * outstanding loan it is not exactly half of the reported maintenance_margin: the
   * loan's maintenance margin is included in maintenance_margin but excluded from the
   * close-out threshold. Returned only when close-out margin is enabled on the
   * platform.
   */
  close_out_margin?: number;
  /** When true cross collateral is enabled for user */
  cross_collateral_enabled?: boolean;
  /** Currency of the summary */
  currency: string;
  /**
   * The sum of position deltas. DeltaTotal = Net Transaction Delta of options + BTC
   * Position of Futures The DeltaTotal uses the Net Transaction Delta (or price
   * adjusted Delta) of the options, where Net Transaction Delta = Black Scholes Delta -
   * Mark Price of Options. This is because, from a risk perspective, we are interested
   * in the change in Bitcoin price as the underlying changes. You should actually treat
   * your delta as Equity + Delta Total if you want to have less risk for your USD PnL.
   * ⚠️ During the 30 minute settlement period we decay your Delta. See Delta decay
   * during settlement for more details.
   */
  delta_total: number;
  /**
   * Map of position delta sums by price index (e.g. btc_usd), covering both futures and
   * options positions. These are raw position deltas: they are not price-adjusted for
   * linear instruments and the options mark value is not subtracted. They therefore do
   * not add up to delta_total, which is calculated on the Net Transaction Delta basis
   * described under delta_total.
   */
  delta_total_map?: AdvTradeGlobalDeltaTotalMap;
  /** The deposit address for the account (if available) */
  deposit_address?: string;
  /**
   * The account's equity in the selected currency: balance + futures (session UPL +
   * RPL) + options mark value (plus any external/implied equity). Related:
   * margin_balance excludes options mark value under standard margin.
   */
  equity: number;
  /** The account's fee balance (it can be used to pay for fees) */
  fee_balance?: number;
  /**
   * Fee group indicates the level of fee discounts applied to an account. Use extended:
   * true to view this field. If the field is missing, the account is not assigned to
   * any fee group. 📖 Related Support Article: Automatically applied volume based fee
   * discounts
   */
  fee_group?: string;
  /**
   * Fee structure for all currency pairs and instrument types related to the currency
   * (available when parameter extended = true and user has any discounts). Keys are
   * index names (e.g., "btc_usd"), values are objects with instrument types as keys
   * (option, perpetual, future).
   */
  fees?: AdvTradeGlobalFees;
  /**
   * Combined profit and loss of all futures and perpetual positions included in
   * total_pl (total_pl - options_pl).
   */
  futures_pl: number;
  /**
   * Session realized profit and loss for futures and perpetual positions (resets at
   * daily settlement).
   */
  futures_session_rpl: number;
  /** Session unrealized profit and loss for open futures and perpetual positions. */
  futures_session_upl: number;
  /**
   * Optional field returned with value true when user has non block chain equity that
   * is excluded from proof of reserve calculations
   */
  has_non_block_chain_equity?: boolean;
  /**
   * Minimum margin required to open or increase positions (includes margin for open
   * orders). If initial margin usage exceeds 100%, available_funds is 0. When cross
   * collateral is enabled, this aggregated value is calculated by converting the sum of
   * each cross collateral currency's value to the given currency, using each cross
   * collateral currency's index.
   */
  initial_margin: number;
  /** Returned object is described in separate document. */
  limits?: AdvTradeGlobalApiLimits;
  /**
   * Portion of the account balance that is locked and excluded from available
   * withdrawal calculations.
   */
  locked_balance?: number;
  /**
   * Minimum margin required to keep positions open. If margin_balance falls below
   * maintenance margin, positions are liquidated. When cross collateral is enabled,
   * this aggregated value is calculated by converting the sum of each cross collateral
   * currency's value to the given currency, using each cross collateral currency's
   * index.
   */
  maintenance_margin: number;
  /**
   * Collateral available against margin requirements. Under standard margin (SM):
   * equity - options_value (cash balance plus futures session UPL and RPL). Under
   * portfolio margin (PM): equal to equity on a segregated account, and equity -
   * outstanding_loan_amount on a cross account. When cross collateral is enabled, this
   * aggregated value is calculated by converting the sum of each cross collateral
   * currency's value to the given currency, using each cross collateral currency's
   * index.
   */
  margin_balance?: number;
  /** Name of user's currently enabled margin model */
  margin_model?: string;
  /**
   * Sum of the deltas of all options positions. For inverse (coin-margined) options
   * this is the Black-Scholes delta; for linear options it is the index-price-adjusted
   * delta. Unlike account-level delta_total, the options mark value is not subtracted.
   */
  options_delta: number;
  /** Sum of options position gammas (Black-Scholes). */
  options_gamma: number;
  /** Map of options' gammas per index */
  options_gamma_map: AdvTradeGlobalOptionsGammaMap;
  /** Combined profit and loss of all options positions included in total_pl. */
  options_pl: number;
  /** Session realized profit and loss for options positions (resets at daily settlement). */
  options_session_rpl: number;
  /** Session unrealized profit and loss for open options positions. */
  options_session_upl: number;
  /**
   * Sum of the thetas of all options positions. Theta is expressed per day; for options
   * with less than one day left to expiry it is scaled down to the fraction of a day
   * remaining.
   */
  options_theta: number;
  /** Map of options' thetas per index */
  options_theta_map: AdvTradeGlobalOptionsThetaMap;
  /**
   * Mark value of all open options positions in the selected currency. Under standard
   * margin, margin_balance = equity - options_value.
   */
  options_value: number;
  /** Sum of options position vegas (Black-Scholes). */
  options_vega: number;
  /** Map of options' vegas per index */
  options_vega_map: AdvTradeGlobalOptionsVegaMap;
  /** true when portfolio margining is enabled for user */
  portfolio_margining_enabled?: boolean;
  /**
   * Close-out margin calculated as if instruments expiring at the nearest expiration
   * were excluded, i.e. 50% of the projected positional maintenance margin. As with
   * close_out_margin, the loan maintenance margin counted in
   * projected_maintenance_margin is excluded here, so on a cross account with an
   * outstanding loan the two are not exactly proportional. Returned only when close-out
   * margin is enabled on the platform.
   */
  projected_close_out_margin?: number;
  /**
   * The sum of position deltas excluding positions that expire at the nearest
   * expiration, so it shows the delta that will remain once those positions have
   * expired. Calculated on the same Net Transaction Delta basis as delta_total,
   * including delta decay during the settlement period.
   */
  projected_delta_total: number;
  /**
   * Initial margin calculated as if instruments expiring at the nearest expiration were
   * excluded, so it shows the requirement that will remain once those instruments have
   * expired. When cross collateral is enabled, this aggregated value is calculated by
   * converting the sum of each cross collateral currency's value to the given currency,
   * using each cross collateral currency's index.
   */
  projected_initial_margin?: number;
  /**
   * Maintenance margin calculated as if instruments expiring at the nearest expiration
   * were excluded, so it shows the requirement that will remain once those instruments
   * have expired. When cross collateral is enabled, this aggregated value is calculated
   * by converting the sum of each cross collateral currency's value to the given
   * currency, using each cross collateral currency's index.
   */
  projected_maintenance_margin: number;
  /** Whether the account receives notifications */
  receive_notifications?: boolean;
  /**
   * Realized profit and loss accrued in the current trading session (since the last
   * daily settlement). Resets at each daily settlement.
   */
  session_rpl: number;
  /**
   * Unrealized profit and loss on open positions in the current trading session (since
   * the last daily settlement).
   */
  session_upl: number;
  /** The account's balance reserved in active spot orders */
  spot_reserve?: number;
  /**
   * Optional (only for users using cross margin). The account's total delta total in
   * all cross collateral currencies, expressed in USD
   */
  total_delta_total_usd?: number;
  /**
   * Optional (only for users using cross margin). The account's total equity in all
   * cross collateral currencies, expressed in USD
   */
  total_equity_usd?: number;
  /**
   * Optional (only for users using cross margin). The account's total initial margin in
   * all cross collateral currencies, expressed in USD
   */
  total_initial_margin_usd?: number;
  /**
   * Optional (only for users using cross margin). The account's total maintenance
   * margin in all cross collateral currencies, expressed in USD
   */
  total_maintenance_margin_usd?: number;
  /**
   * Optional (only for users using cross margin). The account's total margin balance in
   * all cross collateral currencies, expressed in USD
   */
  total_margin_balance_usd?: number;
  /**
   * Total profit and loss of all open positions since each position was opened (not
   * limited to the current session). Differs from session_rpl + session_upl, which
   * reset at daily settlement.
   */
  total_pl: number;
  /** Which trading products are enabled or can be overwritten for the account */
  trading_products_details?: AdvTradeGlobalTradingProductsDetails;
}

export interface AdvTradeGlobalGetAccountSummaryResult {
  /**
   * The account's balance reserved for open buy option orders and option combo orders
   * (the premium payable if they fill). Only non-zero on the cross_sm margin model;
   * balance reserved by spot orders is reported separately in spot_reserve.
   */
  additional_reserve?: number;
  /** Affiliate promotion fee (if greater than 0.0) */
  affiliate_promotion_fee?: number;
  /**
   * Funds available to increase margin usage (open or enlarge positions). Equal to
   * margin_balance - initial_margin, floored at 0 in the API response. When initial
   * margin usage exceeds 100%, this is 0 and only reducing orders can be placed. When
   * cross collateral is enabled, this aggregated value is calculated by converting the
   * sum of each cross collateral currency's value to the given currency, using each
   * cross collateral currency's index.
   */
  available_funds: number;
  /**
   * Funds available to withdraw in the selected currency. Typically lower than
   * available_funds because withdrawals also exclude positive session profit, locked
   * balance, spot_reserve, additional_reserve, and non-withdrawable external/implied
   * equity components. Always ≥ 0.
   */
  available_withdrawal_funds: number;
  /**
   * The account's cash balance in the selected currency (deposits, withdrawals,
   * transfers, option premiums, settlements/deliveries, corrections, costs, and
   * insurance refills). Does not include open futures PnL or options mark value.
   */
  balance: number;
  /**
   * When enabled, Block RFQ self-match prevention stops RFQ execution between accounts
   * under the same legal entity. Independent of general self-match prevention
   * (available when parameter extended = true).
   */
  block_rfq_self_match_prevention?: boolean;
  /**
   * Close-out margin threshold in the selected currency, equal to 50% of the positional
   * maintenance margin. Because it sits below maintenance_margin, it marks a later and
   * more severe stage than ordinary liquidation: when margin_balance falls to or below
   * this level, close-out liquidation takes over. On a cross account with an
   * outstanding loan it is not exactly half of the reported maintenance_margin: the
   * loan's maintenance margin is included in maintenance_margin but excluded from the
   * close-out threshold. Returned only when close-out margin is enabled on the
   * platform.
   */
  close_out_margin?: number;
  /**
   * Time at which the account was created (milliseconds since the Unix epoch; available
   * when parameter extended = true)
   */
  creation_timestamp?: number;
  /** When true cross collateral is enabled for user */
  cross_collateral_enabled?: boolean;
  /** The selected currency */
  currency: string;
  /**
   * The sum of position deltas. DeltaTotal = Net Transaction Delta of options + BTC
   * Position of Futures The DeltaTotal uses the Net Transaction Delta (or price
   * adjusted Delta) of the options, where Net Transaction Delta = Black Scholes Delta -
   * Mark Price of Options. This is because, from a risk perspective, we are interested
   * in the change in Bitcoin price as the underlying changes. You should actually treat
   * your delta as Equity + Delta Total if you want to have less risk for your USD PnL.
   * ⚠️ During the 30 minute settlement period we decay your Delta. See Delta decay
   * during settlement for more details.
   */
  delta_total: number;
  /**
   * Map of position delta sums by price index (e.g. btc_usd), covering both futures and
   * options positions. These are raw position deltas: they are not price-adjusted for
   * linear instruments and the options mark value is not subtracted. They therefore do
   * not add up to delta_total, which is calculated on the Net Transaction Delta basis
   * described under delta_total.
   */
  delta_total_map?: AdvTradeGlobalDeltaTotalMap;
  /** The deposit address for the account (if available) */
  deposit_address?: string;
  /** User email (available when parameter extended = true) */
  email: string;
  /**
   * The account's equity in the selected currency: balance + futures (session UPL +
   * RPL) + options mark value (plus any external/implied equity). Related:
   * margin_balance excludes options mark value under standard margin.
   */
  equity: number;
  /** The account's fee balance (it can be used to pay for fees) */
  fee_balance?: number;
  /**
   * Fee group indicates the level of fee discounts applied to an account. Use extended:
   * true to view this field. If the field is missing, the account is not assigned to
   * any fee group. 📖 Related Support Article: Automatically applied volume based fee
   * discounts
   */
  fee_group?: string;
  /**
   * Fee structure for all currency pairs and instrument types related to the currency
   * (available when parameter extended = true and user has any discounts). Keys are
   * index names (e.g., "btc_usd"), values are objects with instrument types as keys
   * (option, perpetual, future).
   */
  fees?: AdvTradeGlobalFees;
  /**
   * Combined profit and loss of all futures and perpetual positions included in
   * total_pl (total_pl - options_pl).
   */
  futures_pl: number;
  /**
   * Session realized profit and loss for futures and perpetual positions (resets at
   * daily settlement).
   */
  futures_session_rpl: number;
  /** Session unrealized profit and loss for open futures and perpetual positions. */
  futures_session_upl: number;
  /**
   * Optional field returned with value true when user has non block chain equity that
   * is excluded from proof of reserve calculations
   */
  has_non_block_chain_equity?: boolean;
  /** Account id (available when parameter extended = true) */
  id: number;
  /**
   * Minimum margin required to open or increase positions (includes margin for open
   * orders). If initial margin usage exceeds 100%, available_funds is 0. When cross
   * collateral is enabled, this aggregated value is calculated by converting the sum of
   * each cross collateral currency's value to the given currency, using each cross
   * collateral currency's index.
   */
  initial_margin: number;
  /**
   * true when the inter-user transfers are enabled for user (available when parameter
   * extended = true)
   */
  interuser_transfers_enabled?: boolean;
  /** Whether Direct Access trading is enabled for the account. */
  is_direct_access_allowed?: boolean;
  /** Returned object is described in separate document. */
  limits?: AdvTradeGlobalApiLimits;
  /**
   * Portion of the account balance that is locked and excluded from available
   * withdrawal calculations.
   */
  locked_balance?: number;
  /**
   * Whether account is loginable using email and password (available when parameter
   * extended = true and account is a subaccount)
   */
  login_enabled?: boolean;
  /**
   * Minimum margin required to keep positions open. If margin_balance falls below
   * maintenance margin, positions are liquidated. When cross collateral is enabled,
   * this aggregated value is calculated by converting the sum of each cross collateral
   * currency's value to the given currency, using each cross collateral currency's
   * index.
   */
  maintenance_margin: number;
  /**
   * Collateral available against margin requirements. Under standard margin (SM):
   * equity - options_value (cash balance plus futures session UPL and RPL). Under
   * portfolio margin (PM): equal to equity on a segregated account, and equity -
   * outstanding_loan_amount on a cross account. When cross collateral is enabled, this
   * aggregated value is calculated by converting the sum of each cross collateral
   * currency's value to the given currency, using each cross collateral currency's
   * index.
   */
  margin_balance?: number;
  /** Name of user's currently enabled margin model */
  margin_model?: string;
  /** Whether MMP is enabled (available when parameter extended = true) */
  mmp_enabled?: boolean;
  /**
   * Sum of the deltas of all options positions. For inverse (coin-margined) options
   * this is the Black-Scholes delta; for linear options it is the index-price-adjusted
   * delta. Unlike account-level delta_total, the options mark value is not subtracted.
   */
  options_delta: number;
  /** Sum of options position gammas (Black-Scholes). */
  options_gamma: number;
  /** Map of options' gammas per index */
  options_gamma_map: AdvTradeGlobalOptionsGammaMap;
  /** Combined profit and loss of all options positions included in total_pl. */
  options_pl: number;
  /** Session realized profit and loss for options positions (resets at daily settlement). */
  options_session_rpl: number;
  /** Session unrealized profit and loss for open options positions. */
  options_session_upl: number;
  /**
   * Sum of the thetas of all options positions. Theta is expressed per day; for options
   * with less than one day left to expiry it is scaled down to the fraction of a day
   * remaining.
   */
  options_theta: number;
  /** Map of options' thetas per index */
  options_theta_map: AdvTradeGlobalOptionsThetaMap;
  /**
   * Mark value of all open options positions in the selected currency. Under standard
   * margin, margin_balance = equity - options_value.
   */
  options_value: number;
  /** Sum of options position vegas (Black-Scholes). */
  options_vega: number;
  /** Map of options' vegas per index */
  options_vega_map: AdvTradeGlobalOptionsVegaMap;
  /** true when portfolio margining is enabled for user */
  portfolio_margining_enabled?: boolean;
  /**
   * Close-out margin calculated as if instruments expiring at the nearest expiration
   * were excluded, i.e. 50% of the projected positional maintenance margin. As with
   * close_out_margin, the loan maintenance margin counted in
   * projected_maintenance_margin is excluded here, so on a cross account with an
   * outstanding loan the two are not exactly proportional. Returned only when close-out
   * margin is enabled on the platform.
   */
  projected_close_out_margin?: number;
  /**
   * The sum of position deltas excluding positions that expire at the nearest
   * expiration, so it shows the delta that will remain once those positions have
   * expired. Calculated on the same Net Transaction Delta basis as delta_total,
   * including delta decay during the settlement period.
   */
  projected_delta_total: number;
  /**
   * Initial margin calculated as if instruments expiring at the nearest expiration were
   * excluded, so it shows the requirement that will remain once those instruments have
   * expired. When cross collateral is enabled, this aggregated value is calculated by
   * converting the sum of each cross collateral currency's value to the given currency,
   * using each cross collateral currency's index.
   */
  projected_initial_margin?: number;
  /**
   * Maintenance margin calculated as if instruments expiring at the nearest expiration
   * were excluded, so it shows the requirement that will remain once those instruments
   * have expired. When cross collateral is enabled, this aggregated value is calculated
   * by converting the sum of each cross collateral currency's value to the given
   * currency, using each cross collateral currency's index.
   */
  projected_maintenance_margin: number;
  /** Whether the account receives notifications */
  receive_notifications?: boolean;
  /**
   * Optional identifier of the referrer (of the affiliation program, and available when
   * parameter extended = true), which link was used by this account at registration. It
   * coincides with suffix of the affiliation link path after /reg-
   */
  referrer_id?: string;
  /** Whether Security Key authentication is enabled (available when parameter extended = true) */
  security_keys_enabled: boolean;
  /**
   * true if self trading rejection behavior is applied to trades between subaccounts
   * (available when parameter extended = true)
   */
  self_trading_extended_to_subaccounts?: string;
  /**
   * Self trading rejection behavior - reject_taker or cancel_maker (available when
   * parameter extended = true)
   */
  self_trading_reject_mode?: string;
  /**
   * Realized profit and loss accrued in the current trading session (since the last
   * daily settlement). Resets at each daily settlement.
   */
  session_rpl: number;
  /**
   * Unrealized profit and loss on open positions in the current trading session (since
   * the last daily settlement).
   */
  session_upl: number;
  /** The account's balance reserved in active spot orders */
  spot_reserve?: number;
  /** System generated user nickname (available when parameter extended = true) */
  system_name: string;
  /**
   * Optional (only for users using cross margin). The account's total delta total in
   * all cross collateral currencies, expressed in USD
   */
  total_delta_total_usd?: number;
  /**
   * Optional (only for users using cross margin). The account's total equity in all
   * cross collateral currencies, expressed in USD
   */
  total_equity_usd?: number;
  /**
   * Optional (only for users using cross margin). The account's total initial margin in
   * all cross collateral currencies, expressed in USD
   */
  total_initial_margin_usd?: number;
  /**
   * Optional (only for users using cross margin). The account's total maintenance
   * margin in all cross collateral currencies, expressed in USD
   */
  total_maintenance_margin_usd?: number;
  /**
   * Optional (only for users using cross margin). The account's total margin balance in
   * all cross collateral currencies, expressed in USD
   */
  total_margin_balance_usd?: number;
  /**
   * Total profit and loss of all open positions since each position was opened (not
   * limited to the current session). Differs from session_rpl + session_upl, which
   * reset at daily settlement.
   */
  total_pl: number;
  /** Which trading products are enabled or can be overwritten for the account */
  trading_products_details?: AdvTradeGlobalTradingProductsDetails;
  /** Account type (available when parameter extended = true) */
  type: 'main' | 'subaccount';
  /** Account name (given by user) (available when parameter extended = true) */
  username: string;
}

export interface AdvTradeGlobalPosition {
  /** Average price of trades that built this position */
  average_price: number;
  /** Only for options, average price in USD */
  average_price_usd?: number;
  /** Delta parameter */
  delta: number;
  /** Direction: buy, sell or zero */
  direction: AdvTradeGlobalPositionDirection;
  /** Floating profit or loss */
  floating_profit_loss: number;
  /** Only for options, floating profit or loss in USD */
  floating_profit_loss_usd?: number;
  /** Only for options, Gamma parameter */
  gamma?: number;
  /** Current index price */
  index_price: number;
  /** Initial margin */
  initial_margin: number;
  /** Unique instrument identifier */
  instrument_name: string;
  /** Value used to calculate realized_funding (perpetual only) */
  interest_value?: number;
  /**
   * Flag indicating whether the position is held by an isolated margin subaccount.
   * Present and true on isolated positions only.
   */
  isolated?: boolean;
  /** Instrument kind: "future", "option", "spot", "future_combo", "option_combo" */
  kind: AdvTradeGlobalKind;
  /** Current available leverage for future position */
  leverage?: number;
  /** User identifier for the owning main account. Present on isolated positions only. */
  main_uid?: number;
  /** Maintenance margin */
  maintenance_margin: number;
  /** Current mark price for position's instrument */
  mark_price: number;
  /**
   * Realized Funding in current session included in session realized profit or loss,
   * only for positions of perpetual instruments
   */
  realized_funding?: number;
  /** Realized profit or loss */
  realized_profit_loss: number;
  /**
   * Optional (not added for spot). Last settlement price for position's instrument 0 if
   * instrument wasn't settled yet
   */
  settlement_price: number;
  /**
   * Position size for futures size in quote currency (e.g. USD), for options size is in
   * base currency (e.g. BTC)
   */
  size: number;
  /** Only for futures, position size in base currency */
  size_currency?: number;
  /** Only for options, Theta parameter */
  theta?: number;
  /** Profit or loss from position */
  total_profit_loss: number;
  /** Unique user identifier */
  user_id: number;
  /** Only for options, Vega parameter */
  vega?: number;
}

export interface AdvTradeGlobalChangeMarginModelItem {
  /** Currency, i.e "BTC", "ETH", "USDC" */
  currency: string;
  /** Represents portfolio state after change */
  new_state: AdvTradeGlobalNewState;
  /** Represents portfolio state before change */
  old_state: AdvTradeGlobalOldState;
}

export interface AdvTradeGlobalTransactionLog {
  /**
   * It represents the requested order size. For perpetual and inverse futures the
   * amount is in USD units. For options and linear futures it is the underlying base
   * currency coin.
   */
  amount?: number;
  /** Cash balance after the transaction */
  balance: number;
  /** ID of the Block RFQ - when trade was part of the Block RFQ */
  block_rfq_id?: number;
  /**
   * For futures and perpetual contracts: Realized session PNL (since last settlement).
   * For options: the amount paid or received for the options traded.
   */
  cashflow: number;
  /**
   * Change in cash balance. For trades: fees and options premium paid/received. For
   * settlement: Futures session PNL and perpetual session funding.
   */
  change: number;
  /** Commission paid so far (in base currency) */
  commission: number;
  /**
   * It represents the order size in contract units. (Optional, may be absent in
   * historical data).
   */
  contracts?: number;
  /** Currency, i.e "BTC", "ETH", "USDC" */
  currency: string;
  /** Updated equity value after the transaction */
  equity?: number;
  /**
   * Fee role of the user: maker or taker. Can be different from trade role of the user
   * when iceberg order was involved in matching.
   */
  fee_role?: AdvTradeGlobalFeeRole;
  /** Unique identifier */
  id: number;
  /** The index price for the instrument during the delivery */
  index_price?: number;
  /** Additional information regarding transaction. Strongly dependent on the log entry type */
  info?: AdvTradeGlobalInfo;
  /** Unique instrument identifier */
  instrument_name?: string;
  /**
   * Funding PnL amount for the interval between this log entry and the previous trade
   * or position change on perpetual instruments
   */
  interest_pl?: number;
  /** The IP address from which the trade was initiated */
  ip?: string;
  /** Market price during the trade */
  mark_price?: number;
  /** Unique order identifier */
  order_id?: string;
  /** Updated position size after the transaction */
  position?: number;
  /** Settlement/delivery price or the price level of the traded contracts */
  price?: number;
  /** Currency symbol associated with the price field value */
  price_currency?: string;
  /** Indicator informing whether the cashflow is waiting for settlement or not */
  profit_as_cashflow?: boolean;
  /**
   * For LSP transfer, ADL transfer and liquidation transfer entries, indicates which
   * side of the position move this entry represents: source (the liquidated account) or
   * destination (the account receiving the position, e.g. an LSP participant)
   */
  role?: 'source' | 'destination';
  /**
   * Realized profit and loss accrued in the current trading session (since the last
   * daily settlement). Resets at each daily settlement.
   */
  session_rpl?: number;
  /**
   * Unrealized profit and loss on open positions in the current trading session (since
   * the last daily settlement).
   */
  session_upl?: number;
  /** The settlement price for the instrument during the delivery */
  settlement_price?: number;
  /**
   * One of: short or long in case of settlements, close sell or close buy in case of
   * deliveries, open sell, open buy, close sell, close buy in case of trades
   */
  side?: string;
  /** Starbase match id for trade entries executed in Starbase */
  starbase_match_id?: number;
  /** Raw Starbase order id for trade entries associated with orders placed in Starbase */
  starbase_order_id?: number;
  /** Starbase causal timestamp for trade entries executed in Starbase */
  starbase_timestamp?: number;
  /** The timestamp (milliseconds since the Unix epoch) */
  timestamp: number;
  /**
   * Total funding PnL accrued in the current trading session since the last daily
   * settlement at 08:00 UTC, in the settlement currency. Resets at each daily
   * settlement.
   */
  total_interest_pl?: number;
  /** Unique (per currency) trade identifier */
  trade_id?: string;
  /**
   * Transaction category/type. The most common are: trade, deposit, withdrawal,
   * settlement, delivery, transfer, swap, correction, expiry, LSP transfer, LSP
   * commission, ADL transfer, ADL commission. New types can be added any time in the
   * future
   */
  type: string;
  /** Unique user identifier */
  user_id: number;
  /** Trade role of the user: maker or taker */
  user_role?: AdvTradeGlobalRole;
  /** Sequential identifier of user transaction */
  user_seq: number;
  /** System name or user defined subaccount alias */
  username?: string;
}

export interface AdvTradeGlobalGetCancelOnDisconnectResult {
  /** Current configuration status */
  enabled?: boolean;
  /** Informs if Cancel on Disconnect was checked for the current connection or the account */
  scope?: AdvTradeGlobalCodScope;
}

export interface AdvTradeGlobalGetLegPricesResult {
  /** This value multiplied by the ratio of a leg gives trade size on that leg. */
  amount?: number;
  legs?: AdvTradeGlobalLegStructureItem[];
}

export interface AdvTradeGlobalGetLastSettlementsByCurrencyResult {
  /** Continuation token for pagination. */
  continuation: string;
  settlements: AdvTradeGlobalSettlement[];
}

export interface AdvTradeGlobalGetLastSettlementsByInstrumentResult {
  /** Continuation token for pagination. */
  continuation: string;
  settlements: AdvTradeGlobalSettlement[];
}

export interface AdvTradeGlobalGetSettlementHistoryByCurrencyResult {
  /** Continuation token for pagination. */
  continuation: string;
  settlements: AdvTradeGlobalSettlement[];
}

export interface AdvTradeGlobalGetSettlementHistoryByInstrumentResult {
  /** Continuation token for pagination. */
  continuation: string;
  settlements: AdvTradeGlobalSettlement[];
}

export interface AdvTradeGlobalGetLastTradesByCurrencyResult {
  has_more: boolean;
  trades: AdvTradeGlobalPublicTrade[];
}

export interface AdvTradeGlobalGetLastTradesByCurrencyAndTimeResult {
  has_more: boolean;
  trades: AdvTradeGlobalPublicTrade[];
}

export interface AdvTradeGlobalGetLastTradesByInstrumentResult {
  has_more: boolean;
  trades: AdvTradeGlobalPublicTrade[];
}

export interface AdvTradeGlobalGetLastTradesByInstrumentAndTimeResult {
  has_more: boolean;
  trades: AdvTradeGlobalPublicTrade[];
}

export interface AdvTradeGlobalGetTriggerOrderHistoryResult {
  /** Continuation token for pagination. */
  continuation?: string;
  entries?: AdvTradeGlobalTriggerOrderHistoryRecord[];
}

export interface AdvTradeGlobalUserTrade {
  /**
   * Advanced type of user order: "usd" or "implv" (only for options; omitted if not
   * applicable)
   */
  advanced?: 'usd' | 'implv';
  /**
   * Trade amount. For perpetual and inverse futures the amount is in USD units. For
   * options and linear futures it is the underlying base currency coin.
   */
  amount: number;
  /** true if user order was created with API */
  api?: boolean;
  /** ID of the Block RFQ - when trade was part of the Block RFQ */
  block_rfq_id?: number;
  /** ID of the Block RFQ quote - when trade was part of the Block RFQ */
  block_rfq_quote_id?: number;
  /** Block trade id - when trade was part of a block trade */
  block_trade_id?: string;
  /** Block trade leg count - when trade was part of a block trade */
  block_trade_leg_count?: number;
  /** Optional field containing combo instrument name if the trade is a combo trade */
  combo_id?: string;
  /** Optional field containing combo trade identifier if the trade is a combo trade */
  combo_trade_id?: string;
  /** Trade size in contract units (optional, may be absent in historical trades) */
  contracts?: number;
  /** Trade direction of the taker */
  direction: AdvTradeGlobalDirection;
  /** User's fee in units of the specified fee_currency */
  fee: number;
  /** Currency, i.e "BTC", "ETH", "USDC" */
  fee_currency: string;
  /** Index Price at the moment of trade */
  index_price: number;
  /** Unique instrument identifier */
  instrument_name: string;
  /**
   * Flag indicating whether the trade belongs to an isolated margin subaccount. Present
   * and true on isolated trades only.
   */
  isolated?: boolean;
  /** Option implied volatility for the price (Option only) */
  iv?: number;
  /** User defined label (presented only when previously set for order by user) */
  label?: string;
  /**
   * Optional field containing leg trades if trade is a combo trade (present when
   * querying for only combo trades and in combo_trades events). Each leg trade has the
   * same fields as a top-level user trade, including starbase_match_id,
   * starbase_order_id, and starbase_timestamp when matched in Starbase, and
   * starbase_client_order_id for orders submitted via Starbase direct access.
   */
  legs?: any[];
  /**
   * Optional field (only for trades caused by liquidation): "M" when maker side of
   * trade was under liquidation, "T" when taker side was under liquidation, "MT" when
   * both sides of trade were under liquidation
   */
  liquidation?: 'M' | 'T' | 'MT';
  /**
   * Describes what was role of users order: "M" when it was maker order, "T" when it
   * was taker order
   */
  liquidity?: 'M' | 'T';
  /** User identifier for the owning main account. Present on isolated trades only. */
  main_uid?: number;
  /** Mark Price at the moment of trade */
  mark_price: number;
  /** Always null */
  matching_id: string;
  /** true if user order is MMP */
  mmp?: boolean;
  /**
   * Id of the user order (maker or taker), i.e. subscriber's order id that took part in
   * the trade
   */
  order_id: string;
  /** Order type: "limit", "market", or "liquidation" */
  order_type?: 'limit' | 'market' | 'liquidation';
  /**
   * Original API order type when an order is represented internally as a limit order.
   * For example, Starbase market orders use "limit" as order_type with "market" in this
   * optional field.
   */
  original_order_type?: AdvTradeGlobalOriginalOrderType;
  /** true if user order is post-only */
  post_only?: string;
  /** The price of the trade */
  price: number;
  /** Profit and loss in base currency. */
  profit_loss?: number;
  /**
   * QuoteID of the user order (optional, present only for orders placed with
   * private/mass_quote)
   */
  quote_id?: string;
  /**
   * QuoteSet of the user order (optional, present only for orders placed with
   * private/mass_quote)
   */
  quote_set_id?: string;
  /** true if user order is reduce-only */
  reduce_only?: string;
  /**
   * true if user order is marked by the platform as a risk reducing order (can apply
   * only to orders placed by PM users)
   */
  risk_reducing?: boolean;
  /**
   * Client order id of the user's own order (maker or taker side) submitted directly to
   * Starbase via direct access; not returned for orders placed through the Deribit API;
   * for self-trades this is the taker order's client order id
   */
  starbase_client_order_id?: string;
  /**
   * Optional field containing the Starbase match identifier (present only for trades
   * matched via Starbase)
   */
  starbase_match_id?: number;
  /**
   * Raw Starbase order id of the user's order, in Starbase's own (non
   * currency-prefixed) id namespace (present only for trades matched in Starbase)
   */
  starbase_order_id?: number;
  /**
   * Optional field: the Starbase causal timestamp of the trade, in nanoseconds since
   * the UNIX epoch (present only for trades matched in Starbase)
   */
  starbase_timestamp?: number;
  /**
   * Order state: "open", "filled", "rejected", "cancelled", "untriggered" or "archive"
   * (if order was archived)
   */
  state: AdvTradeGlobalOrderStateInUserTrade;
  /**
   * Direction of the "tick" (0 = Plus Tick, 1 = Zero-Plus Tick, 2 = Minus Tick, 3 =
   * Zero-Minus Tick).
   */
  tick_direction: number;
  /** The timestamp of the trade (milliseconds since the UNIX epoch) */
  timestamp: number;
  /**
   * List of allocations for Block RFQ pre-allocation. Each allocation specifies
   * user_id, amount, and fee for the allocated part of the trade. For broker client
   * allocations, a client_info object will be included.
   */
  trade_allocations?: AdvTradeGlobalTradeAllocations[];
  /** Unique (per currency) trade identifier */
  trade_id: string;
  /** The sequence number of the trade within instrument */
  trade_seq: number;
  /** Underlying price for implied volatility calculations (Options only) */
  underlying_price?: number;
  /**
   * User identifier for the account that executed the trade. For isolated trades, this
   * is the subaccount ID.
   */
  user_id?: number;
}

export interface AdvTradeGlobalGetAccountSummariesResult {
  /** Affiliate promotion fee (if greater than 0.0) */
  affiliate_promotion_fee?: number;
  /**
   * When enabled, Block RFQ self-match prevention stops RFQ execution between accounts
   * under the same legal entity. Independent of general self-match prevention
   * (available when parameter extended = true).
   */
  block_rfq_self_match_prevention?: boolean;
  /**
   * Time at which the account was created (milliseconds since the Unix epoch; available
   * when parameter extended = true)
   */
  creation_timestamp?: number;
  /** User email (available when parameter extended = true) */
  email: string;
  /** Account id (available when parameter extended = true) */
  id: number;
  /**
   * true when the inter-user transfers are enabled for user (available when parameter
   * extended = true)
   */
  interuser_transfers_enabled?: boolean;
  /**
   * List of account summaries for active isolated-margin subaccounts, present only when
   * include_isolated=true. Each entry includes the subaccount ID (id) and a nested
   * summaries array containing per-currency account balances and risk metrics.
   */
  isolated_account_summaries?: AdvTradeGlobalIsolatedAccountSummaries[];
  /**
   * Whether account is loginable using email and password (available when parameter
   * extended = true and account is a subaccount)
   */
  login_enabled?: boolean;
  /** Whether MMP is enabled (available when parameter extended = true) */
  mmp_enabled?: boolean;
  /** Whether the account receives notifications */
  receive_notifications?: boolean;
  /**
   * Optional identifier of the referrer (of the affiliation program, and available when
   * parameter extended = true), which link was used by this account at registration. It
   * coincides with suffix of the affiliation link path after /reg-
   */
  referrer_id?: string;
  /** Whether Security Key authentication is enabled (available when parameter extended = true) */
  security_keys_enabled: boolean;
  /**
   * true if self trading rejection behavior is applied to trades between subaccounts
   * (available when parameter extended = true)
   */
  self_trading_extended_to_subaccounts?: string;
  /**
   * Self trading rejection behavior - reject_taker or cancel_maker (available when
   * parameter extended = true)
   */
  self_trading_reject_mode?: string;
  /** Aggregated list of per-currency account summaries */
  summaries?: AdvTradeGlobalSummaries[];
  /** System generated user nickname (available when parameter extended = true) */
  system_name: string;
  /** Which trading products are enabled or can be overwritten for the account */
  trading_products_details?: AdvTradeGlobalTradingProductsDetails;
  /** Account type (available when parameter extended = true) */
  type: 'main' | 'subaccount';
  /** Account name (given by user) (available when parameter extended = true) */
  username: string;
}

export interface AdvTradeGlobalPositionWithOpenOrdersMargin
  extends AdvTradeGlobalPosition {
  /**
   * [DEPRECATED] Estimated liquidation price, present only for futures positions and
   * always null - the value is no longer computed. The Estimated Liquidation Price
   * (ELP) remains available via the Position Builder API.
   */
  estimated_liquidation_price?: number | null;
  /** Open orders margin, present only for future positions */
  open_orders_margin?: number;
}

export interface AdvTradeGlobalGetTransactionLogResult {
  /** Continuation token for pagination. NULL when no continuation. */
  continuation: number;
  logs: AdvTradeGlobalTransactionLog[];
}

export interface AdvTradeGlobalBuyResult {
  order: AdvTradeGlobalOrder;
  trades: AdvTradeGlobalUserTrade[];
}

export interface AdvTradeGlobalSellResult {
  order: AdvTradeGlobalOrder;
  trades: AdvTradeGlobalUserTrade[];
}

export interface AdvTradeGlobalEditResult {
  order: AdvTradeGlobalOrder;
  trades: AdvTradeGlobalUserTrade[];
}

export interface AdvTradeGlobalEditByLabelResult {
  order: AdvTradeGlobalOrder;
  trades: AdvTradeGlobalUserTrade[];
}

export interface AdvTradeGlobalClosePositionResult {
  order: AdvTradeGlobalOrder;
  trades: AdvTradeGlobalUserTrade[];
}

export interface AdvTradeGlobalGetUserTradesByCurrencyResult {
  has_more: boolean;
  trades: AdvTradeGlobalUserTrade[];
}

export interface AdvTradeGlobalGetUserTradesByCurrencyAndTimeResult {
  has_more: boolean;
  trades: AdvTradeGlobalUserTrade[];
}

export interface AdvTradeGlobalGetUserTradesByInstrumentResult {
  has_more: boolean;
  trades: AdvTradeGlobalUserTrade[];
}

export interface AdvTradeGlobalGetUserTradesByInstrumentAndTimeResult {
  has_more: boolean;
  trades: AdvTradeGlobalUserTrade[];
}
