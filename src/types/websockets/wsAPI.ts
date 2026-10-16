import { WS_KEY_MAP } from '../../lib/websocket/websocket-util.js';
import {
  AdvTradeGlobalCancelAllByCurrencyPairRequest,
  AdvTradeGlobalCancelAllByCurrencyRequest,
  AdvTradeGlobalCancelAllByInstrumentRequest,
  AdvTradeGlobalCancelAllByKindOrTypeRequest,
  AdvTradeGlobalCancelAllRequest,
  AdvTradeGlobalCancelByLabelRequest,
  AdvTradeGlobalCancelRequest,
  AdvTradeGlobalChangeMarginModelRequest,
  AdvTradeGlobalClosePositionRequest,
  AdvTradeGlobalCreateComboRequest,
  AdvTradeGlobalDisableCancelOnDisconnectRequest,
  AdvTradeGlobalEditByLabelRequest,
  AdvTradeGlobalEditRequest,
  AdvTradeGlobalEnableCancelOnDisconnectRequest,
  AdvTradeGlobalGetAccessLogRequest,
  AdvTradeGlobalGetAccountSummariesRequest,
  AdvTradeGlobalGetAccountSummaryRequest,
  AdvTradeGlobalGetAnnouncementsRequest,
  AdvTradeGlobalGetBookSummaryByCurrencyRequest,
  AdvTradeGlobalGetBookSummaryByInstrumentRequest,
  AdvTradeGlobalGetCancelOnDisconnectRequest,
  AdvTradeGlobalGetComboDetailsRequest,
  AdvTradeGlobalGetComboIdsRequest,
  AdvTradeGlobalGetCombosRequest,
  AdvTradeGlobalGetContractSizeRequest,
  AdvTradeGlobalGetDeliveryPricesRequest,
  AdvTradeGlobalGetExpirationsRequest,
  AdvTradeGlobalGetFundingChartDataRequest,
  AdvTradeGlobalGetFundingRateHistoryRequest,
  AdvTradeGlobalGetFundingRateValueRequest,
  AdvTradeGlobalGetHistoricalVolatilityRequest,
  AdvTradeGlobalGetIndexChartDataRequest,
  AdvTradeGlobalGetIndexPriceNamesRequest,
  AdvTradeGlobalGetIndexPriceRequest,
  AdvTradeGlobalGetInstrumentRequest,
  AdvTradeGlobalGetInstrumentsRequest,
  AdvTradeGlobalGetLastSettlementsByCurrencyRequest,
  AdvTradeGlobalGetLastSettlementsByInstrumentRequest,
  AdvTradeGlobalGetLastTradesByCurrencyAndTimeRequest,
  AdvTradeGlobalGetLastTradesByCurrencyRequest,
  AdvTradeGlobalGetLastTradesByInstrumentAndTimeRequest,
  AdvTradeGlobalGetLastTradesByInstrumentRequest,
  AdvTradeGlobalGetLegPricesRequest,
  AdvTradeGlobalGetMarginsRequest,
  AdvTradeGlobalGetMarkPriceHistoryRequest,
  AdvTradeGlobalGetOpenOrdersByCurrencyRequest,
  AdvTradeGlobalGetOpenOrdersByInstrumentRequest,
  AdvTradeGlobalGetOpenOrdersByLabelRequest,
  AdvTradeGlobalGetOpenOrdersRequest,
  AdvTradeGlobalGetOrderBookByInstrumentIdRequest,
  AdvTradeGlobalGetOrderBookRequest,
  AdvTradeGlobalGetOrderHistoryByCurrencyRequest,
  AdvTradeGlobalGetOrderHistoryByInstrumentRequest,
  AdvTradeGlobalGetOrderMarginByIdsRequest,
  AdvTradeGlobalGetOrderStateByLabelRequest,
  AdvTradeGlobalGetOrderStateRequest,
  AdvTradeGlobalGetPositionRequest,
  AdvTradeGlobalGetPositionsRequest,
  AdvTradeGlobalGetSettlementHistoryByCurrencyRequest,
  AdvTradeGlobalGetSettlementHistoryByInstrumentRequest,
  AdvTradeGlobalGetSupportedIndexNamesRequest,
  AdvTradeGlobalGetTickerRequest,
  AdvTradeGlobalGetTradeVolumesRequest,
  AdvTradeGlobalGetTradingviewChartDataRequest,
  AdvTradeGlobalGetTransactionLogRequest,
  AdvTradeGlobalGetTriggerOrderHistoryRequest,
  AdvTradeGlobalGetUserTradesByCurrencyAndTimeRequest,
  AdvTradeGlobalGetUserTradesByCurrencyRequest,
  AdvTradeGlobalGetUserTradesByInstrumentAndTimeRequest,
  AdvTradeGlobalGetUserTradesByInstrumentRequest,
  AdvTradeGlobalGetUserTradesByOrderRequest,
  AdvTradeGlobalGetVolatilityIndexDataRequest,
  AdvTradeGlobalPlaceOrderRequest,
  AdvTradeGlobalSimulatePmeRequest,
  AdvTradeGlobalSimulatePortfolioRequest,
  AdvTradeGlobalTestRequest,
} from '../request/advanced-trade-global-client.js';
import {
  AdvTradeGlobalAccessLog,
  AdvTradeGlobalBookSummary,
  AdvTradeGlobalBuyResult,
  AdvTradeGlobalChangeMarginModelItem,
  AdvTradeGlobalClosePositionResult,
  AdvTradeGlobalCombo,
  AdvTradeGlobalCurrencyWithApr,
  AdvTradeGlobalEditByLabelResult,
  AdvTradeGlobalEditResult,
  AdvTradeGlobalExpirations,
  AdvTradeGlobalGetAccountSummariesResult,
  AdvTradeGlobalGetAccountSummaryResult,
  AdvTradeGlobalGetAnnouncementsItem,
  AdvTradeGlobalGetCancelOnDisconnectResult,
  AdvTradeGlobalGetContractSizeResult,
  AdvTradeGlobalGetDeliveryPricesResult,
  AdvTradeGlobalGetFundingChartDataResult,
  AdvTradeGlobalGetFundingRateHistoryItem,
  AdvTradeGlobalGetHistoricalVolatilityItem,
  AdvTradeGlobalGetIndexPriceNamesItem,
  AdvTradeGlobalGetIndexPriceResult,
  AdvTradeGlobalGetLastSettlementsByCurrencyResult,
  AdvTradeGlobalGetLastSettlementsByInstrumentResult,
  AdvTradeGlobalGetLastTradesByCurrencyAndTimeResult,
  AdvTradeGlobalGetLastTradesByCurrencyResult,
  AdvTradeGlobalGetLastTradesByInstrumentAndTimeResult,
  AdvTradeGlobalGetLastTradesByInstrumentResult,
  AdvTradeGlobalGetLegPricesResult,
  AdvTradeGlobalGetMarginsResult,
  AdvTradeGlobalGetSettlementHistoryByCurrencyResult,
  AdvTradeGlobalGetSettlementHistoryByInstrumentResult,
  AdvTradeGlobalGetStatusResult,
  AdvTradeGlobalGetSupportedIndexNamesItem,
  AdvTradeGlobalGetTradingviewChartDataResult,
  AdvTradeGlobalGetTransactionLogResult,
  AdvTradeGlobalGetTriggerOrderHistoryResult,
  AdvTradeGlobalGetUserTradesByCurrencyAndTimeResult,
  AdvTradeGlobalGetUserTradesByCurrencyResult,
  AdvTradeGlobalGetUserTradesByInstrumentAndTimeResult,
  AdvTradeGlobalGetUserTradesByInstrumentResult,
  AdvTradeGlobalGetVolatilityIndexDataResult,
  AdvTradeGlobalInstrument,
  AdvTradeGlobalKind,
  AdvTradeGlobalOrder,
  AdvTradeGlobalOrderIdInitialMarginPair,
  AdvTradeGlobalPosition,
  AdvTradeGlobalPositionWithOpenOrdersMargin,
  AdvTradeGlobalSellResult,
  AdvTradeGlobalSimulatePmeResult,
  AdvTradeGlobalSimulatePortfolioResult,
  AdvTradeGlobalTestResult,
  AdvTradeGlobalTickerNotification,
  AdvTradeGlobalTickerNotificationWithBidsAndAsks,
  AdvTradeGlobalTradesVolumes,
  AdvTradeGlobalUserTrade,
} from '../response/advanced-trade-global-client.js';
import { AdvTradeGlobalWSAuthResult } from './advanced-trade-global.js';

