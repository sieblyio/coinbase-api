import { DefaultLogger } from './lib/websocket/logger.js';
import { WS_KEY_MAP } from './lib/websocket/websocket-util.js';
import { WSClientConfigurableOptions } from './types/websockets/client.js';
import {
  WsAPITopicRequestParamMap,
  WsAPITopicResponseMap,
} from './types/websockets/wsAPI.js';
import { WebsocketClient } from './WebsocketClient.js';

export interface WSAPIClientConfigurableOptions {
  /** Attach connection/auth/error logging. Defaults to true. */
  attachEventListeners: boolean;
}

/** Thin REST-style wrapper around WebsocketClient.sendWSAPIRequest(), following the Bybit SDK. */
export class WebsocketAPIClient {
  private wsClient: WebsocketClient;

  constructor(
    options?: WSClientConfigurableOptions &
      Partial<WSAPIClientConfigurableOptions>,
    logger?: typeof DefaultLogger,
  ) {
    this.wsClient = new WebsocketClient(options, logger);
    if (options?.attachEventListeners !== false)
      this.setupDefaultEventListeners();
  }

  public getWSClient(): WebsocketClient {
    return this.wsClient;
  }

  /** Optional warm-up before making private requests. */
  public connectWSAPI(): Promise<unknown> {
    return this.wsClient.connectWSAPI();
  }

