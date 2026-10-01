import { AxiosRequestConfig } from 'axios';

import { BaseRestClient } from './lib/BaseRestClient.js';
import {
  REST_CLIENT_TYPE_ENUM,
  RestClientOptions,
  RestClientType,
} from './lib/requestUtils.js';
import {
  AdvTradeGlobalAuthRequest,
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
} from './types/request/advanced-trade-global-client.js';
import {
  AdvTradeGlobalAccessLog,
  AdvTradeGlobalAuthResult,
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
  AdvTradeGlobalOrder,
  AdvTradeGlobalOrderIdInitialMarginPair,
  AdvTradeGlobalPositionWithOpenOrdersMargin,
  AdvTradeGlobalSellResult,
  AdvTradeGlobalSimulatePmeResult,
  AdvTradeGlobalSimulatePortfolioResult,
  AdvTradeGlobalTestResult,
  AdvTradeGlobalTickerNotification,
  AdvTradeGlobalTickerNotificationWithBidsAndAsks,
  AdvTradeGlobalTradesVolumes,
  AdvTradeGlobalUserTrade,
} from './types/response/advanced-trade-global-client.js';

/**
 * REST client for Coinbase's Global Derivatives Advanced Trade API:
 * https://docs.cdp.coinbase.com/coinbase-app/advanced-trade-apis/guides/derivatives/overview
 *
 * Deribit-powered gateway running on the Starbase platform.
 * JSON-RPC 2.0 at https://drb.coinbase.com/api/v2
 *
 * Parameters and responses are not the Advanced Trade REST shapes.
 * Prices and sizes are JSON numbers. instrument_name replaces the old product id
 * (BTC-PERP-INTX becomes BTC_USDC-PERPETUAL). label replaces client_order_id and is
 * not unique. Order type, time in force, and status are lowercase.
 * call() returns the JSON-RPC result and throws the JSON-RPC error.
 */
export class CBAdvancedTradeGlobalClient extends BaseRestClient {
  constructor(
    restClientOptions: RestClientOptions = {},
    requestOptions: AxiosRequestConfig = {},
  ) {
    super(restClientOptions, requestOptions);
    return this;
  }

  getClientType(): RestClientType {
    return REST_CLIENT_TYPE_ENUM.advancedTradeGlobal;
  }

  private rpcId = 0;

  /**
   * JSON-RPC POST to /api/v2. Public methods use post, private methods use postPrivate.
   * Returns the result field. Throws the JSON-RPC error object on error.
   */
  private call(method: string, params?: object): Promise<any> {
    const body: {
      jsonrpc: '2.0';
      id: number;
      method: string;
      params?: object;
    } = {
      jsonrpc: '2.0',
      id: ++this.rpcId,
      method,
    };

    if (params) {
      const cleaned: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(params)) {
        if (typeof value !== 'undefined') {
          cleaned[key] = value;
        }
      }
      if (Object.keys(cleaned).length > 0) {
        body.params = cleaned;
      }
    }

    const pending = method.startsWith('public/')
      ? this.post('/api/v2', { body })
      : this.postPrivate('/api/v2', { body });