export interface AdvTradeGlobalWSGetTickersByCurrencyRequest {
  currency: string;
  kind?: AdvTradeGlobalKind | 'any' | AdvTradeGlobalKind[];
  depth?: 1 | 3 | 10;
}

export type AdvTradeGlobalWSGetTickersByCurrencyResult = (
  | AdvTradeGlobalTickerNotification
  | AdvTradeGlobalTickerNotificationWithBidsAndAsks
)[];

export interface AdvTradeGlobalWSGetLeverageRequest {
  instrument_name?: string;
  subaccount_id?: number;
  isolated?: boolean;
}

export interface AdvTradeGlobalWSLeverage {
  instrument_name: string;
  leverage?: number | null;
  max_leverage: number;
}

export type AdvTradeGlobalWSGetLeverageResult =
  | AdvTradeGlobalWSLeverage
  | AdvTradeGlobalWSLeverage[]
  | Record<string, never>;

export interface AdvTradeGlobalWSSetLeverageRequest {
  instrument_name: string;
  leverage: number | null;
  subaccount_id?: number;
  isolated?: boolean;
}

export type AdvTradeGlobalWSSetLeverageResult = number | null;

export interface AdvTradeGlobalWSGetMaxOrderSizeRequest {
  instrument_name: string;
  subaccount_id?: number;
  isolated?: boolean;
  leverage?: number;
  taker_fee_rate?: number;
  price?: number;
}