  /** public/auth. Generates a fresh CDP JWT automatically. */
  auth(): Promise<WsAPITopicResponseMap['public/auth']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'public/auth',
    );
  }

  /** public/get_announcements */
  getAnnouncements(
    params?: WsAPITopicRequestParamMap['public/get_announcements'],
  ): Promise<WsAPITopicResponseMap['public/get_announcements']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'public/get_announcements',
      params,
    );
  }

  /** public/get_book_summary_by_currency */
  getBookSummaryByCurrency(
    params: WsAPITopicRequestParamMap['public/get_book_summary_by_currency'],
  ): Promise<WsAPITopicResponseMap['public/get_book_summary_by_currency']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'public/get_book_summary_by_currency',
      params,
    );
  }

  /** public/get_book_summary_by_instrument */
  getBookSummaryByInstrument(
    params: WsAPITopicRequestParamMap['public/get_book_summary_by_instrument'],
  ): Promise<WsAPITopicResponseMap['public/get_book_summary_by_instrument']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'public/get_book_summary_by_instrument',
      params,
    );
  }

  /** public/get_combo_details */
  getComboDetails(
    params: WsAPITopicRequestParamMap['public/get_combo_details'],
  ): Promise<WsAPITopicResponseMap['public/get_combo_details']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'public/get_combo_details',
      params,
    );
  }

  /** public/get_combo_ids */
  getComboIds(
    params: WsAPITopicRequestParamMap['public/get_combo_ids'],
  ): Promise<WsAPITopicResponseMap['public/get_combo_ids']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'public/get_combo_ids',
      params,
    );
  }

  /** public/get_combos */
  getCombos(
    params: WsAPITopicRequestParamMap['public/get_combos'],
  ): Promise<WsAPITopicResponseMap['public/get_combos']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'public/get_combos',
      params,
    );
  }

  /** public/get_contract_size */
  getContractSize(
    params: WsAPITopicRequestParamMap['public/get_contract_size'],
  ): Promise<WsAPITopicResponseMap['public/get_contract_size']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'public/get_contract_size',
      params,
    );
  }

  /** public/get_currencies */
  getCurrencies(): Promise<WsAPITopicResponseMap['public/get_currencies']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'public/get_currencies',
    );
  }

  /** public/get_delivery_prices */
  getDeliveryPrices(
    params: WsAPITopicRequestParamMap['public/get_delivery_prices'],
  ): Promise<WsAPITopicResponseMap['public/get_delivery_prices']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'public/get_delivery_prices',
      params,
    );
  }

  /** public/get_expirations */
  getExpirations(
    params: WsAPITopicRequestParamMap['public/get_expirations'],
  ): Promise<WsAPITopicResponseMap['public/get_expirations']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'public/get_expirations',
      params,
    );
  }

  /** public/get_funding_chart_data */
  getFundingChartData(
    params: WsAPITopicRequestParamMap['public/get_funding_chart_data'],
  ): Promise<WsAPITopicResponseMap['public/get_funding_chart_data']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'public/get_funding_chart_data',
      params,
    );
  }

  /** public/get_funding_rate_history */
  getFundingRateHistory(
    params: WsAPITopicRequestParamMap['public/get_funding_rate_history'],
  ): Promise<WsAPITopicResponseMap['public/get_funding_rate_history']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'public/get_funding_rate_history',
      params,
    );
  }

  /** public/get_funding_rate_value */
  getFundingRateValue(
    params: WsAPITopicRequestParamMap['public/get_funding_rate_value'],
  ): Promise<WsAPITopicResponseMap['public/get_funding_rate_value']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'public/get_funding_rate_value',
      params,
    );
  }

  /** public/get_historical_volatility */
  getHistoricalVolatility(
    params: WsAPITopicRequestParamMap['public/get_historical_volatility'],
  ): Promise<WsAPITopicResponseMap['public/get_historical_volatility']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'public/get_historical_volatility',
      params,
    );
  }

  /** public/get_index_chart_data */
  getIndexChartData(
    params: WsAPITopicRequestParamMap['public/get_index_chart_data'],
  ): Promise<WsAPITopicResponseMap['public/get_index_chart_data']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'public/get_index_chart_data',
      params,
    );
  }

  /** public/get_index_price */
  getIndexPrice(
    params: WsAPITopicRequestParamMap['public/get_index_price'],
  ): Promise<WsAPITopicResponseMap['public/get_index_price']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'public/get_index_price',
      params,
    );
  }

  /** public/get_index_price_names */
  getIndexPriceNames(
    params?: WsAPITopicRequestParamMap['public/get_index_price_names'],
  ): Promise<WsAPITopicResponseMap['public/get_index_price_names']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'public/get_index_price_names',
      params,
    );
  }

  /** public/get_instrument */
  getInstrument(
    params: WsAPITopicRequestParamMap['public/get_instrument'],
  ): Promise<WsAPITopicResponseMap['public/get_instrument']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'public/get_instrument',
      params,
    );
  }

  /** public/get_instruments */
  getInstruments(
    params: WsAPITopicRequestParamMap['public/get_instruments'],
  ): Promise<WsAPITopicResponseMap['public/get_instruments']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'public/get_instruments',
      params,
    );
  }

  /** public/get_last_settlements_by_currency */
  getLastSettlementsByCurrency(
    params: WsAPITopicRequestParamMap['public/get_last_settlements_by_currency'],
  ): Promise<WsAPITopicResponseMap['public/get_last_settlements_by_currency']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'public/get_last_settlements_by_currency',
      params,
    );
  }

  /** public/get_last_settlements_by_instrument */
  getLastSettlementsByInstrument(
    params: WsAPITopicRequestParamMap['public/get_last_settlements_by_instrument'],
  ): Promise<
    WsAPITopicResponseMap['public/get_last_settlements_by_instrument']
  > {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'public/get_last_settlements_by_instrument',
      params,
    );
  }

  /** public/get_last_trades_by_currency */
  getLastTradesByCurrency(
    params: WsAPITopicRequestParamMap['public/get_last_trades_by_currency'],
  ): Promise<WsAPITopicResponseMap['public/get_last_trades_by_currency']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'public/get_last_trades_by_currency',
      params,
    );
  }

  /** public/get_last_trades_by_currency_and_time */
  getLastTradesByCurrencyAndTime(
    params: WsAPITopicRequestParamMap['public/get_last_trades_by_currency_and_time'],
  ): Promise<
    WsAPITopicResponseMap['public/get_last_trades_by_currency_and_time']
  > {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'public/get_last_trades_by_currency_and_time',
      params,
    );
  }

  /** public/get_last_trades_by_instrument */
  getLastTradesByInstrument(
    params: WsAPITopicRequestParamMap['public/get_last_trades_by_instrument'],
  ): Promise<WsAPITopicResponseMap['public/get_last_trades_by_instrument']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'public/get_last_trades_by_instrument',
      params,
    );
  }

  /** public/get_last_trades_by_instrument_and_time */
  getLastTradesByInstrumentAndTime(
    params: WsAPITopicRequestParamMap['public/get_last_trades_by_instrument_and_time'],
  ): Promise<
    WsAPITopicResponseMap['public/get_last_trades_by_instrument_and_time']
  > {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'public/get_last_trades_by_instrument_and_time',
      params,
    );
  }

  /** public/get_mark_price_history */
  getMarkPriceHistory(
    params: WsAPITopicRequestParamMap['public/get_mark_price_history'],
  ): Promise<WsAPITopicResponseMap['public/get_mark_price_history']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'public/get_mark_price_history',
      params,
    );
  }

  /** public/get_order_book */
  getOrderBook(
    params: WsAPITopicRequestParamMap['public/get_order_book'],
  ): Promise<WsAPITopicResponseMap['public/get_order_book']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'public/get_order_book',
      params,
    );
  }

  /** public/get_order_book_by_instrument_id */
  getOrderBookByInstrumentId(
    params: WsAPITopicRequestParamMap['public/get_order_book_by_instrument_id'],
  ): Promise<WsAPITopicResponseMap['public/get_order_book_by_instrument_id']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'public/get_order_book_by_instrument_id',
      params,
    );
  }

  /** public/get_supported_index_names */
  getSupportedIndexNames(
    params?: WsAPITopicRequestParamMap['public/get_supported_index_names'],
  ): Promise<WsAPITopicResponseMap['public/get_supported_index_names']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'public/get_supported_index_names',
      params,
    );
  }

  /** public/get_time */
  getTime(): Promise<WsAPITopicResponseMap['public/get_time']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'public/get_time',
    );
  }

  /** public/get_trade_volumes */
  getTradeVolumes(
    params?: WsAPITopicRequestParamMap['public/get_trade_volumes'],
  ): Promise<WsAPITopicResponseMap['public/get_trade_volumes']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'public/get_trade_volumes',
      params,
    );
  }

  /** public/get_tradingview_chart_data */
  getTradingviewChartData(
    params: WsAPITopicRequestParamMap['public/get_tradingview_chart_data'],
  ): Promise<WsAPITopicResponseMap['public/get_tradingview_chart_data']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'public/get_tradingview_chart_data',
      params,
    );
  }

  /** public/get_volatility_index_data */
  getVolatilityIndexData(
    params: WsAPITopicRequestParamMap['public/get_volatility_index_data'],
  ): Promise<WsAPITopicResponseMap['public/get_volatility_index_data']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'public/get_volatility_index_data',
      params,
    );
  }

  /** public/status */
  getStatus(): Promise<WsAPITopicResponseMap['public/status']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'public/status',
    );
  }

  /** public/test */
  testConnection(
    params?: WsAPITopicRequestParamMap['public/test'],
  ): Promise<WsAPITopicResponseMap['public/test']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'public/test',
      params,
    );
  }

  /** public/ticker */
  getTicker(
    params: WsAPITopicRequestParamMap['public/ticker'],
  ): Promise<WsAPITopicResponseMap['public/ticker']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'public/ticker',
      params,
    );
  }

  /** private/buy */
  submitBuy(
    params: WsAPITopicRequestParamMap['private/buy'],
  ): Promise<WsAPITopicResponseMap['private/buy']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/buy',
      params,
    );
  }

  /** private/sell */
  submitSell(
    params: WsAPITopicRequestParamMap['private/sell'],
  ): Promise<WsAPITopicResponseMap['private/sell']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/sell',
      params,
    );
  }

  /** private/edit */
  updateOrder(
    params: WsAPITopicRequestParamMap['private/edit'],
  ): Promise<WsAPITopicResponseMap['private/edit']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/edit',
      params,
    );
  }

  /** private/edit_by_label */
  updateOrderByLabel(
    params: WsAPITopicRequestParamMap['private/edit_by_label'],
  ): Promise<WsAPITopicResponseMap['private/edit_by_label']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/edit_by_label',
      params,
    );
  }

  /** private/cancel */
  cancelOrder(
    params: WsAPITopicRequestParamMap['private/cancel'],
  ): Promise<WsAPITopicResponseMap['private/cancel']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/cancel',
      params,
    );
  }

  /** private/cancel_by_label */
  cancelByLabel(
    params: WsAPITopicRequestParamMap['private/cancel_by_label'],
  ): Promise<WsAPITopicResponseMap['private/cancel_by_label']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/cancel_by_label',
      params,
    );
  }

  /** private/cancel_all */
  cancelAll(
    params?: WsAPITopicRequestParamMap['private/cancel_all'],
  ): Promise<WsAPITopicResponseMap['private/cancel_all']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/cancel_all',
      params,
    );
  }

  /** private/cancel_all_by_currency */
  cancelAllByCurrency(
    params: WsAPITopicRequestParamMap['private/cancel_all_by_currency'],
  ): Promise<WsAPITopicResponseMap['private/cancel_all_by_currency']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/cancel_all_by_currency',
      params,
    );
  }

  /** private/cancel_all_by_currency_pair */
  cancelAllByCurrencyPair(
    params: WsAPITopicRequestParamMap['private/cancel_all_by_currency_pair'],
  ): Promise<WsAPITopicResponseMap['private/cancel_all_by_currency_pair']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/cancel_all_by_currency_pair',
      params,
    );
  }

  /** private/cancel_all_by_instrument */
  cancelAllByInstrument(
    params: WsAPITopicRequestParamMap['private/cancel_all_by_instrument'],
  ): Promise<WsAPITopicResponseMap['private/cancel_all_by_instrument']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/cancel_all_by_instrument',
      params,
    );
  }

  /** private/cancel_all_by_kind_or_type */
  cancelAllByKindOrType(
    params: WsAPITopicRequestParamMap['private/cancel_all_by_kind_or_type'],
  ): Promise<WsAPITopicResponseMap['private/cancel_all_by_kind_or_type']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/cancel_all_by_kind_or_type',
      params,
    );
  }

  /** private/close_position */
  closePosition(
    params: WsAPITopicRequestParamMap['private/close_position'],
  ): Promise<WsAPITopicResponseMap['private/close_position']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/close_position',
      params,
    );
  }

  /** private/get_open_orders */
  getOpenOrders(
    params?: WsAPITopicRequestParamMap['private/get_open_orders'],
  ): Promise<WsAPITopicResponseMap['private/get_open_orders']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/get_open_orders',
      params,
    );
  }

  /** private/get_open_orders_by_currency */
  getOpenOrdersByCurrency(
    params: WsAPITopicRequestParamMap['private/get_open_orders_by_currency'],
  ): Promise<WsAPITopicResponseMap['private/get_open_orders_by_currency']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/get_open_orders_by_currency',
      params,
    );
  }

  /** private/get_open_orders_by_instrument */
  getOpenOrdersByInstrument(
    params: WsAPITopicRequestParamMap['private/get_open_orders_by_instrument'],
  ): Promise<WsAPITopicResponseMap['private/get_open_orders_by_instrument']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/get_open_orders_by_instrument',
      params,
    );
  }

  /** private/get_open_orders_by_label */
  getOpenOrdersByLabel(
    params: WsAPITopicRequestParamMap['private/get_open_orders_by_label'],
  ): Promise<WsAPITopicResponseMap['private/get_open_orders_by_label']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/get_open_orders_by_label',
      params,
    );
  }

  /** private/get_order_state */
  getOrderState(
    params: WsAPITopicRequestParamMap['private/get_order_state'],
  ): Promise<WsAPITopicResponseMap['private/get_order_state']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/get_order_state',
      params,
    );
  }

  /** private/get_order_state_by_label */
  getOrderStateByLabel(
    params: WsAPITopicRequestParamMap['private/get_order_state_by_label'],
  ): Promise<WsAPITopicResponseMap['private/get_order_state_by_label']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/get_order_state_by_label',
      params,
    );
  }

  /** private/get_order_history_by_currency */
  getOrderHistoryByCurrency(
    params: WsAPITopicRequestParamMap['private/get_order_history_by_currency'],
  ): Promise<WsAPITopicResponseMap['private/get_order_history_by_currency']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/get_order_history_by_currency',
      params,
    );
  }

  /** private/get_order_history_by_instrument */
  getOrderHistoryByInstrument(
    params: WsAPITopicRequestParamMap['private/get_order_history_by_instrument'],
  ): Promise<WsAPITopicResponseMap['private/get_order_history_by_instrument']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/get_order_history_by_instrument',
      params,
    );
  }

  /** private/get_order_margin_by_ids */
  getOrderMarginByIds(
    params: WsAPITopicRequestParamMap['private/get_order_margin_by_ids'],
  ): Promise<WsAPITopicResponseMap['private/get_order_margin_by_ids']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/get_order_margin_by_ids',
      params,
    );
  }

  /** private/get_trigger_order_history */
  getTriggerOrderHistory(
    params: WsAPITopicRequestParamMap['private/get_trigger_order_history'],
  ): Promise<WsAPITopicResponseMap['private/get_trigger_order_history']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/get_trigger_order_history',
      params,
    );
  }

  /** private/get_user_trades_by_currency */
  getUserTradesByCurrency(
    params: WsAPITopicRequestParamMap['private/get_user_trades_by_currency'],
  ): Promise<WsAPITopicResponseMap['private/get_user_trades_by_currency']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/get_user_trades_by_currency',
      params,
    );
  }

  /** private/get_user_trades_by_currency_and_time */
  getUserTradesByCurrencyAndTime(
    params: WsAPITopicRequestParamMap['private/get_user_trades_by_currency_and_time'],
  ): Promise<
    WsAPITopicResponseMap['private/get_user_trades_by_currency_and_time']
  > {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/get_user_trades_by_currency_and_time',
      params,
    );
  }

  /** private/get_user_trades_by_instrument */
  getUserTradesByInstrument(
    params: WsAPITopicRequestParamMap['private/get_user_trades_by_instrument'],
  ): Promise<WsAPITopicResponseMap['private/get_user_trades_by_instrument']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/get_user_trades_by_instrument',
      params,
    );
  }

  /** private/get_user_trades_by_instrument_and_time */
  getUserTradesByInstrumentAndTime(
    params: WsAPITopicRequestParamMap['private/get_user_trades_by_instrument_and_time'],
  ): Promise<
    WsAPITopicResponseMap['private/get_user_trades_by_instrument_and_time']
  > {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/get_user_trades_by_instrument_and_time',
      params,
    );
  }

  /** private/get_user_trades_by_order */
  getUserTradesByOrder(
    params: WsAPITopicRequestParamMap['private/get_user_trades_by_order'],
  ): Promise<WsAPITopicResponseMap['private/get_user_trades_by_order']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/get_user_trades_by_order',
      params,
    );
  }

  /** private/get_margins */
  getMargins(
    params: WsAPITopicRequestParamMap['private/get_margins'],
  ): Promise<WsAPITopicResponseMap['private/get_margins']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/get_margins',
      params,
    );
  }

  /** private/get_account_summaries */
  getAccountSummaries(
    params?: WsAPITopicRequestParamMap['private/get_account_summaries'],
  ): Promise<WsAPITopicResponseMap['private/get_account_summaries']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/get_account_summaries',
      params,
    );
  }

  /** private/get_account_summary */
  getAccountSummary(
    params: WsAPITopicRequestParamMap['private/get_account_summary'],
  ): Promise<WsAPITopicResponseMap['private/get_account_summary']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/get_account_summary',
      params,
    );
  }

  /** private/get_position */
  getPosition(
    params: WsAPITopicRequestParamMap['private/get_position'],
  ): Promise<WsAPITopicResponseMap['private/get_position']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/get_position',
      params,
    );
  }

  /** private/get_positions */
  getPositions(
    params?: WsAPITopicRequestParamMap['private/get_positions'],
  ): Promise<WsAPITopicResponseMap['private/get_positions']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/get_positions',
      params,
    );
  }

  /** private/change_margin_model */
  changeMarginModel(
    params: WsAPITopicRequestParamMap['private/change_margin_model'],
  ): Promise<WsAPITopicResponseMap['private/change_margin_model']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/change_margin_model',
      params,
    );
  }

  /** private/get_access_log */
  getAccessLog(
    params?: WsAPITopicRequestParamMap['private/get_access_log'],
  ): Promise<WsAPITopicResponseMap['private/get_access_log']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/get_access_log',
      params,
    );
  }

  /** private/get_transaction_log */
  getTransactionLog(
    params: WsAPITopicRequestParamMap['private/get_transaction_log'],
  ): Promise<WsAPITopicResponseMap['private/get_transaction_log']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/get_transaction_log',
      params,
    );
  }

  /** private/get_settlement_history_by_currency */
  getSettlementHistoryByCurrency(
    params: WsAPITopicRequestParamMap['private/get_settlement_history_by_currency'],
  ): Promise<
    WsAPITopicResponseMap['private/get_settlement_history_by_currency']
  > {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/get_settlement_history_by_currency',
      params,
    );
  }

  /** private/get_settlement_history_by_instrument */
  getSettlementHistoryByInstrument(
    params: WsAPITopicRequestParamMap['private/get_settlement_history_by_instrument'],
  ): Promise<
    WsAPITopicResponseMap['private/get_settlement_history_by_instrument']
  > {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/get_settlement_history_by_instrument',
      params,
    );
  }

  /** private/simulate_portfolio */
  simulatePortfolio(
    params: WsAPITopicRequestParamMap['private/simulate_portfolio'],
  ): Promise<WsAPITopicResponseMap['private/simulate_portfolio']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/simulate_portfolio',
      params,
    );
  }

  /** private/pme/simulate */
  simulatePme(
    params: WsAPITopicRequestParamMap['private/pme/simulate'],
  ): Promise<WsAPITopicResponseMap['private/pme/simulate']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/pme/simulate',
      params,
    );
  }

  /** private/enable_cancel_on_disconnect */
  enableCancelOnDisconnect(
    params?: WsAPITopicRequestParamMap['private/enable_cancel_on_disconnect'],
  ): Promise<WsAPITopicResponseMap['private/enable_cancel_on_disconnect']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/enable_cancel_on_disconnect',
      params,
    );
  }

  /** private/disable_cancel_on_disconnect */
  disableCancelOnDisconnect(
    params?: WsAPITopicRequestParamMap['private/disable_cancel_on_disconnect'],
  ): Promise<WsAPITopicResponseMap['private/disable_cancel_on_disconnect']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/disable_cancel_on_disconnect',
      params,
    );
  }

  /** private/get_cancel_on_disconnect */
  getCancelOnDisconnect(
    params?: WsAPITopicRequestParamMap['private/get_cancel_on_disconnect'],
  ): Promise<WsAPITopicResponseMap['private/get_cancel_on_disconnect']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/get_cancel_on_disconnect',
      params,
    );
  }

  /** private/create_combo */
  createCombo(
    params: WsAPITopicRequestParamMap['private/create_combo'],
  ): Promise<WsAPITopicResponseMap['private/create_combo']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/create_combo',
      params,
    );
  }

  /** private/get_leg_prices */
  getLegPrices(
    params: WsAPITopicRequestParamMap['private/get_leg_prices'],
  ): Promise<WsAPITopicResponseMap['private/get_leg_prices']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/get_leg_prices',
      params,
    );
  }

  /** public/tickers_by_currency */
  getTickersByCurrency(
    params: WsAPITopicRequestParamMap['public/tickers_by_currency'],
  ): Promise<WsAPITopicResponseMap['public/tickers_by_currency']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'public/tickers_by_currency',
      params,
    );
  }

  /** private/get_leverage */
  getLeverage(
    params?: WsAPITopicRequestParamMap['private/get_leverage'],
  ): Promise<WsAPITopicResponseMap['private/get_leverage']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/get_leverage',
      params,
    );
  }

  /** private/set_leverage */
  setLeverage(
    params: WsAPITopicRequestParamMap['private/set_leverage'],
  ): Promise<WsAPITopicResponseMap['private/set_leverage']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/set_leverage',
      params,
    );
  }

  /** private/get_max_order_size */
  getMaxOrderSize(
    params: WsAPITopicRequestParamMap['private/get_max_order_size'],
  ): Promise<WsAPITopicResponseMap['private/get_max_order_size']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/get_max_order_size',
      params,
    );
  }

  /** private/get_pme_params */
  getPmeParams(
    params: WsAPITopicRequestParamMap['private/get_pme_params'],
  ): Promise<WsAPITopicResponseMap['private/get_pme_params']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/get_pme_params',
      params,
    );
  }

  /** private/get_risk_profile */
  getRiskProfile(): Promise<WsAPITopicResponseMap['private/get_risk_profile']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/get_risk_profile',
    );
  }

  /** private/get_subaccounts */
  getSubaccounts(
    params?: WsAPITopicRequestParamMap['private/get_subaccounts'],
  ): Promise<WsAPITopicResponseMap['private/get_subaccounts']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/get_subaccounts',
      params,
    );
  }

  /** private/get_subaccounts_details */
  getSubaccountsDetails(
    params: WsAPITopicRequestParamMap['private/get_subaccounts_details'],
  ): Promise<WsAPITopicResponseMap['private/get_subaccounts_details']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/get_subaccounts_details',
      params,
    );
  }

  /** private/get_trading_limits */
  getTradingLimits(
    params: WsAPITopicRequestParamMap['private/get_trading_limits'],
  ): Promise<WsAPITopicResponseMap['private/get_trading_limits']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/get_trading_limits',
      params,
    );
  }

  /** private/get_user_locks */
  getUserLocks(): Promise<WsAPITopicResponseMap['private/get_user_locks']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/get_user_locks',
    );
  }

  /** private/submit_transfer_between_subaccounts */
  submitTransferBetweenSubaccounts(
    params: WsAPITopicRequestParamMap['private/submit_transfer_between_subaccounts'],
  ): Promise<
    WsAPITopicResponseMap['private/submit_transfer_between_subaccounts']
  > {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/submit_transfer_between_subaccounts',
      params,
    );
  }

  /** public/set_heartbeat */
  setHeartbeat(
    params: WsAPITopicRequestParamMap['public/set_heartbeat'],
  ): Promise<WsAPITopicResponseMap['public/set_heartbeat']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'public/set_heartbeat',
      params,
    );
  }

  /** public/disable_heartbeat */
  disableHeartbeat(): Promise<
    WsAPITopicResponseMap['public/disable_heartbeat']
  > {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'public/disable_heartbeat',
    );
  }

  /** public/hello */
  hello(
    params: WsAPITopicRequestParamMap['public/hello'],
  ): Promise<WsAPITopicResponseMap['public/hello']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'public/hello',
      params,
    );
  }

  /** private/logout. Resolves on the server close; prevents automatic reconnect. */
  logout(
    params?: WsAPITopicRequestParamMap['private/logout'],
  ): Promise<WsAPITopicResponseMap['private/logout']> {
    return this.wsClient.sendWSAPIRequest(
      WS_KEY_MAP.advTradeGlobalWSAPI,
      'private/logout',
      params,
    );
  }

  private setupDefaultEventListeners() {
    this.wsClient
      .on('open', ({ wsKey }) => console.log(new Date(), 'ws connected', wsKey))
      .on('reconnect', ({ wsKey }) =>
        console.log(new Date(), 'ws reconnecting', wsKey),
      )
      .on('reconnected', ({ wsKey }) =>
        console.log(new Date(), 'ws reconnected', wsKey),
      )
      .on('authenticated', ({ wsKey }) =>
        console.log(new Date(), 'ws authenticated', wsKey),
      )
      .on('exception', (event) =>
        console.error(new Date(), 'ws exception:', event),
      );
  }
}