    return pending.then((response: any) => {
      if (response?.error) {
        throw response.error;
      }
      return response?.result;
    });
  }

  /**
   *
   * Public
   *
   */

  /**
   * Auth
   *
   * Authenticate using a Coinbase-issued credential. Only POST is supported. Send the
   * JSON-RPC request in the request body; query-string credentials are not accepted.
   *
   * JSON-RPC: public/auth
   */
  auth(params?: AdvTradeGlobalAuthRequest): Promise<AdvTradeGlobalAuthResult> {
    return this.call('public/auth', params);
  }

  /**
   * Get Announcements
   *
   * Retrieves platform announcements and important notices. Announcements include
   * system updates, maintenance schedules, new features, policy changes, and other
   * important information. Results are returned in reverse chronological order (newest
   * first). The default start_timestamp is the current time, and the count parameter
   * must be between 1 and 50 (default is 5).
   *
   * JSON-RPC: public/get_announcements
   */
  getAnnouncements(
    params?: AdvTradeGlobalGetAnnouncementsRequest,
  ): Promise<AdvTradeGlobalGetAnnouncementsItem[]> {
    return this.call('public/get_announcements', params);
  }

  /**
   * Get Block RFQ Trades
   *
   * Public Block RFQ trades.
   *
   * Request parameters are not in the published OpenAPI spec yet.
   *
   * JSON-RPC: public/get_block_rfq_trades
   */
  getBlockRfqTrades(params?: any): Promise<any> {
    return this.call('public/get_block_rfq_trades', params);
  }

  /**
   * Get Book Summary By Currency
   *
   * Retrieves summary information such as open interest, 24-hour volume, best bid/ask
   * prices, last trade price, and other market statistics for all instruments in a
   * given currency. Results can be filtered by instrument kind (future, option, etc.).
   * This method provides a quick overview of market activity across all instruments for
   * a currency. Note: For real-time updates, we recommend using the WebSocket
   * subscription to ticker.{instrument_name}.{interval} instead of polling this
   * endpoint.
   *
   * JSON-RPC: public/get_book_summary_by_currency
   */
  getBookSummaryByCurrency(
    params: AdvTradeGlobalGetBookSummaryByCurrencyRequest,
  ): Promise<AdvTradeGlobalBookSummary[]> {
    return this.call('public/get_book_summary_by_currency', params);
  }

  /**
   * Get Book Summary By Instrument
   *
   * Retrieves summary information such as open interest, 24-hour volume, best bid/ask
   * prices, last trade price, mark price, and other market statistics for a specific
   * instrument. This method provides a quick overview of current market activity and
   * liquidity for a single instrument.
   *
   * JSON-RPC: public/get_book_summary_by_instrument
   */
  getBookSummaryByInstrument(
    params: AdvTradeGlobalGetBookSummaryByInstrumentRequest,
  ): Promise<AdvTradeGlobalBookSummary[]> {
    return this.call('public/get_book_summary_by_instrument', params);
  }

  /**
   * Get Combo Details
   *
   * Retrieves detailed information about a specific combo, including its leg structure,
   * state, and other properties. Use public/get_combo_ids to get a list of available
   * combo IDs.
   *
   * JSON-RPC: public/get_combo_details
   */
  getComboDetails(
    params: AdvTradeGlobalGetComboDetailsRequest,
  ): Promise<AdvTradeGlobalCombo> {
    return this.call('public/get_combo_details', params);
  }

  /**
   * Get Combo Ids
   *
   * Retrieves available combo IDs. This method can be used to get the list of all
   * combos, or only the list of combos in the given state. Use public/get_combo_details
   * to retrieve detailed information about a specific combo.
   *
   * JSON-RPC: public/get_combo_ids
   */
  getComboIds(params: AdvTradeGlobalGetComboIdsRequest): Promise<string[]> {
    return this.call('public/get_combo_ids', params);
  }

  /**
   * Get Combos
   *
   * Retrieves information about active combos for the specified currency. Returns
   * detailed information including leg structures and combo properties. For a list of
   * combo IDs only, use public/get_combo_ids. For details about a specific combo, use
   * public/get_combo_details.
   *
   * JSON-RPC: public/get_combos
   */
  getCombos(
    params: AdvTradeGlobalGetCombosRequest,
  ): Promise<AdvTradeGlobalCombo[]> {
    return this.call('public/get_combos', params);
  }

  /**
   * Get Contract Size
   *
   * Retrieves the contract size (also known as contract multiplier) for a given
   * instrument. The contract size is the value of one contract, expressed in the same
   * unit as the order amount: USD for inverse (reversed) futures and perpetuals, and
   * the base currency coin for options, spots, and linear futures and perpetuals. This
   * value is essential for calculating position values, margin requirements, and P&L
   * calculations. Different instruments may have different contract sizes.
   *
   * JSON-RPC: public/get_contract_size
   */
  getContractSize(
    params: AdvTradeGlobalGetContractSizeRequest,
  ): Promise<AdvTradeGlobalGetContractSizeResult> {
    return this.call('public/get_contract_size', params);
  }

  /**
   * Get Currencies
   *
   * Retrieves all cryptocurrencies supported by the Deribit API. Returns a list of
   * available currencies with their codes and basic information. This method takes no
   * parameters and is useful for discovering which currencies are available for trading
   * on the platform.
   *
   * JSON-RPC: public/get_currencies
   */
  getCurrencies(): Promise<AdvTradeGlobalCurrencyWithApr[]> {
    return this.call('public/get_currencies');
  }

  /**
   * Get Delivery Prices
   *
   * Retrieves historical delivery prices for a given index. Delivery prices are the
   * settlement prices used when futures or options contracts expire and are settled.
   * Results can be paginated using the offset and count parameters. This method is
   * useful for analyzing historical settlement prices and understanding how contracts
   * have been settled over time.
   *
   * JSON-RPC: public/get_delivery_prices
   */
  getDeliveryPrices(
    params: AdvTradeGlobalGetDeliveryPricesRequest,
  ): Promise<AdvTradeGlobalGetDeliveryPricesResult> {
    return this.call('public/get_delivery_prices', params);
  }

  /**
   * Get Expirations
   *
   * Retrieves all available expiration timestamps for instruments. This method can be
   * used to discover which expiration dates are available for trading, which is useful
   * for finding instruments with specific expiration dates. Results can be filtered by
   * settlement currency, instrument kind (future or option), and currency pair. The
   * response includes expiration timestamps in milliseconds since the UNIX epoch.
   *
   * JSON-RPC: public/get_expirations
   */
  getExpirations(
    params: AdvTradeGlobalGetExpirationsRequest,
  ): Promise<AdvTradeGlobalExpirations[]> {
    return this.call('public/get_expirations', params);
  }

  /**
   * Get Funding Chart Data
   *
   * Retrieves funding rate chart data points for a PERPETUAL instrument within a given
   * time period. The data is formatted for use in charting applications and includes
   * funding rate values at regular intervals. Use the length parameter to specify the
   * time period for which to retrieve chart data. This method is useful for visualizing
   * funding rate trends over time.
   *
   * JSON-RPC: public/get_funding_chart_data
   */
  getFundingChartData(
    params: AdvTradeGlobalGetFundingChartDataRequest,
  ): Promise<AdvTradeGlobalGetFundingChartDataResult> {
    return this.call('public/get_funding_chart_data', params);
  }

  /**
   * Get Funding Rate History
   *
   * Retrieves hourly historical funding rate (interest rate) data for a PERPETUAL
   * instrument over a specified time period. Funding rates are periodic payments
   * exchanged between long and short positions in perpetual contracts. The response
   * includes hourly funding rate values, which can be used to analyze funding rate
   * trends and calculate historical funding costs. This method is applicable only for
   * PERPETUAL instruments.
   *
   * JSON-RPC: public/get_funding_rate_history
   */
  getFundingRateHistory(
    params: AdvTradeGlobalGetFundingRateHistoryRequest,
  ): Promise<AdvTradeGlobalGetFundingRateHistoryItem[]> {
    return this.call('public/get_funding_rate_history', params);
  }

  /**
   * Get Funding Rate Value
   *
   * Retrieves the funding rate (interest rate) value for a perpetual instrument over a
   * specified time period. Funding rates are periodic payments exchanged between long
   * and short positions in perpetual contracts. This method is applicable only for
   * PERPETUAL instruments. The funding rate is typically expressed as a percentage and
   * is used to keep the perpetual contract price aligned with the underlying index
   * price.
   *
   * JSON-RPC: public/get_funding_rate_value
   */
  getFundingRateValue(
    params: AdvTradeGlobalGetFundingRateValueRequest,
  ): Promise<number> {
    return this.call('public/get_funding_rate_value', params);
  }

  /**
   * Get Historical Volatility
   *
   * Provides historical volatility data for a given cryptocurrency. Historical
   * volatility measures the degree of price variation over a past period and is useful
   * for risk assessment and option pricing. The response includes volatility statistics
   * calculated from historical price movements. This data can be used for portfolio
   * risk analysis and understanding market conditions.
   *
   * JSON-RPC: public/get_historical_volatility
   */
  getHistoricalVolatility(
    params: AdvTradeGlobalGetHistoricalVolatilityRequest,
  ): Promise<AdvTradeGlobalGetHistoricalVolatilityItem[]> {
    return this.call('public/get_historical_volatility', params);
  }

  /**
   * Get Index Chart Data
   *
   * Returns historical price index chart data for the specified index name and time
   * range. The data is formatted for use in charting applications and shows price index
   * values over time. Use the range parameter to specify the time period for which to
   * retrieve chart data. This method is useful for visualizing price index trends and
   * historical movements.
   *
   * JSON-RPC: public/get_index_chart_data
   */
  getIndexChartData(
    params: AdvTradeGlobalGetIndexChartDataRequest,
  ): Promise<number[][]> {
    return this.call('public/get_index_chart_data', params);
  }

  /**
   * Get Index Price
   *
   * Retrieves the current index price value for a given index name. Index prices are
   * used as reference prices for mark price calculations and settlement. Use
   * get_index_price_names or get_supported_index_names to retrieve available index
   * names.
   *
   * JSON-RPC: public/get_index_price
   */
  getIndexPrice(
    params: AdvTradeGlobalGetIndexPriceRequest,
  ): Promise<AdvTradeGlobalGetIndexPriceResult> {
    return this.call('public/get_index_price', params);
  }

  /**
   * Get Index Price Names
   *
   * Retrieves the identifiers (names) of all supported price indexes. Price indexes are
   * reference prices used for mark price calculations, settlement, and other market
   * operations. When the extended parameter is set to true, the response includes
   * additional information such as whether future combo creation and option combo
   * creation are enabled for each index.
   *
   * JSON-RPC: public/get_index_price_names
   */
  getIndexPriceNames(
    params?: AdvTradeGlobalGetIndexPriceNamesRequest,
  ): Promise<AdvTradeGlobalGetIndexPriceNamesItem[]> {
    return this.call('public/get_index_price_names', params);
  }

  /**
   * Get Instrument
   *
   * Retrieves detailed information about a specific instrument, including instrument
   * specifications, contract details, tick size, settlement currency, expiration date
   * (for futures and options), strike price (for options), underlying type, and other
   * instrument parameters. This method is useful for obtaining instrument metadata
   * needed for trading operations and calculations.
   *
   * JSON-RPC: public/get_instrument
   */
  getInstrument(
    params: AdvTradeGlobalGetInstrumentRequest,
  ): Promise<AdvTradeGlobalInstrument> {
    return this.call('public/get_instrument', params);
  }

  /**
   * Get Instruments
   *
   * Retrieves available trading instruments. This method can be used to see which
   * instruments are available for trading, or which instruments have recently expired.
   * Note - This method has distinct API rate limiting requirements: Sustained rate: 1
   * request/second. To avoid rate limits, we recommend using either the REST requests
   * for server-cached data or the WebSocket subscription to
   * instrument_state.{kind}.{currency} for real-time updates. For more information, see
   * Rate Limits. Results can be filtered by currency and instrument kind (future,
   * option, etc.). Set the expired parameter to true to retrieve recently expired
   * instruments instead of active ones. Each instrument includes the underlying_type
   * field indicating the underlying asset class (such as crypto, equity, or commodity).
   *
   * Replaces GET /products
   *
   * JSON-RPC: public/get_instruments
   */
  getInstruments(
    params: AdvTradeGlobalGetInstrumentsRequest,
  ): Promise<AdvTradeGlobalInstrument[]> {
    return this.call('public/get_instruments', params);
  }

  /**
   * Get Last Settlements By Currency
   *
   * Retrieves historical settlement, delivery, and bankruptcy events from all
   * instruments within a given currency. Settlement vs. delivery: Settlement is a daily
   * event (at 08:00 UTC) for futures and perpetual positions that converts unrealized
   * profit and loss into realized profit and loss. Option positions do not settle.
   * Delivery is a one-time event that occurs when a futures or options contract expires
   * - any remaining open position is closed at the delivery price. Delivery does not
   * apply to perpetual or spot instruments. Both events take place at 08:00 UTC, which
   * is why they are sometimes conflated. Results can be filtered by settlement type and
   * timestamp. Use pagination parameters (count and continuation) to retrieve large
   * settlement histories. This data is useful for analyzing historical contract
   * settlements and understanding market events. Note on profit_loss and
   * session_profit_loss: Because this is a public endpoint, these fields are
   * platform-wide aggregates, not per-account values. profit_loss is the sum of
   * realized P&L of all position holders at the settlement price. session_profit_loss
   * is the sum of each holder's total session P&L (realized + unrealized) across all
   * participants.
   *
   * JSON-RPC: public/get_last_settlements_by_currency
   */
  getLastSettlementsByCurrency(
    params: AdvTradeGlobalGetLastSettlementsByCurrencyRequest,
  ): Promise<AdvTradeGlobalGetLastSettlementsByCurrencyResult> {
    return this.call('public/get_last_settlements_by_currency', params);
  }

  /**
   * Get Last Settlements By Instrument
   *
   * Retrieves historical settlement, delivery, and bankruptcy events for a specific
   * instrument. Settlement vs. delivery: Settlement is a daily event (at 08:00 UTC) for
   * futures and perpetual positions that converts unrealized profit and loss into
   * realized profit and loss. Option positions do not settle. Delivery is a one-time
   * event that occurs when a futures or options contract expires - any remaining open
   * position is closed at the delivery price. Delivery does not apply to perpetual or
   * spot instruments. Both events take place at 08:00 UTC, which is why they are
   * sometimes conflated. Results can be filtered by settlement type and timestamp. Use
   * pagination parameters (count and continuation) to retrieve large settlement
   * histories. This method is useful for tracking settlement history for a specific
   * instrument. Note on profit_loss and session_profit_loss: Because this is a public
   * endpoint, these fields are platform-wide aggregates, not per-account values.
   * profit_loss is the sum of realized P&L of all position holders at the settlement
   * price. session_profit_loss is the sum of each holder's total session P&L (realized
   * + unrealized) across all participants.
   *
   * JSON-RPC: public/get_last_settlements_by_instrument
   */
  getLastSettlementsByInstrument(
    params: AdvTradeGlobalGetLastSettlementsByInstrumentRequest,
  ): Promise<AdvTradeGlobalGetLastSettlementsByInstrumentResult> {
    return this.call('public/get_last_settlements_by_instrument', params);
  }

  /**
   * Get Last Trades By Currency
   *
   * Retrieves the latest trades that have occurred for instruments in a specific
   * currency. Returns trade details including price, amount, direction, timestamp, and
   * trade ID for all instruments in the currency. Results can be filtered by instrument
   * kind and trade ID range or timestamp range. Use the count parameter to limit the
   * number of trades returned, and sorting to control the order (ascending or
   * descending by trade ID). Note: For currencies with spot instruments routed to
   * Coinbase Exchange, this call is not supported when kind is spot or any - and any is
   * the default when kind is omitted. A currency counts as routed when it is the base
   * or the quote of a routed pair. Other kinds are unaffected. Use Get product trades
   * directly for full trade history by instrument.
   *
   * JSON-RPC: public/get_last_trades_by_currency
   */
  getLastTradesByCurrency(
    params: AdvTradeGlobalGetLastTradesByCurrencyRequest,
  ): Promise<AdvTradeGlobalGetLastTradesByCurrencyResult> {
    return this.call('public/get_last_trades_by_currency', params);
  }

  /**
   * Get Last Trades By Currency And Time
   *
   * Retrieves the latest trades that have occurred for instruments in a specific
   * currency within a specified time range. Returns trade details including price,
   * amount, direction, timestamp, and trade ID. Results can be filtered by instrument
   * kind. Use the count parameter to limit the number of trades returned, and sorting
   * to control the order (ascending or descending by trade ID). Note: For currencies
   * with spot instruments routed to Coinbase Exchange, this call is not supported when
   * kind is spot or any - and any is the default when kind is omitted. A currency
   * counts as routed when it is the base or the quote of a routed pair. Other kinds are
   * unaffected. Use Get product trades directly for full trade history by instrument.
   *
   * JSON-RPC: public/get_last_trades_by_currency_and_time
   */
  getLastTradesByCurrencyAndTime(
    params: AdvTradeGlobalGetLastTradesByCurrencyAndTimeRequest,
  ): Promise<AdvTradeGlobalGetLastTradesByCurrencyAndTimeResult> {
    return this.call('public/get_last_trades_by_currency_and_time', params);
  }

  /**
   * Get Last Trades By Instrument
   *
   * Retrieves the latest trades that have occurred for a specific instrument. Returns
   * trade details including price, amount, direction, timestamp, and trade ID. Results
   * can be filtered by sequence number range or timestamp range. Use the count
   * parameter to limit the number of trades returned, and sorting to control the order
   * (ascending or descending by trade ID). Note: For spot instruments routed to
   * Coinbase Exchange, this call is not supported. Use Get product trades directly for
   * full trade history.
   *
   * JSON-RPC: public/get_last_trades_by_instrument
   */
  getLastTradesByInstrument(
    params: AdvTradeGlobalGetLastTradesByInstrumentRequest,
  ): Promise<AdvTradeGlobalGetLastTradesByInstrumentResult> {
    return this.call('public/get_last_trades_by_instrument', params);
  }

  /**
   * Get Last Trades By Instrument And Time
   *
   * Retrieves the latest trades that have occurred for a specific instrument within a
   * specified time range. Returns trade details including price, amount, direction,
   * timestamp, and trade ID. Use the count parameter to limit the number of trades
   * returned, and sorting to control the order (ascending or descending by trade ID).
   * This method is useful for analyzing trading activity over specific time periods.
   * Note: For spot instruments routed to Coinbase Exchange, this call is not supported.
   * Use Get product trades directly for full trade history.
   *
   * JSON-RPC: public/get_last_trades_by_instrument_and_time
   */
  getLastTradesByInstrumentAndTime(
    params: AdvTradeGlobalGetLastTradesByInstrumentAndTimeRequest,
  ): Promise<AdvTradeGlobalGetLastTradesByInstrumentAndTimeResult> {
    return this.call('public/get_last_trades_by_instrument_and_time', params);
  }

  /**
   * Get Mark Price History
   *
   * Retrieves 5-minute historical mark price data for an instrument. Mark prices are
   * used for margin calculations and position valuations. Note: Currently, mark price
   * history is available only for a subset of options that participate in volatility
   * index calculations. All other instruments, including futures and perpetuals, will
   * return an empty list.
   *
   * JSON-RPC: public/get_mark_price_history
   */
  getMarkPriceHistory(
    params: AdvTradeGlobalGetMarkPriceHistoryRequest,
  ): Promise<number[][]> {
    return this.call('public/get_mark_price_history', params);
  }

  /**
   * Get Order Book
   *
   * Retrieves the order book (bids and asks) for a given instrument, along with other
   * market values such as best bid/ask prices, last trade price, mark price, and index
   * price. The order book depth can be controlled using the depth parameter, which
   * accepts values from 1 to 10000. The response includes price levels sorted by price
   * (bids descending, asks ascending).
   *
   * Replaces GET /product_book
   *
   * JSON-RPC: public/get_order_book
   */
  getOrderBook(
    params: AdvTradeGlobalGetOrderBookRequest,
  ): Promise<AdvTradeGlobalTickerNotificationWithBidsAndAsks> {
    return this.call('public/get_order_book', params);
  }

  /**
   * Get Order Book By Instrument Id
   *
   * Retrieves the order book (bids and asks) for a given instrument ID, along with
   * other market values such as best bid/ask prices, last trade price, mark price, and
   * index price. This method is similar to get_order_book but uses instrument ID
   * instead of instrument name. The order book depth can be controlled using the depth
   * parameter, which accepts values from 1 to 10000.
   *
   * JSON-RPC: public/get_order_book_by_instrument_id
   */
  getOrderBookByInstrumentId(
    params: AdvTradeGlobalGetOrderBookByInstrumentIdRequest,
  ): Promise<AdvTradeGlobalTickerNotificationWithBidsAndAsks> {
    return this.call('public/get_order_book_by_instrument_id', params);
  }

  /**
   * Get Supported Index Names
   *
   * Retrieves the identifiers (names) of all supported price indexes, optionally
   * filtered by index type. Price indexes are reference prices used for mark price
   * calculations, settlement, and other market operations. Use the type parameter to
   * filter indexes by type (e.g., spot, futures, etc.). This method helps discover
   * available indexes for use with other API methods.
   *
   * JSON-RPC: public/get_supported_index_names
   */
  getSupportedIndexNames(
    params?: AdvTradeGlobalGetSupportedIndexNamesRequest,
  ): Promise<AdvTradeGlobalGetSupportedIndexNamesItem[]> {
    return this.call('public/get_supported_index_names', params);
  }

  /**
   * Get Time
   *
   * Retrieves the current time (in milliseconds). This API endpoint can be used to
   * check the clock skew between your software and Deribit's systems.
   *
   * JSON-RPC: public/get_time
   */
  getTime(): Promise<number> {
    return this.call('public/get_time');
  }

  /**
   * Get Trade Volumes
   *
   * Retrieves aggregated 24-hour trade volumes for different instrument types and
   * currencies. The volume statistics include all executed trades across the platform.
   * Note: Position moves are not included in this volume. Block trades and Block RFQ
   * trades are included in the volume calculations. Use the extended parameter to
   * include additional volume statistics and breakdowns. Note: For currencies with spot
   * instruments routed to Coinbase Exchange, spot_volume is omitted, as are
   * spot_volume_7d and spot_volume_30d when extended is used. Use Get all product
   * volume for venue spot volume.
   *
   * JSON-RPC: public/get_trade_volumes
   */
  getTradeVolumes(
    params?: AdvTradeGlobalGetTradeVolumesRequest,
  ): Promise<AdvTradeGlobalTradesVolumes[]> {
    return this.call('public/get_trade_volumes', params);
  }

  /**
   * Get Tradingview Chart Data
   *
   * Retrieves publicly available market data formatted for generating
   * TradingView-compatible candle charts. The data includes open, high, low, close
   * (OHLC) prices and volume for specified time intervals. Use the chart_resolution
   * parameter to specify the candle interval (e.g., 1m, 5m, 1h, 1d). This method
   * provides the standard format used by TradingView and other charting platforms.
   * Note: For spot instruments routed to Coinbase Exchange, this call is not supported.
   * Use Get product candles instead.
   *
   * Replaces GET /products/{product_id}/candles
   *
   * JSON-RPC: public/get_tradingview_chart_data
   */
  getTradingviewChartData(
    params: AdvTradeGlobalGetTradingviewChartDataRequest,
  ): Promise<AdvTradeGlobalGetTradingviewChartDataResult> {
    return this.call('public/get_tradingview_chart_data', params);
  }

  /**
   * Get Volatility Index Data
   *
   * Retrieves volatility index (VIX) chart data formatted as candles. Volatility
   * indexes measure market expectations of future volatility and are useful for risk
   * assessment and trading strategies. Use the vix_resolution parameter to specify the
   * candle interval. The data shows historical volatility index values over time and is
   * formatted for use in charting applications.
   *
   * JSON-RPC: public/get_volatility_index_data
   */
  getVolatilityIndexData(
    params: AdvTradeGlobalGetVolatilityIndexDataRequest,
  ): Promise<AdvTradeGlobalGetVolatilityIndexDataResult> {
    return this.call('public/get_volatility_index_data', params);
  }

  /**
   * Get Status
   *
   * Method used to get information about locked currencies
   *
   * JSON-RPC: public/status
   */
  getStatus(): Promise<AdvTradeGlobalGetStatusResult> {
    return this.call('public/status');
  }

  /**
   * Test
   *
   * Tests the connection to the API server, and returns its version. You can use this
   * to make sure the API is reachable, and matches the expected version.
   *
   * JSON-RPC: public/test
   */
  testConnection(
    params?: AdvTradeGlobalTestRequest,
  ): Promise<AdvTradeGlobalTestResult> {
    return this.call('public/test', params);
  }

  /**
   * Get Ticker
   *
   * Retrieves the ticker (24-hour statistics) for a specific instrument. The ticker
   * includes the last trade price, best bid/ask prices, 24-hour high/low, 24-hour
   * volume, open interest, mark price, and other market statistics. This is a
   * lightweight method for getting current market data for a single instrument. For
   * real-time updates, consider using WebSocket subscriptions to ticker channels.
   *
   * Replaces GET /best_bid_ask
   *
   * JSON-RPC: public/ticker
   */
  getTicker(
    params: AdvTradeGlobalGetTickerRequest,
  ): Promise<AdvTradeGlobalTickerNotification> {
    return this.call('public/ticker', params);
  }

  /**
   *
   * Private
   *
   */

  /**
   * Buy
   *
   * Places a buy order for an instrument. Supports various order types including limit,
   * market, stop, and advanced order types (stop-limit, take-profit, take-profit-limit,
   * trailing-stop, etc.). You can specify order parameters such as price, quantity,
   * time-in-force, post-only, reduce-only, and trigger conditions. Orders can be
   * labeled for easier management and tracking. Note: For spot orders routed to
   * Coinbase Exchange, fills come back asynchronously. It is recommended to receive
   * fills from the user.trades channel.
   *
   * Replaces POST /orders. Side is the method.
   *
   * JSON-RPC: private/buy
   */
  submitBuy(
    params: AdvTradeGlobalPlaceOrderRequest,
  ): Promise<AdvTradeGlobalBuyResult> {
    this.validateOrderId(params, 'label', 64);
    return this.call('private/buy', params);
  }

  /**
   * Sell
   *
   * Places a sell order for an instrument. Supports various order types including
   * limit, market, stop, and advanced order types (stop-limit, take-profit,
   * take-profit-limit, trailing-stop, etc.). You can specify order parameters such as
   * price, quantity, time-in-force, post-only, reduce-only, and trigger conditions.
   * Orders can be labeled for easier management and tracking. Market Maker Protection
   * (MMP) can be enabled to prevent excessive quoting. Note: For spot orders routed to
   * Coinbase Exchange, fills come back asynchronously. It is recommended to receive
   * fills from the user.trades channel.
   *
   * Replaces POST /orders. Side is the method.
   *
   * JSON-RPC: private/sell
   */
  submitSell(
    params: AdvTradeGlobalPlaceOrderRequest,
  ): Promise<AdvTradeGlobalSellResult> {
    this.validateOrderId(params, 'label', 64);
    return this.call('private/sell', params);
  }

  /**
   * Edit
   *
   * Modifies an existing order by changing its price, amount, and/or other properties
   * such as time-in-force, post-only, reduce-only, trigger conditions, or advanced
   * order type. The order is identified by its order ID. Only open orders can be
   * edited. Changes take effect immediately and may result in the order being filled if
   * the new price matches the market. Note: For spot orders routed to Coinbase
   * Exchange, fills come back asynchronously. It is recommended to receive fills from
   * the user.trades channel.
   *
   * Replaces POST /orders/edit
   *
   * JSON-RPC: private/edit
   */
  updateOrder(
    params: AdvTradeGlobalEditRequest,
  ): Promise<AdvTradeGlobalEditResult> {
    return this.call('private/edit', params);
  }

  /**
   * Edit By Label
   *
   * Modifies an order identified by its label. This method works only when there is
   * exactly one open order with the specified label. You can change the order's price,
   * amount, and/or other properties such as time-in-force, post-only, reduce-only,
   * trigger conditions, or advanced order type. Changes take effect immediately. Note:
   * For spot orders routed to Coinbase Exchange, fills come back asynchronously. It is
   * recommended to receive fills from the user.trades channel.
   *
   * Replaces POST /orders/edit
   *
   * JSON-RPC: private/edit_by_label
   */
  updateOrderByLabel(
    params: AdvTradeGlobalEditByLabelRequest,
  ): Promise<AdvTradeGlobalEditByLabelResult> {
    return this.call('private/edit_by_label', params);
  }

  /**
   * Cancel
   *
   * Cancels a specific order identified by its order ID. The order must be open (not
   * yet filled or cancelled) to be cancelled successfully. Once cancelled, the order is
   * removed from the order book and cannot be restored. Any unfilled portion of the
   * order will be cancelled.
   *
   * Replaces POST /orders/batch_cancel
   *
   * JSON-RPC: private/cancel
   */
  cancelOrder(
    params: AdvTradeGlobalCancelRequest,
  ): Promise<AdvTradeGlobalOrder> {
    return this.call('private/cancel', params);
  }

  /**
   * Cancel By Label
   *
   * Cancels all orders (including trigger orders) that have a specific label. This is
   * useful for managing groups of related orders that share the same label. Orders can
   * be cancelled across all currencies or filtered to a specific currency. When
   * cancelling by currency, the currency queue is used for processing. Rate Limits:
   * When called without the currency parameter, this method is subject to cancel_all
   * rate limits. Different rate limit values may apply for per-currency cancels versus
   * calls without providing the currency parameter.
   *
   * Replaces POST /orders/batch_cancel
   *
   * JSON-RPC: private/cancel_by_label
   */
  cancelByLabel(params: AdvTradeGlobalCancelByLabelRequest): Promise<number> {
    return this.call('private/cancel_by_label', params);
  }

  /**
   * Cancel All
   *
   * Cancels all open orders and trigger orders for the authenticated account across all
   * currencies and instrument kinds. This is a bulk cancellation operation useful for
   * quickly clearing all active orders. Use the detailed parameter to receive a list of
   * all cancelled orders. The freeze_quotes parameter can be used to freeze quotes
   * instead of cancelling them. Note: This operation cannot be undone. All open orders
   * will be permanently cancelled.
   *
   * Replaces POST /orders/batch_cancel
   *
   * JSON-RPC: private/cancel_all
   */
  cancelAll(params?: AdvTradeGlobalCancelAllRequest): Promise<number> {
    return this.call('private/cancel_all', params);
  }

  /**
   * Cancel All By Currency
   *
   * Cancels all open orders for a specific currency. This is useful for quickly
   * clearing all orders across multiple instruments in a currency. Orders can be
   * optionally filtered by instrument kind (future, option, etc.) and/or order type
   * (limit, market, stop, etc.). Use the detailed parameter to receive a list of all
   * cancelled orders.
   *
   * Replaces POST /orders/batch_cancel
   *
   * JSON-RPC: private/cancel_all_by_currency
   */
  cancelAllByCurrency(
    params: AdvTradeGlobalCancelAllByCurrencyRequest,
  ): Promise<number> {
    return this.call('private/cancel_all_by_currency', params);
  }

  /**
   * Cancel All By Currency Pair
   *
   * Cancels all open orders for a specific currency pair. This is useful for quickly
   * clearing all orders across instruments in a currency pair. Orders can be optionally
   * filtered by instrument kind (future, option, etc.) and/or order type (limit,
   * market, stop, etc.). Use the detailed parameter to receive a list of all cancelled
   * orders.
   *
   * Replaces POST /orders/batch_cancel
   *
   * JSON-RPC: private/cancel_all_by_currency_pair
   */
  cancelAllByCurrencyPair(
    params: AdvTradeGlobalCancelAllByCurrencyPairRequest,
  ): Promise<number> {
    return this.call('private/cancel_all_by_currency_pair', params);
  }

  /**
   * Cancel All By Instrument
   *
   * Cancels all open orders for a specific instrument. This is useful for quickly
   * clearing all orders for a single instrument. Orders can be optionally filtered by
   * order type (limit, market, stop, etc.). Use the detailed parameter to receive a
   * list of all cancelled orders. The include_combos parameter can be used to include
   * combo orders in the cancellation.
   *
   * Replaces POST /orders/batch_cancel
   *
   * JSON-RPC: private/cancel_all_by_instrument
   */
  cancelAllByInstrument(
    params: AdvTradeGlobalCancelAllByInstrumentRequest,
  ): Promise<number> {
    return this.call('private/cancel_all_by_instrument', params);
  }

  /**
   * Cancel All By Kind Or Type
   *
   * Cancels all open orders in one or more currencies, optionally filtered by
   * instrument kind and/or order type. This provides flexible bulk cancellation across
   * multiple currencies. Specify one or more currencies, and optionally filter by
   * instrument kind (future, option, etc.) and/or order type (limit, market, stop,
   * etc.). Use the detailed parameter to receive a list of all cancelled orders.
   *
   * Replaces POST /orders/batch_cancel
   *
   * JSON-RPC: private/cancel_all_by_kind_or_type
   */
  cancelAllByKindOrType(
    params: AdvTradeGlobalCancelAllByKindOrTypeRequest,
  ): Promise<number> {
    return this.call('private/cancel_all_by_kind_or_type', params);
  }

  /**
   * Close Position
   *
   * Places a reduce-only order to close an existing position. Reduce-only orders can
   * only reduce or close a position; they cannot open a new position or increase an
   * existing one. You can specify whether to use a market or limit order. If using a
   * limit order, provide the price. The order will automatically be set to reduce-only
   * to ensure it only closes the position.
   *
   * Replaces POST /orders/close_position
   *
   * JSON-RPC: private/close_position
   */
  closePosition(
    params: AdvTradeGlobalClosePositionRequest,
  ): Promise<AdvTradeGlobalClosePositionResult> {
    return this.call('private/close_position', params);
  }

  /**
   * Get Open Orders
   *
   * Retrieves a list of all open orders for the authenticated account across all
   * currencies. Open orders are orders that have been placed but not yet filled or
   * cancelled. Results can be filtered by instrument kind and order type. This method
   * provides a comprehensive view of all active orders.
   *
   * JSON-RPC: private/get_open_orders
   */
  getOpenOrders(
    params?: AdvTradeGlobalGetOpenOrdersRequest,
  ): Promise<AdvTradeGlobalOrder[]> {
    return this.call('private/get_open_orders', params);
  }

  /**
   * Get Open Orders By Currency
   *
   * Retrieves a list of all open orders for a specific currency. Open orders are orders
   * that have been placed but not yet filled or cancelled. Results can be filtered by
   * instrument kind and order type. This method provides a view of all active orders
   * within a currency.
   *
   * JSON-RPC: private/get_open_orders_by_currency
   */
  getOpenOrdersByCurrency(
    params: AdvTradeGlobalGetOpenOrdersByCurrencyRequest,
  ): Promise<AdvTradeGlobalOrder[]> {
    return this.call('private/get_open_orders_by_currency', params);
  }

  /**
   * Get Open Orders By Instrument
   *
   * Retrieves a list of all open orders for a specific instrument. Open orders are
   * orders that have been placed but not yet filled or cancelled. Results can be
   * filtered by order type. This method is useful for checking active orders for a
   * particular instrument.
   *
   * JSON-RPC: private/get_open_orders_by_instrument
   */
  getOpenOrdersByInstrument(
    params: AdvTradeGlobalGetOpenOrdersByInstrumentRequest,
  ): Promise<AdvTradeGlobalOrder[]> {
    return this.call('private/get_open_orders_by_instrument', params);
  }

  /**
   * Get Open Orders By Label
   *
   * Retrieves a list of all open orders that have a specific label within a given
   * currency. This is useful for tracking and managing groups of related orders that
   * share the same label. Open orders are orders that have been placed but not yet
   * filled or cancelled. The label helps organize and identify related orders.
   *
   * JSON-RPC: private/get_open_orders_by_label
   */
  getOpenOrdersByLabel(
    params: AdvTradeGlobalGetOpenOrdersByLabelRequest,
  ): Promise<AdvTradeGlobalOrder[]> {
    return this.call('private/get_open_orders_by_label', params);
  }

  /**
   * Get Order State
   *
   * Retrieves the current state of an order identified by its order ID. The response
   * includes order details such as status (open, filled, cancelled), filled amount,
   * remaining amount, price, and other order properties. Important Note for Mass
   * Quotes: Quote orders are order-like structures that don't fully translate to normal
   * orders. When checking order state for quotes, the amount field represents the
   * remaining amount, not the original order amount. Note: This method does not support
   * the historical flag and only returns an order that closed within the last 30
   * minutes (same recency window as historical=false). For orders older than that, use
   * private/get_order_history_by_currency or private/get_order_history_by_instrument
   * with historical=true.
   *
   * Replaces GET /orders/historical/{order_id}
   *
   * JSON-RPC: private/get_order_state
   */
  getOrderState(
    params: AdvTradeGlobalGetOrderStateRequest,
  ): Promise<AdvTradeGlobalOrder> {
    return this.call('private/get_order_state', params);
  }

  /**
   * Get Order State By Label
   *
   * Retrieves the state of recent orders that have a specific label. This is useful for
   * tracking orders that share the same label, which is helpful for managing related
   * orders. Results are filtered by currency and label. The response includes order
   * details such as status, filled amount, remaining amount, and other order properties
   * for all orders with the specified label. Note: This method does not support the
   * historical flag and only returns orders that closed within the last 30 minutes
   * (same recency window as historical=false). This also applies to a trigger order and
   * the order it creates upon triggering - once either has been closed for more than 30
   * minutes, it will no longer appear here, even though the same label was carried over
   * between them. For orders older than that, use private/get_order_history_by_currency
   * or private/get_order_history_by_instrument with historical=true.
   *
   * JSON-RPC: private/get_order_state_by_label
   */
  getOrderStateByLabel(
    params: AdvTradeGlobalGetOrderStateByLabelRequest,
  ): Promise<AdvTradeGlobalOrder[]> {
    return this.call('private/get_order_state_by_label', params);
  }

  /**
   * Get Order History By Currency
   *
   * Retrieves the order history for a specific currency. The history includes orders
   * that have been partially or fully filled, as well as cancelled orders (if
   * include_unfilled_orders is set to true). Results can be filtered by instrument kind
   * and paginated using offset and count parameters, or using continuation tokens. Use
   * include_old_orders to include orders from before a certain date, and historical to
   * retrieve historical order data.
   *
   * Replaces GET /orders/historical/batch
   *
   * JSON-RPC: private/get_order_history_by_currency
   */
  getOrderHistoryByCurrency(
    params: AdvTradeGlobalGetOrderHistoryByCurrencyRequest,
  ): Promise<AdvTradeGlobalOrder[]> {
    return this.call('private/get_order_history_by_currency', params);
  }

  /**
   * Get Order History By Instrument
   *
   * Retrieves the order history for a specific instrument. The history includes orders
   * that have been partially or fully filled, as well as cancelled orders (if
   * include_unfilled_orders is set to true). Results can be paginated using offset and
   * count parameters, or using continuation tokens. Use include_old_orders to include
   * orders from before a certain date, and historical to retrieve historical order
   * data.
   *
   * Replaces GET /orders/historical/batch
   *
   * JSON-RPC: private/get_order_history_by_instrument
   */
  getOrderHistoryByInstrument(
    params: AdvTradeGlobalGetOrderHistoryByInstrumentRequest,
  ): Promise<AdvTradeGlobalOrder[]> {
    return this.call('private/get_order_history_by_instrument', params);
  }

  /**
   * Get Order Margin By Ids
   *
   * Retrieves the initial margin requirements for one or more orders identified by
   * their order IDs. Initial margin is the amount of funds required to open a position
   * with these orders. This method is useful for calculating margin requirements before
   * placing orders, helping to ensure sufficient funds are available.
   *
   * JSON-RPC: private/get_order_margin_by_ids
   */
  getOrderMarginByIds(
    params: AdvTradeGlobalGetOrderMarginByIdsRequest,
  ): Promise<AdvTradeGlobalOrderIdInitialMarginPair[]> {
    return this.call('private/get_order_margin_by_ids', params);
  }

  /**
   * Get Trigger Order History
   *
   * Retrieves a detailed log of all trigger orders (stop orders, take-profit orders,
   * etc.) for the authenticated account. The log includes trigger order creation,
   * activation, execution, and cancellation events. Results can be filtered by currency
   * and instrument name. Use pagination parameters (count and continuation) to retrieve
   * large trigger order histories. This is useful for tracking trigger order activity
   * and debugging trigger order behavior.
   *
   * JSON-RPC: private/get_trigger_order_history
   */
  getTriggerOrderHistory(
    params: AdvTradeGlobalGetTriggerOrderHistoryRequest,
  ): Promise<AdvTradeGlobalGetTriggerOrderHistoryResult> {
    return this.call('private/get_trigger_order_history', params);
  }

  /**
   * Get User Trades By Currency
   *
   * Retrieves the latest user trades that have occurred for instruments in a specific
   * currency. Returns trade details including price, amount, direction, timestamp,
   * trade ID, and order ID for all instruments in the currency. Results can be filtered
   * by instrument kind, trade ID range, or timestamp range. Use the count parameter to
   * limit the number of trades returned, and sorting to control the order. To retrieve
   * trades for a specific subaccount, use the subaccount_id parameter. Use historical
   * to retrieve historical trade data.
   *
   * Replaces GET /orders/historical/fills
   *
   * JSON-RPC: private/get_user_trades_by_currency
   */
  getUserTradesByCurrency(
    params: AdvTradeGlobalGetUserTradesByCurrencyRequest,
  ): Promise<AdvTradeGlobalGetUserTradesByCurrencyResult> {
    return this.call('private/get_user_trades_by_currency', params);
  }

  /**
   * Get User Trades By Currency And Time
   *
   * Retrieves the latest user trades that have occurred for instruments in a specific
   * currency within a specified time range. Returns trade details including price,
   * amount, direction, timestamp, trade ID, and order ID for all instruments in the
   * currency. Results can be filtered by instrument kind. Use the count parameter to
   * limit the number of trades returned, and sorting to control the order. Use
   * historical to retrieve historical trade data. This method is useful for analyzing
   * trading activity across a currency over specific time periods. Main accounts may
   * use the subaccount_id parameter to retrieve trade data for a specific subaccount
   * (requires mainaccount scope).
   *
   * Replaces GET /orders/historical/fills
   *
   * JSON-RPC: private/get_user_trades_by_currency_and_time
   */
  getUserTradesByCurrencyAndTime(
    params: AdvTradeGlobalGetUserTradesByCurrencyAndTimeRequest,
  ): Promise<AdvTradeGlobalGetUserTradesByCurrencyAndTimeResult> {
    return this.call('private/get_user_trades_by_currency_and_time', params);
  }

  /**
   * Get User Trades By Instrument
   *
   * Retrieves the latest user trades that have occurred for a specific instrument.
   * Returns trade details including price, amount, direction, timestamp, trade ID, and
   * order ID. Results can be filtered by sequence number range or timestamp range. Use
   * the count parameter to limit the number of trades returned, and sorting to control
   * the order (ascending or descending by trade ID). Use historical to retrieve
   * historical trade data. Main accounts may use the subaccount_id parameter to
   * retrieve trade data for a specific subaccount (requires mainaccount scope).
   *
   * Replaces GET /orders/historical/fills
   *
   * JSON-RPC: private/get_user_trades_by_instrument
   */
  getUserTradesByInstrument(
    params: AdvTradeGlobalGetUserTradesByInstrumentRequest,
  ): Promise<AdvTradeGlobalGetUserTradesByInstrumentResult> {
    return this.call('private/get_user_trades_by_instrument', params);
  }

  /**
   * Get User Trades By Instrument And Time
   *
   * Retrieves the latest user trades that have occurred for a specific instrument
   * within a specified time range. Returns trade details including price, amount,
   * direction, timestamp, trade ID, and order ID. Use the count parameter to limit the
   * number of trades returned, and sorting to control the order (ascending or
   * descending by trade ID). Use historical to retrieve historical trade data. This
   * method is useful for analyzing trading activity over specific time periods. Main
   * accounts may use the subaccount_id parameter to retrieve trade data for a specific
   * subaccount (requires mainaccount scope).
   *
   * Replaces GET /orders/historical/fills
   *
   * JSON-RPC: private/get_user_trades_by_instrument_and_time
   */
  getUserTradesByInstrumentAndTime(
    params: AdvTradeGlobalGetUserTradesByInstrumentAndTimeRequest,
  ): Promise<AdvTradeGlobalGetUserTradesByInstrumentAndTimeResult> {
    return this.call('private/get_user_trades_by_instrument_and_time', params);
  }

  /**
   * Get User Trades By Order
   *
   * Retrieves all trades that were executed from a specific order. When an order is
   * filled, it may result in multiple trades (partial fills). This method returns all
   * trades associated with a given order ID. Results can be sorted in ascending or
   * descending order by trade ID. Use historical to retrieve historical trade data.
   * This is useful for tracking how an order was filled and analyzing execution
   * quality. Main accounts may use the subaccount_id parameter to retrieve trade data
   * for a specific subaccount (requires mainaccount scope).
   *
   * Replaces GET /orders/historical/fills
   *
   * JSON-RPC: private/get_user_trades_by_order
   */
  getUserTradesByOrder(
    params: AdvTradeGlobalGetUserTradesByOrderRequest,
  ): Promise<AdvTradeGlobalUserTrade[]> {
    return this.call('private/get_user_trades_by_order', params);
  }

  /**
   * Get Margins
   *
   * Calculates margin requirements for a hypothetical order on a given instrument.
   * Returns initial margin and maintenance margin for the specified instrument,
   * quantity, and price. This method is useful for estimating margin requirements
   * before placing an order, helping to ensure sufficient funds are available and
   * understanding the margin impact of potential trades.
   *
   * JSON-RPC: private/get_margins
   */
  getMargins(
    params: AdvTradeGlobalGetMarginsRequest,
  ): Promise<AdvTradeGlobalGetMarginsResult> {
    return this.call('private/get_margins', params);
  }

  /**
   * Get Account Summaries
   *
   * Retrieves a per-currency list of account summaries for the authenticated user. Each
   * summary includes balance, equity, available funds, and margin information for each
   * currency. To retrieve summaries for a specific subaccount, use the subaccount_id
   * parameter. When the extended parameter is set to true, additional account details
   * such as account ID, username, email, and account type are included.
   *
   * JSON-RPC: private/get_account_summaries
   */
  getAccountSummaries(
    params?: AdvTradeGlobalGetAccountSummariesRequest,
  ): Promise<AdvTradeGlobalGetAccountSummariesResult> {
    return this.call('private/get_account_summaries', params);
  }

  /**
   * Get Account Summary
   *
   * Retrieves the account summary for a specific currency. The summary includes cash
   * balance, equity, margin_balance, available_funds, available_withdrawal_funds,
   * initial/maintenance margin, session and total PnL, options greeks, and related
   * fields. Key relationships (standard margin): equity = balance + futures session PnL
   * + options_value, margin_balance = equity - options_value, available_funds = max(0,
   * margin_balance - initial_margin). Under portfolio margin, margin_balance equals
   * equity. Session PnL fields reset at daily settlement; total_pl does not. To
   * retrieve the summary for a specific subaccount, use the subaccount_id parameter.
   * When the extended parameter is set to true, additional account details such as
   * account ID, username, email, and account type are included.
   *
   * Replaces GET /intx/portfolio/{portfolio_uuid}
   *
   * JSON-RPC: private/get_account_summary
   */
  getAccountSummary(
    params: AdvTradeGlobalGetAccountSummaryRequest,
  ): Promise<AdvTradeGlobalGetAccountSummaryResult> {
    return this.call('private/get_account_summary', params);
  }

  /**
   * Get Position
   *
   * Retrieves the open position for a specific instrument. Returns detailed position
   * information including size, average entry price, mark price, unrealized P&L,
   * initial margin, maintenance margin, and other position-related metrics. If no
   * position exists for the specified instrument, the response will indicate a zero
   * position.
   *
   * Replaces GET /intx/positions/{portfolio_uuid}/{symbol}
   *
   * JSON-RPC: private/get_position
   */
  getPosition(
    params: AdvTradeGlobalGetPositionRequest,
  ): Promise<AdvTradeGlobalPositionWithOpenOrdersMargin> {
    return this.call('private/get_position', params);
  }

  /**
   * Get Positions
   *
   * Retrieves all open positions for the authenticated account. Returns position
   * details including size, average entry price, mark price, unrealized P&L, initial
   * margin, maintenance margin, and other position-related information. Results can be
   * filtered by currency and instrument kind (future, option, etc.). To retrieve
   * positions for a specific subaccount, use the subaccount_id parameter.
   *
   * Replaces GET /intx/positions/{portfolio_uuid}
   *
   * JSON-RPC: private/get_positions
   */
  getPositions(
    params?: AdvTradeGlobalGetPositionsRequest,
  ): Promise<AdvTradeGlobalPositionWithOpenOrdersMargin[]> {
    return this.call('private/get_positions', params);
  }

  /**
   * Change Margin Model
   *
   * Changes the margin model for the authenticated account or a specified subaccount.
   * Margin models determine how margin requirements are calculated (e.g., Standard
   * Margin vs. Portfolio Margin). Changing the margin model may affect margin
   * requirements, available funds, and trading capabilities. Use the dry_run parameter
   * to preview the impact of the change before applying it.
   *
   * Replaces POST /intx/multi_asset_collateral
   *
   * JSON-RPC: private/change_margin_model
   */
  changeMarginModel(
    params: AdvTradeGlobalChangeMarginModelRequest,
  ): Promise<AdvTradeGlobalChangeMarginModelItem[]> {
    return this.call('private/change_margin_model', params);
  }

  /**
   * Get Access Log
   *
   * Retrieves a log of API access attempts and authentication events for the
   * authenticated account. The log includes information such as IP addresses,
   * timestamps, API methods called, and authentication status. Use this method to
   * monitor account security, review API usage patterns, and identify unauthorized
   * access attempts. Results can be paginated using the offset and count parameters.
   *
   * JSON-RPC: private/get_access_log
   */
  getAccessLog(
    params?: AdvTradeGlobalGetAccessLogRequest,
  ): Promise<AdvTradeGlobalAccessLog[]> {
    return this.call('private/get_access_log', params);
  }

  /**
   * Get Transaction Log
   *
   * Retrieves a detailed transaction log for the authenticated account. The log
   * includes all account activities such as trades, deposits, withdrawals, transfers,
   * fees, and other balance-affecting operations. Results can be filtered by currency,
   * time range, and transaction type. Use the continuation parameter for pagination
   * when retrieving large transaction histories. To retrieve transactions for a
   * specific subaccount, use the subaccount_id parameter. Trade entries executed in
   * Starbase include starbase_match_id, starbase_order_id, and starbase_timestamp. When
   * an option expires out of the money, the transaction log type is expiry. As there is
   * nothing to settle into futures in this case, this remains the only entry in the
   * transaction log for that expiration. History Limit: This API method has no time
   * limit - users can query transaction history back to account creation. Note that the
   * CSV export feature available on the website is year-limited to 2023. Note - This
   * method has distinct API rate limiting requirements: Sustained rate: 1
   * request/second. For more information, see Rate Limits. 📖 Related Support Article:
   * Transaction log
   *
   * JSON-RPC: private/get_transaction_log
   */
  getTransactionLog(
    params: AdvTradeGlobalGetTransactionLogRequest,
  ): Promise<AdvTradeGlobalGetTransactionLogResult> {
    return this.call('private/get_transaction_log', params);
  }

  /**
   * Get Settlement History By Currency
   *
   * Retrieves settlement, delivery, and bankruptcy events that have affected your
   * account for a specific currency. Settlement vs. delivery: Settlement is a daily
   * event (at 08:00 UTC) for futures and perpetual positions that converts unrealized
   * profit and loss into realized profit and loss. Option positions do not settle.
   * Delivery is a one-time event that occurs when a futures or options contract expires
   * - any remaining open position is closed at the delivery price. Delivery does not
   * apply to perpetual or spot instruments. Both events take place at 08:00 UTC, which
   * is why they are sometimes conflated. Results can be filtered by settlement type and
   * timestamp. Use pagination parameters (count and continuation) to retrieve large
   * settlement histories. This data is useful for tracking account-affecting settlement
   * events and understanding how contract expirations impact your account.
   *
   * JSON-RPC: private/get_settlement_history_by_currency
   */
  getSettlementHistoryByCurrency(
    params: AdvTradeGlobalGetSettlementHistoryByCurrencyRequest,
  ): Promise<AdvTradeGlobalGetSettlementHistoryByCurrencyResult> {
    return this.call('private/get_settlement_history_by_currency', params);
  }

  /**
   * Get Settlement History By Instrument
   *
   * Retrieves settlement, delivery, and bankruptcy events for a specific instrument
   * that have affected your account. Settlement vs. delivery: Settlement is a daily
   * event (at 08:00 UTC) for futures and perpetual positions that converts unrealized
   * profit and loss into realized profit and loss. Option positions do not settle.
   * Delivery is a one-time event that occurs when a futures or options contract expires
   * - any remaining open position is closed at the delivery price. Delivery does not
   * apply to perpetual or spot instruments. Both events take place at 08:00 UTC, which
   * is why they are sometimes conflated. Results can be filtered by settlement type and
   * timestamp. Use pagination parameters (count and continuation) to retrieve large
   * settlement histories. This method is useful for tracking settlement events for a
   * specific instrument.
   *
   * JSON-RPC: private/get_settlement_history_by_instrument
   */
  getSettlementHistoryByInstrument(
    params: AdvTradeGlobalGetSettlementHistoryByInstrumentRequest,
  ): Promise<AdvTradeGlobalGetSettlementHistoryByInstrumentResult> {
    return this.call('private/get_settlement_history_by_instrument', params);
  }

  /**
   * Simulate Portfolio
   *
   * Calculates portfolio margin requirements and risk metrics for simulated positions
   * or the current portfolio. This method helps you understand margin requirements
   * before opening new positions or assess the impact of potential trades. You can
   * simulate adding new positions to the current portfolio or calculate margin for a
   * completely simulated portfolio. The response includes initial margin, maintenance
   * margin, available funds, and other risk metrics. Note: This method has a restricted
   * rate limit of not more than once per second due to the computational complexity of
   * portfolio margin calculations.
   *
   * JSON-RPC: private/simulate_portfolio
   */
  simulatePortfolio(
    params: AdvTradeGlobalSimulatePortfolioRequest,
  ): Promise<AdvTradeGlobalSimulatePortfolioResult> {
    return this.call('private/simulate_portfolio', params);
  }

  /**
   * Simulate PME
   *
   * Calculates the Extended Risk Matrix (ERM) and detailed margin information for
   * Portfolio Margin accounts. The ERM provides a comprehensive view of portfolio risk
   * across different scenarios and market conditions. You can calculate the ERM for a
   * specific currency or for the entire Cross-Collateral portfolio. The response
   * includes margin requirements, risk metrics, and scenario analysis that helps assess
   * portfolio risk under various market conditions. Use this method to understand
   * margin requirements and risk exposure before making trading decisions in a
   * Portfolio Margin account.
   *
   * JSON-RPC: private/pme/simulate
   */
  simulatePme(
    params: AdvTradeGlobalSimulatePmeRequest,
  ): Promise<AdvTradeGlobalSimulatePmeResult> {
    return this.call('private/pme/simulate', params);
  }

  /**
   * Enable Cancel On Disconnect
   *
   * Enable Cancel On Disconnect for the connection. After enabling, all orders created
   * via this connection will be automatically cancelled when the connection is closed.
   * Cancel is triggered in the following cases: when the TCP connection is properly
   * terminated, when the connection is closed due to 10 minutes of inactivity, or when
   * a heartbeat detects a disconnection. To reduce the inactivity timeout, consider
   * using public/set_heartbeat. Note: If the connection is gracefully closed using
   * private/logout, cancel-on-disconnect will not be triggered. Notice:
   * Cancel-on-Disconnect does not affect orders created by other connections - they
   * will remain active! When change is applied on the account scope, then every newly
   * opened connection will start with active Cancel on Disconnect. WebSocket Only: This
   * method is designed exclusively for WebSocket connections. Attempting to use it via
   * REST/HTTP will result in an error response.
   *
   * JSON-RPC: private/enable_cancel_on_disconnect
   */
  enableCancelOnDisconnect(
    params?: AdvTradeGlobalEnableCancelOnDisconnectRequest,
  ): Promise<'ok'> {
    return this.call('private/enable_cancel_on_disconnect', params);
  }

  /**
   * Disable Cancel On Disconnect
   *
   * Disable Cancel On Disconnect for the connection. When change is applied for the
   * account, then every newly opened connection will start with inactive Cancel on
   * Disconnect. WebSocket Only: This method is designed exclusively for WebSocket
   * connections. Attempting to use it via REST/HTTP will result in an error response.
   *
   * JSON-RPC: private/disable_cancel_on_disconnect
   */
  disableCancelOnDisconnect(
    params?: AdvTradeGlobalDisableCancelOnDisconnectRequest,
  ): Promise<'ok'> {
    return this.call('private/disable_cancel_on_disconnect', params);
  }

  /**
   * Get Cancel On Disconnect
   *
   * Read current Cancel On Disconnect configuration for the account.
   *
   * JSON-RPC: private/get_cancel_on_disconnect
   */
  getCancelOnDisconnect(
    params?: AdvTradeGlobalGetCancelOnDisconnectRequest,
  ): Promise<AdvTradeGlobalGetCancelOnDisconnectResult> {
    return this.call('private/get_cancel_on_disconnect', params);
  }

  /**
   * Create Combo
   *
   * Verifies and creates a combo book or returns an existing combo matching the given
   * trades. Combos allow trading on multiple instruments (futures and options)
   * simultaneously as a single strategy. If a combo matching the provided trades
   * already exists, this method returns the existing combo. Otherwise, it creates a new
   * combo book with the specified leg structure.
   *
   * JSON-RPC: private/create_combo
   */
  createCombo(
    params: AdvTradeGlobalCreateComboRequest,
  ): Promise<AdvTradeGlobalCombo> {
    return this.call('private/create_combo', params);
  }

  /**
   * Get Leg Prices
   *
   * Returns individual leg prices for a given combo structure based on an aggregated
   * price of the strategy and the mark prices of the individual legs. Note: Leg prices
   * change dynamically with mark price fluctuations, and the algorithm is calibrated
   * only for conventional option structures and future spreads. This method supports
   * both inverse strategies and known linear structures within a single currency pair.
   *
   * JSON-RPC: private/get_leg_prices
   */
  getLegPrices(
    params: AdvTradeGlobalGetLegPricesRequest,
  ): Promise<AdvTradeGlobalGetLegPricesResult> {
    return this.call('private/get_leg_prices', params);
  }

  /**
   * Create Block RFQ
   *
   * Create a Block RFQ.
   *
   * Request parameters are not in the published OpenAPI spec yet.
   *
   * JSON-RPC: private/create_block_rfq
   */
  createBlockRfq(params?: any): Promise<any> {
    if (params) {
      this.validateOrderId(params, 'label', 64);
    }
    return this.call('private/create_block_rfq', params);
  }

  /**
   * Cancel Block RFQ
   *
   * Cancel a Block RFQ.
   *
   * Request parameters are not in the published OpenAPI spec yet.
   *
   * JSON-RPC: private/cancel_block_rfq
   */
  cancelBlockRfq(params?: any): Promise<any> {
    return this.call('private/cancel_block_rfq', params);
  }

  /**
   * Accept Block RFQ
   *
   * Accept a Block RFQ quote.
   *
   * Request parameters are not in the published OpenAPI spec yet.
   *
   * JSON-RPC: private/accept_block_rfq
   */
  acceptBlockRfq(params?: any): Promise<any> {
    return this.call('private/accept_block_rfq', params);
  }

  /**
   * Cancel Block RFQ Trigger
   *
   * Cancel a Block RFQ trigger.
   *
   * Request parameters are not in the published OpenAPI spec yet.
   *
   * JSON-RPC: private/cancel_block_rfq_trigger
   */
  cancelBlockRfqTrigger(params?: any): Promise<any> {
    return this.call('private/cancel_block_rfq_trigger', params);
  }

  /**
   * Get Block RFQs
   *
   * Block RFQs for the user.
   *
   * Request parameters are not in the published OpenAPI spec yet.
   *
   * JSON-RPC: private/get_block_rfqs
   */
  getBlockRfqs(params?: any): Promise<any> {
    return this.call('private/get_block_rfqs', params);
  }

  /**
   * Add Block RFQ Quote
   *
   * Quote a Block RFQ.
   *
   * Request parameters are not in the published OpenAPI spec yet.
   *
   * JSON-RPC: private/add_block_rfq_quote
   */
  addBlockRfqQuote(params?: any): Promise<any> {
    if (params) {
      this.validateOrderId(params, 'label', 64);
    }
    return this.call('private/add_block_rfq_quote', params);
  }

  /**
   * Edit Block RFQ Quote
   *
   * Edit a Block RFQ quote.
   *
   * Request parameters are not in the published OpenAPI spec yet.
   *
   * JSON-RPC: private/edit_block_rfq_quote
   */
  editBlockRfqQuote(params?: any): Promise<any> {
    return this.call('private/edit_block_rfq_quote', params);
  }

  /**
   * Cancel Block RFQ Quote
   *
   * Cancel a Block RFQ quote.
   *
   * Request parameters are not in the published OpenAPI spec yet.
   *
   * JSON-RPC: private/cancel_block_rfq_quote
   */
  cancelBlockRfqQuote(params?: any): Promise<any> {
    return this.call('private/cancel_block_rfq_quote', params);
  }

  /**
   * Cancel All Block RFQ Quotes
   *
   * Cancel all Block RFQ quotes.
   *
   * Request parameters are not in the published OpenAPI spec yet.
   *
   * JSON-RPC: private/cancel_all_block_rfq_quotes
   */
  cancelAllBlockRfqQuotes(params?: any): Promise<any> {
    return this.call('private/cancel_all_block_rfq_quotes', params);
  }

  /**
   * Get Block RFQ Quotes
   *
   * Open Block RFQ quotes.
   *
   * Request parameters are not in the published OpenAPI spec yet.
   *
   * JSON-RPC: private/get_block_rfq_quotes
   */
  getBlockRfqQuotes(params?: any): Promise<any> {
    return this.call('private/get_block_rfq_quotes', params);
  }

  /**
   * Get Block RFQ Makers
   *
   * Available Block RFQ makers.
   *
   * Request parameters are not in the published OpenAPI spec yet.
   *
   * JSON-RPC: private/get_block_rfq_makers
   */
  getBlockRfqMakers(params?: any): Promise<any> {
    return this.call('private/get_block_rfq_makers', params);
  }

  /**
   * Get Block RFQ User Info
   *
   * Block RFQ identity and rating.
   *
   * Request parameters are not in the published OpenAPI spec yet.
   *
   * JSON-RPC: private/get_block_rfq_user_info
   */
  getBlockRfqUserInfo(params?: any): Promise<any> {
    return this.call('private/get_block_rfq_user_info', params);
  }

  /**
   * Execute Block Trade
   *
   * Execute a block trade.
   *
   * Request parameters are not in the published OpenAPI spec yet.
   *
   * JSON-RPC: private/execute_block_trade
   */
  executeBlockTrade(params?: any): Promise<any> {
    return this.call('private/execute_block_trade', params);
  }

  /**
   * Verify Block Trade
   *
   * Verify a block trade.
   *
   * Request parameters are not in the published OpenAPI spec yet.
   *
   * JSON-RPC: private/verify_block_trade
   */
  verifyBlockTrade(params?: any): Promise<any> {
    return this.call('private/verify_block_trade', params);
  }

  /**
   * Approve Block Trade
   *
   * Approve a pending block trade.
   *
   * Request parameters are not in the published OpenAPI spec yet.
   *
   * JSON-RPC: private/approve_block_trade
   */
  approveBlockTrade(params?: any): Promise<any> {
    return this.call('private/approve_block_trade', params);
  }

  /**
   * Reject Block Trade
   *
   * Reject a pending block trade.
   *
   * Request parameters are not in the published OpenAPI spec yet.
   *
   * JSON-RPC: private/reject_block_trade
   */
  rejectBlockTrade(params?: any): Promise<any> {
    return this.call('private/reject_block_trade', params);
  }

  /**
   * Simulate Block Trade
   *
   * Simulate a block trade.
   *
   * Request parameters are not in the published OpenAPI spec yet.
   *
   * JSON-RPC: private/simulate_block_trade
   */
  simulateBlockTrade(params?: any): Promise<any> {
    return this.call('private/simulate_block_trade', params);
  }

  /**
   * Invalidate Block Trade Signature
   *
   * Invalidate a block-trade signature.
   *
   * Request parameters are not in the published OpenAPI spec yet.
   *
   * JSON-RPC: private/invalidate_block_trade_signature
   */
  invalidateBlockTradeSignature(params?: any): Promise<any> {
    return this.call('private/invalidate_block_trade_signature', params);
  }

  /**
   * Get Block Trade
   *
   * One block trade.
   *
   * Request parameters are not in the published OpenAPI spec yet.
   *
   * JSON-RPC: private/get_block_trade
   */
  getBlockTrade(params?: any): Promise<any> {
    return this.call('private/get_block_trade', params);
  }

  /**
   * Get Block Trades
   *
   * The user's block trades.
   *
   * Request parameters are not in the published OpenAPI spec yet.
   *
   * JSON-RPC: private/get_block_trades
   */
  getBlockTrades(params?: any): Promise<any> {
    return this.call('private/get_block_trades', params);
  }

  /**
   * Get Block Trade Requests
   *
   * Pending block-trade requests.
   *
   * Request parameters are not in the published OpenAPI spec yet.
   *
   * JSON-RPC: private/get_block_trade_requests
   */
  getBlockTradeRequests(params?: any): Promise<any> {
    return this.call('private/get_block_trade_requests', params);
  }

  /**
   * Get Broker Trades
   *
   * Broker block trades.
   *
   * Request parameters are not in the published OpenAPI spec yet.
   *
   * JSON-RPC: private/get_broker_trades
   */
  getBrokerTrades(params?: any): Promise<any> {
    return this.call('private/get_broker_trades', params);
  }

  /**
   * Get Broker Trade Requests
   *
   * Broker block-trade requests.
   *
   * Request parameters are not in the published OpenAPI spec yet.
   *
   * JSON-RPC: private/get_broker_trade_requests
   */
  getBrokerTradeRequests(params?: any): Promise<any> {
    return this.call('private/get_broker_trade_requests', params);
  }
}