export type AdvTradeGlobalWSGetMaxOrderSizeResult = {
  buy_price: number;
  max_tradable_amount: {
    buy_notional: number;
    sell_notional: number;
  };
  max_tradable_amount_reduce_only: {
    buy_notional: number;
    sell_notional: number;
  };
  sell_price: number;
};

export interface AdvTradeGlobalWSGetPmeParamsRequest {
  currency: string;
}

export type AdvTradeGlobalWSGetPmeParamsResult =
  | {
      enabled: true;
      max_future_open_orders: number;
      max_future_open_orders_size: number;
      max_option_open_orders: number;
      max_option_open_orders_size: number;
      max_risk_reducing_orders: number;
      max_total_open_orders: number;
    }
  | {
      enabled: false;
    };

export type AdvTradeGlobalWSGetRiskProfileResult = {
  max_leverage?: number | null;
  portfolio_margining_allowed: boolean;
  short_option_allowed: boolean;
};

export interface AdvTradeGlobalWSGetSubaccountsRequest {
  with_portfolio?: boolean;
  include_isolated?: boolean;
}

export type AdvTradeGlobalWSGetSubaccountsResult = {
  email: string;
  id: number;
  is_password: boolean;
  isolated?: boolean | null;
  isolated_margin_instrument?: string | null;
  login_enabled?: boolean;
  margin_model?: string;
  not_confirmed_email?: string;
  portfolio?: Record<
    string,
    {
      additional_reserve: number;
      available_funds: number;
      available_withdrawal_funds: number;
      balance: number;
      currency: string;
      equity: number;
      initial_margin: number;
      maintenance_margin: number;
      margin_balance: number;
      spot_reserve: number;
    }
  >;
  proof_id?: string;
  proof_id_signature?: string;
  receive_notifications: boolean;
  security_keys_assignments?: unknown[];
  security_keys_enabled?: boolean;
  system_name: string;
  type: 'main' | 'subaccount';
  username: string;
}[];

export interface AdvTradeGlobalWSGetSubaccountsDetailsRequest {
  currency: string;
  with_open_orders?: boolean;
  include_isolated?: boolean;
}

export type AdvTradeGlobalWSGetSubaccountsDetailsResult = {
  open_orders?: AdvTradeGlobalOrder[];
  positions: AdvTradeGlobalPosition[];
  uid: number;
}[];

export interface AdvTradeGlobalWSGetTradingLimitsRequest {
  currency: string;
}

export type AdvTradeGlobalWSGetTradingLimitsResult = {
  currency: string;
  max_future_open_orders?: number;
  max_future_open_orders_size?: number;
  max_future_position_size?: number;
  max_open_orders_in_instrument?: number;
  max_option_open_orders?: number;
  max_option_open_orders_size?: number;
  max_risk_reducing_orders?: number;
  max_total_open_orders?: number;
  max_total_short_options_positions?: number;
  portfolio_margining_enabled: boolean;
};

export type AdvTradeGlobalWSGetUserLocksResult = {
  currency: string;
  enabled: boolean;
  message?: string;
}[];

export interface AdvTradeGlobalWSSubmitTransferBetweenSubaccountsRequest {
  currency: string;
  amount: number;
  destination: number;
  source?: number;
  nonce?: string;
}

