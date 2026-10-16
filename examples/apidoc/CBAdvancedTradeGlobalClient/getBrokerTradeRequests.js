import { CBAdvancedTradeGlobalClient } from 'coinbase-api';
// or, if require is preferred:
// const { CBAdvancedTradeGlobalClient } = require('coinbase-api');

// This example shows how to call this coinbase API endpoint with either node.js, javascript (js) or typescript (ts) with the npm module "coinbase-api" for coinbase exchange
// This coinbase API SDK is available on npm via "npm install coinbase-api"
// ENDPOINT: /api/v2 private/get_broker_trade_requests
// METHOD: POST
// PUBLIC: NO

const client = new CBAdvancedTradeGlobalClient({
  apiKey: 'insert_api_key_here',
  apiSecret: 'insert_api_secret_here',
});

client.getBrokerTradeRequests(params)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