export type AdvTradeGlobalWSSubmitTransferBetweenSubaccountsResult = {
  amount: number;
  created_timestamp: number;
  currency: string;
  direction?: 'payment' | 'income';
  id: number;
  nonce?: string;
  other_side: string;
  state: string;
  type: 'user' | 'subaccount';
  updated_timestamp: number;
};

export interface AdvTradeGlobalWSSetHeartbeatRequest {
  interval: number;
}

export type AdvTradeGlobalWSSetHeartbeatResult = 'ok';

export type AdvTradeGlobalWSDisableHeartbeatResult = 'ok';

export interface AdvTradeGlobalWSHelloRequest {
  client_name: string;
  client_version: string;
}

export type AdvTradeGlobalWSHelloResult = {
  version: string;
};

export interface AdvTradeGlobalWSLogoutRequest {
  invalidate_token?: boolean;
}

export interface WsAPITopicRequestParamMap {
  'public/auth': undefined;
  'public/get_announcements': AdvTradeGlobalGetAnnouncementsRequest | undefined;
  'public/get_book_summary_by_currency': AdvTradeGlobalGetBookSummaryByCurrencyRequest;
  'public/get_book_summary_by_instrument': AdvTradeGlobalGetBookSummaryByInstrumentRequest;
  'public/get_combo_details': AdvTradeGlobalGetComboDetailsRequest;
  'public/get_combo_ids': AdvTradeGlobalGetComboIdsRequest;
  'public/get_combos': AdvTradeGlobalGetCombosRequest;
  'public/get_contract_size': AdvTradeGlobalGetContractSizeRequest;
  'public/get_currencies': undefined;
  'public/get_delivery_prices': AdvTradeGlobalGetDeliveryPricesRequest;
  'public/get_expirations': AdvTradeGlobalGetExpirationsRequest;
  'public/get_funding_chart_data': AdvTradeGlobalGetFundingChartDataRequest;
  'public/get_funding_rate_history': AdvTradeGlobalGetFundingRateHistoryRequest;
  'public/get_funding_rate_value': AdvTradeGlobalGetFundingRateValueRequest;
  'public/get_historical_volatility': AdvTradeGlobalGetHistoricalVolatilityRequest;
  'public/get_index_chart_data': AdvTradeGlobalGetIndexChartDataRequest;
  'public/get_index_price': AdvTradeGlobalGetIndexPriceRequest;
  'public/get_index_price_names':
    | AdvTradeGlobalGetIndexPriceNamesRequest
    | undefined;
  'public/get_instrument': AdvTradeGlobalGetInstrumentRequest;
  'public/get_instruments': AdvTradeGlobalGetInstrumentsRequest;
  'public/get_last_settlements_by_currency': AdvTradeGlobalGetLastSettlementsByCurrencyRequest;
  'public/get_last_settlements_by_instrument': AdvTradeGlobalGetLastSettlementsByInstrumentRequest;
  'public/get_last_trades_by_currency': AdvTradeGlobalGetLastTradesByCurrencyRequest;
  'public/get_last_trades_by_currency_and_time': AdvTradeGlobalGetLastTradesByCurrencyAndTimeRequest;
  'public/get_last_trades_by_instrument': AdvTradeGlobalGetLastTradesByInstrumentRequest;
  'public/get_last_trades_by_instrument_and_time': AdvTradeGlobalGetLastTradesByInstrumentAndTimeRequest;
  'public/get_mark_price_history': AdvTradeGlobalGetMarkPriceHistoryRequest;
  'public/get_order_book': AdvTradeGlobalGetOrderBookRequest;
  'public/get_order_book_by_instrument_id': AdvTradeGlobalGetOrderBookByInstrumentIdRequest;
  'public/get_supported_index_names':
    | AdvTradeGlobalGetSupportedIndexNamesRequest
    | undefined;
  'public/get_time': undefined;
  'public/get_trade_volumes': AdvTradeGlobalGetTradeVolumesRequest | undefined;
  'public/get_tradingview_chart_data': AdvTradeGlobalGetTradingviewChartDataRequest;
  'public/get_volatility_index_data': AdvTradeGlobalGetVolatilityIndexDataRequest;
  'public/status': undefined;
  'public/test': AdvTradeGlobalTestRequest | undefined;
  'public/ticker': AdvTradeGlobalGetTickerRequest;
  'private/buy': AdvTradeGlobalPlaceOrderRequest;
  'private/sell': AdvTradeGlobalPlaceOrderRequest;
  'private/edit': AdvTradeGlobalEditRequest;
  'private/edit_by_label': AdvTradeGlobalEditByLabelRequest;
  'private/cancel': AdvTradeGlobalCancelRequest;
  'private/cancel_by_label': AdvTradeGlobalCancelByLabelRequest;
  'private/cancel_all': AdvTradeGlobalCancelAllRequest | undefined;
  'private/cancel_all_by_currency': AdvTradeGlobalCancelAllByCurrencyRequest;
  'private/cancel_all_by_currency_pair': AdvTradeGlobalCancelAllByCurrencyPairRequest;
  'private/cancel_all_by_instrument': AdvTradeGlobalCancelAllByInstrumentRequest;
  'private/cancel_all_by_kind_or_type': AdvTradeGlobalCancelAllByKindOrTypeRequest;
  'private/close_position': AdvTradeGlobalClosePositionRequest;
  'private/get_open_orders': AdvTradeGlobalGetOpenOrdersRequest | undefined;
  'private/get_open_orders_by_currency': AdvTradeGlobalGetOpenOrdersByCurrencyRequest;
  'private/get_open_orders_by_instrument': AdvTradeGlobalGetOpenOrdersByInstrumentRequest;
  'private/get_open_orders_by_label': AdvTradeGlobalGetOpenOrdersByLabelRequest;
  'private/get_order_state': AdvTradeGlobalGetOrderStateRequest;
  'private/get_order_state_by_label': AdvTradeGlobalGetOrderStateByLabelRequest;
  'private/get_order_history_by_currency': AdvTradeGlobalGetOrderHistoryByCurrencyRequest;
  'private/get_order_history_by_instrument': AdvTradeGlobalGetOrderHistoryByInstrumentRequest;
  'private/get_order_margin_by_ids': AdvTradeGlobalGetOrderMarginByIdsRequest;
  'private/get_trigger_order_history': AdvTradeGlobalGetTriggerOrderHistoryRequest;
  'private/get_user_trades_by_currency': AdvTradeGlobalGetUserTradesByCurrencyRequest;
  'private/get_user_trades_by_currency_and_time': AdvTradeGlobalGetUserTradesByCurrencyAndTimeRequest;
  'private/get_user_trades_by_instrument': AdvTradeGlobalGetUserTradesByInstrumentRequest;
  'private/get_user_trades_by_instrument_and_time': AdvTradeGlobalGetUserTradesByInstrumentAndTimeRequest;
  'private/get_user_trades_by_order': AdvTradeGlobalGetUserTradesByOrderRequest;
  'private/get_margins': AdvTradeGlobalGetMarginsRequest;
  'private/get_account_summaries':
    | AdvTradeGlobalGetAccountSummariesRequest
    | undefined;
  'private/get_account_summary': AdvTradeGlobalGetAccountSummaryRequest;
  'private/get_position': AdvTradeGlobalGetPositionRequest;
  'private/get_positions': AdvTradeGlobalGetPositionsRequest | undefined;
  'private/change_margin_model': AdvTradeGlobalChangeMarginModelRequest;
  'private/get_access_log': AdvTradeGlobalGetAccessLogRequest | undefined;
  'private/get_transaction_log': AdvTradeGlobalGetTransactionLogRequest;
  'private/get_settlement_history_by_currency': AdvTradeGlobalGetSettlementHistoryByCurrencyRequest;
  'private/get_settlement_history_by_instrument': AdvTradeGlobalGetSettlementHistoryByInstrumentRequest;
  'private/simulate_portfolio': AdvTradeGlobalSimulatePortfolioRequest;
  'private/pme/simulate': AdvTradeGlobalSimulatePmeRequest;
  'private/enable_cancel_on_disconnect':
    | AdvTradeGlobalEnableCancelOnDisconnectRequest
    | undefined;
  'private/disable_cancel_on_disconnect':
    | AdvTradeGlobalDisableCancelOnDisconnectRequest
    | undefined;
  'private/get_cancel_on_disconnect':
    | AdvTradeGlobalGetCancelOnDisconnectRequest
    | undefined;
  'private/create_combo': AdvTradeGlobalCreateComboRequest;
  'private/get_leg_prices': AdvTradeGlobalGetLegPricesRequest;
  'public/tickers_by_currency': AdvTradeGlobalWSGetTickersByCurrencyRequest;
  'private/get_leverage': AdvTradeGlobalWSGetLeverageRequest | undefined;
  'private/set_leverage': AdvTradeGlobalWSSetLeverageRequest;
  'private/get_max_order_size': AdvTradeGlobalWSGetMaxOrderSizeRequest;
  'private/get_pme_params': AdvTradeGlobalWSGetPmeParamsRequest;
  'private/get_risk_profile': undefined;
  'private/get_subaccounts': AdvTradeGlobalWSGetSubaccountsRequest | undefined;
  'private/get_subaccounts_details': AdvTradeGlobalWSGetSubaccountsDetailsRequest;
  'private/get_trading_limits': AdvTradeGlobalWSGetTradingLimitsRequest;
  'private/get_user_locks': undefined;
  'private/submit_transfer_between_subaccounts': AdvTradeGlobalWSSubmitTransferBetweenSubaccountsRequest;
  'public/set_heartbeat': AdvTradeGlobalWSSetHeartbeatRequest;
  'public/disable_heartbeat': undefined;
  'public/hello': AdvTradeGlobalWSHelloRequest;
  'private/logout': AdvTradeGlobalWSLogoutRequest | undefined;
}

export type WSAPIWsKey = typeof WS_KEY_MAP.advTradeGlobalWSAPI;
export interface WSAPIRequest<TParams = unknown> {
  jsonrpc: '2.0';
  id: number;
  method: keyof WsAPITopicRequestParamMap;
  params: TParams;
}
/** WS API promises preserve the gateway envelope, as in the other exchange SDKs. */
export interface WSAPIResponse<TResult = unknown> {
  wsKey: WSAPIWsKey;
  jsonrpc: '2.0';
  id: number;
  result: TResult;
  usIn?: number;
  usOut?: number;
  usDiff?: number;
  testnet?: boolean;
  isWSAPIResponse: true;
  request?: WSAPIRequest & { wsKey: WSAPIWsKey };
}
export interface WSAPIErrorResponse {
  wsKey: WSAPIWsKey;
  jsonrpc: '2.0';
  id: number;
  error: { code: number; message: string; data?: unknown };
  isWSAPIResponse: true;
  request?: WSAPIRequest & { wsKey: WSAPIWsKey };
}
export interface WSAPIRequestFlags {
  /** Skip the local authentication requirement. Public methods already skip it. */
  authIsOptional?: boolean;
  /** Override the RPC reply timeout in milliseconds. Does not apply to connection/authentication. */
  requestTimeout?: number;
}

export interface WsAPIWsKeyTopicMap {
  [WS_KEY_MAP.advTradeGlobalWSAPI]: keyof WsAPITopicRequestParamMap;
}

export interface WsAPITopicResponseMap {
  'public/auth': WSAPIResponse<AdvTradeGlobalWSAuthResult>;
  'public/get_announcements': WSAPIResponse<
    AdvTradeGlobalGetAnnouncementsItem[]
  >;
  'public/get_book_summary_by_currency': WSAPIResponse<
    AdvTradeGlobalBookSummary[]
  >;
  'public/get_book_summary_by_instrument': WSAPIResponse<
    AdvTradeGlobalBookSummary[]
  >;
  'public/get_combo_details': WSAPIResponse<AdvTradeGlobalCombo>;
  'public/get_combo_ids': WSAPIResponse<string[]>;
  'public/get_combos': WSAPIResponse<AdvTradeGlobalCombo[]>;
  'public/get_contract_size': WSAPIResponse<AdvTradeGlobalGetContractSizeResult>;
  'public/get_currencies': WSAPIResponse<AdvTradeGlobalCurrencyWithApr[]>;
  'public/get_delivery_prices': WSAPIResponse<AdvTradeGlobalGetDeliveryPricesResult>;
  'public/get_expirations': WSAPIResponse<AdvTradeGlobalExpirations[]>;
  'public/get_funding_chart_data': WSAPIResponse<AdvTradeGlobalGetFundingChartDataResult>;
  'public/get_funding_rate_history': WSAPIResponse<
    AdvTradeGlobalGetFundingRateHistoryItem[]
  >;
  'public/get_funding_rate_value': WSAPIResponse<number>;
  'public/get_historical_volatility': WSAPIResponse<
    AdvTradeGlobalGetHistoricalVolatilityItem[]
  >;
  'public/get_index_chart_data': WSAPIResponse<number[][]>;
  'public/get_index_price': WSAPIResponse<AdvTradeGlobalGetIndexPriceResult>;
  'public/get_index_price_names': WSAPIResponse<
    AdvTradeGlobalGetIndexPriceNamesItem[]
  >;
  'public/get_instrument': WSAPIResponse<AdvTradeGlobalInstrument>;
  'public/get_instruments': WSAPIResponse<AdvTradeGlobalInstrument[]>;
  'public/get_last_settlements_by_currency': WSAPIResponse<AdvTradeGlobalGetLastSettlementsByCurrencyResult>;
  'public/get_last_settlements_by_instrument': WSAPIResponse<AdvTradeGlobalGetLastSettlementsByInstrumentResult>;
  'public/get_last_trades_by_currency': WSAPIResponse<AdvTradeGlobalGetLastTradesByCurrencyResult>;
  'public/get_last_trades_by_currency_and_time': WSAPIResponse<AdvTradeGlobalGetLastTradesByCurrencyAndTimeResult>;
  'public/get_last_trades_by_instrument': WSAPIResponse<AdvTradeGlobalGetLastTradesByInstrumentResult>;
  'public/get_last_trades_by_instrument_and_time': WSAPIResponse<AdvTradeGlobalGetLastTradesByInstrumentAndTimeResult>;
  'public/get_mark_price_history': WSAPIResponse<number[][]>;
  'public/get_order_book': WSAPIResponse<AdvTradeGlobalTickerNotificationWithBidsAndAsks>;
  'public/get_order_book_by_instrument_id': WSAPIResponse<AdvTradeGlobalTickerNotificationWithBidsAndAsks>;
  'public/get_supported_index_names': WSAPIResponse<
    AdvTradeGlobalGetSupportedIndexNamesItem[]
  >;
  'public/get_time': WSAPIResponse<number>;
  'public/get_trade_volumes': WSAPIResponse<AdvTradeGlobalTradesVolumes[]>;
  'public/get_tradingview_chart_data': WSAPIResponse<AdvTradeGlobalGetTradingviewChartDataResult>;
  'public/get_volatility_index_data': WSAPIResponse<AdvTradeGlobalGetVolatilityIndexDataResult>;
  'public/status': WSAPIResponse<AdvTradeGlobalGetStatusResult>;
  'public/test': WSAPIResponse<AdvTradeGlobalTestResult>;
  'public/ticker': WSAPIResponse<AdvTradeGlobalTickerNotification>;
  'private/buy': WSAPIResponse<AdvTradeGlobalBuyResult>;
  'private/sell': WSAPIResponse<AdvTradeGlobalSellResult>;
  'private/edit': WSAPIResponse<AdvTradeGlobalEditResult>;
  'private/edit_by_label': WSAPIResponse<AdvTradeGlobalEditByLabelResult>;
  'private/cancel': WSAPIResponse<AdvTradeGlobalOrder>;
  'private/cancel_by_label': WSAPIResponse<number>;
  'private/cancel_all': WSAPIResponse<number>;
  'private/cancel_all_by_currency': WSAPIResponse<number>;
  'private/cancel_all_by_currency_pair': WSAPIResponse<number>;
  'private/cancel_all_by_instrument': WSAPIResponse<number>;
  'private/cancel_all_by_kind_or_type': WSAPIResponse<number>;
  'private/close_position': WSAPIResponse<AdvTradeGlobalClosePositionResult>;
  'private/get_open_orders': WSAPIResponse<AdvTradeGlobalOrder[]>;
  'private/get_open_orders_by_currency': WSAPIResponse<AdvTradeGlobalOrder[]>;
  'private/get_open_orders_by_instrument': WSAPIResponse<AdvTradeGlobalOrder[]>;
  'private/get_open_orders_by_label': WSAPIResponse<AdvTradeGlobalOrder[]>;
  'private/get_order_state': WSAPIResponse<AdvTradeGlobalOrder>;
  'private/get_order_state_by_label': WSAPIResponse<AdvTradeGlobalOrder[]>;
  'private/get_order_history_by_currency': WSAPIResponse<AdvTradeGlobalOrder[]>;
  'private/get_order_history_by_instrument': WSAPIResponse<
    AdvTradeGlobalOrder[]
  >;
  'private/get_order_margin_by_ids': WSAPIResponse<
    AdvTradeGlobalOrderIdInitialMarginPair[]
  >;
  'private/get_trigger_order_history': WSAPIResponse<AdvTradeGlobalGetTriggerOrderHistoryResult>;
  'private/get_user_trades_by_currency': WSAPIResponse<AdvTradeGlobalGetUserTradesByCurrencyResult>;
  'private/get_user_trades_by_currency_and_time': WSAPIResponse<AdvTradeGlobalGetUserTradesByCurrencyAndTimeResult>;
  'private/get_user_trades_by_instrument': WSAPIResponse<AdvTradeGlobalGetUserTradesByInstrumentResult>;
  'private/get_user_trades_by_instrument_and_time': WSAPIResponse<AdvTradeGlobalGetUserTradesByInstrumentAndTimeResult>;
  'private/get_user_trades_by_order': WSAPIResponse<AdvTradeGlobalUserTrade[]>;
  'private/get_margins': WSAPIResponse<AdvTradeGlobalGetMarginsResult>;
  'private/get_account_summaries': WSAPIResponse<AdvTradeGlobalGetAccountSummariesResult>;
  'private/get_account_summary': WSAPIResponse<AdvTradeGlobalGetAccountSummaryResult>;
  'private/get_position': WSAPIResponse<AdvTradeGlobalPositionWithOpenOrdersMargin>;
  'private/get_positions': WSAPIResponse<
    AdvTradeGlobalPositionWithOpenOrdersMargin[]
  >;
  'private/change_margin_model': WSAPIResponse<
    AdvTradeGlobalChangeMarginModelItem[]
  >;
  'private/get_access_log': WSAPIResponse<AdvTradeGlobalAccessLog[]>;
  'private/get_transaction_log': WSAPIResponse<AdvTradeGlobalGetTransactionLogResult>;
  'private/get_settlement_history_by_currency': WSAPIResponse<AdvTradeGlobalGetSettlementHistoryByCurrencyResult>;
  'private/get_settlement_history_by_instrument': WSAPIResponse<AdvTradeGlobalGetSettlementHistoryByInstrumentResult>;
  'private/simulate_portfolio': WSAPIResponse<AdvTradeGlobalSimulatePortfolioResult>;
  'private/pme/simulate': WSAPIResponse<AdvTradeGlobalSimulatePmeResult>;
  'private/enable_cancel_on_disconnect': WSAPIResponse<'ok'>;
  'private/disable_cancel_on_disconnect': WSAPIResponse<'ok'>;
  'private/get_cancel_on_disconnect': WSAPIResponse<AdvTradeGlobalGetCancelOnDisconnectResult>;
  'private/create_combo': WSAPIResponse<AdvTradeGlobalCombo>;
  'private/get_leg_prices': WSAPIResponse<AdvTradeGlobalGetLegPricesResult>;
  'public/tickers_by_currency': WSAPIResponse<AdvTradeGlobalWSGetTickersByCurrencyResult>;
  'private/get_leverage': WSAPIResponse<AdvTradeGlobalWSGetLeverageResult>;
  'private/set_leverage': WSAPIResponse<AdvTradeGlobalWSSetLeverageResult>;
  'private/get_max_order_size': WSAPIResponse<AdvTradeGlobalWSGetMaxOrderSizeResult>;
  'private/get_pme_params': WSAPIResponse<AdvTradeGlobalWSGetPmeParamsResult>;
  'private/get_risk_profile': WSAPIResponse<AdvTradeGlobalWSGetRiskProfileResult>;
  'private/get_subaccounts': WSAPIResponse<AdvTradeGlobalWSGetSubaccountsResult>;
  'private/get_subaccounts_details': WSAPIResponse<AdvTradeGlobalWSGetSubaccountsDetailsResult>;
  'private/get_trading_limits': WSAPIResponse<AdvTradeGlobalWSGetTradingLimitsResult>;
  'private/get_user_locks': WSAPIResponse<AdvTradeGlobalWSGetUserLocksResult>;
  'private/submit_transfer_between_subaccounts': WSAPIResponse<AdvTradeGlobalWSSubmitTransferBetweenSubaccountsResult>;
  'public/set_heartbeat': WSAPIResponse<AdvTradeGlobalWSSetHeartbeatResult>;
  'public/disable_heartbeat': WSAPIResponse<AdvTradeGlobalWSDisableHeartbeatResult>;
  'public/hello': WSAPIResponse<AdvTradeGlobalWSHelloResult>;
  'private/logout': void;
}
