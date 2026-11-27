# **Coinbase API Examples** - Node.js, JavaScript & TypeScript SDK for Coinbase Advanced Trade, Coinbase App, Exchange REST APIs & WebSockets

This page collects short, copy-ready examples for `coinbase-api`, the Node.js, JavaScript and TypeScript SDK for Coinbase: Advanced Trade (spot and futures), the Coinbase App API, Coinbase Exchange, International Exchange, Prime and Commerce, plus WebSocket streams. Each snippet is a complete file. Runnable versions live in the product folders under [examples](./), and there is one small example per endpoint in [examples/apidoc](./apidoc/).

- [Advanced Trade API documentation](https://docs.cdp.coinbase.com/coinbase-app/advanced-trade-apis/overview) - official Coinbase docs
- [Coinbase Exchange documentation](https://docs.cdp.coinbase.com/exchange/introduction/welcome) - official docs for the institutional Exchange API
- [SDK docs](https://sieblyio.github.io/docs/coinbase/) - guides and the full API reference
- [JavaScript tutorial](https://siebly.io/sdk/coinbase/javascript/tutorial) - a longer walkthrough
- [Endpoint map](../docs/endpointFunctionList.md) - every endpoint and the SDK function that calls it

## Installation

```bash
npm install coinbase-api
```

The SDK works with `import` and `require`, and ships its own TypeScript types. The snippets below use ES modules with top-level `await` (save them as `.mjs` or `.ts`, or set `"type": "module"` in `package.json`). A CommonJS version is shown under "Create a client".

## Which client do I need?

| Client | Use it for |
| --- | --- |
| `CBAdvancedTradeClient` | Advanced Trade REST: spot and futures market data, accounts, orders, fills, portfolios, perpetuals |
| `CBAppClient` | Coinbase App REST: prices and exchange rates, wallets, addresses, transactions, deposits and withdrawals |
| `CBExchangeClient` | Coinbase Exchange REST (institutional): products, tickers, order books, candles, orders, transfers |
| `CBInternationalClient` | Coinbase International Exchange REST |
| `CBPrimeClient` | Coinbase Prime REST |
| `CBCommerceClient` | Coinbase Commerce REST |
| `WebsocketClient` | All WebSocket streams (Advanced Trade, Exchange, International, Prime), with automatic reconnect and resubscribe |
| `WebsocketAPIClient` | Awaitable requests over the Advanced Trade Global (derivatives) WebSocket API |

The old Coinbase Pro API (`api.pro.coinbase.com`) has been retired. Its public endpoints live on as Coinbase Exchange, which `CBExchangeClient` and the `exchangeMarketData` WebSocket cover.

## Create a client

### Public client (no key)

```typescript
import { CBAdvancedTradeClient } from 'coinbase-api';

const client = new CBAdvancedTradeClient();
```

### Private client (CDP API key)

Create a key in the Coinbase Developer Platform. Both ECDSA and Ed25519 keys work, and the client detects which one you pass. Give the key only the permissions it needs.

```typescript
import { CBAdvancedTradeClient } from 'coinbase-api';

const client = new CBAdvancedTradeClient({
  // ECDSA: 'organizations/{org_id}/apiKeys/{key_id}', Ed25519: the key id
  apiKey: process.env.CB_API_KEY_NAME!,
  // ECDSA: the full PEM including the BEGIN/END lines, Ed25519: the base64 secret
  apiSecret: process.env.CB_API_PRIVATE_KEY!,
});
```

If the PEM is stored in an environment variable on one line, turn the `\n` sequences back into real line breaks first:

```typescript
const apiSecret = process.env.CB_API_PRIVATE_KEY!.replace(/\\n/g, '\n');
```

### CommonJS

```javascript
const { CBAdvancedTradeClient } = require('coinbase-api');

const client = new CBAdvancedTradeClient();

client
  .getServerTime()
  .then((time) => console.log('Coinbase time:', time.iso))
  .catch(console.error);
```

## Advanced Trade: market data (no key)

### Server time

```typescript
import { CBAdvancedTradeClient } from 'coinbase-api';

const client = new CBAdvancedTradeClient();

const time = await client.getServerTime();
console.log(time.iso, time.epochMillis);
```

### Products and trading rules

`base_increment`, `quote_increment` and `base_min_size` tell you how to round sizes and prices before you send an order.

```typescript
import { CBAdvancedTradeClient } from 'coinbase-api';

const client = new CBAdvancedTradeClient();

const { products } = await client.getPublicProducts({ product_type: 'SPOT' });
console.log('Spot products:', products.length);

const btc = await client.getPublicProduct({ product_id: 'BTC-USD' });
console.log({
  price: btc.price,
  baseIncrement: btc.base_increment,
  quoteIncrement: btc.quote_increment,
  minSize: btc.base_min_size,
});
```

### Order book

```typescript
import { CBAdvancedTradeClient } from 'coinbase-api';

const client = new CBAdvancedTradeClient();

const { pricebook } = await client.getPublicProductBook({
  product_id: 'BTC-USD',
  limit: 10,
});
console.log('Best bid:', pricebook.bids[0]);
console.log('Best ask:', pricebook.asks[0]);
```

### Candles

`start` and `end` are UNIX timestamps in seconds, passed as strings.

```typescript
import { CBAdvancedTradeClient } from 'coinbase-api';

const client = new CBAdvancedTradeClient();

const end = Math.floor(Date.now() / 1000);
const start = end - 60 * 60; // last hour

const { candles } = await client.getPublicProductCandles({
  product_id: 'BTC-USD',
  granularity: 'FIVE_MINUTE',
  start: String(start),
  end: String(end),
});

for (const c of candles) {
  console.log(new Date(Number(c.start) * 1000).toISOString(), c.open, c.high, c.low, c.close, c.volume);
}
```

### Recent trades

```typescript
import { CBAdvancedTradeClient } from 'coinbase-api';

const client = new CBAdvancedTradeClient();

const { trades, best_bid, best_ask } = await client.getPublicMarketTrades({
  product_id: 'BTC-USD',
  limit: 20,
});
console.log({ best_bid, best_ask });
for (const t of trades) console.log(t.time, t.side, t.price, t.size);
```

## Advanced Trade: account (key required)

### Accounts and balances (with pagination)

```typescript
import { CBAdvancedTradeClient } from 'coinbase-api';

const client = new CBAdvancedTradeClient({
  apiKey: process.env.CB_API_KEY_NAME!,
  apiSecret: process.env.CB_API_PRIVATE_KEY!,
});

let page = await client.getAccounts({ limit: 250 });
const accounts = [...page.accounts];
while (page.has_next && page.cursor) {
  page = await client.getAccounts({ limit: 250, cursor: page.cursor });
  accounts.push(...page.accounts);
}

for (const a of accounts) {
  if (Number(a.available_balance.value) > 0) {
    console.log(a.currency, a.available_balance.value);
  }
}
```

### Best bid and ask for several products

```typescript
import { CBAdvancedTradeClient } from 'coinbase-api';

const client = new CBAdvancedTradeClient({
  apiKey: process.env.CB_API_KEY_NAME!,
  apiSecret: process.env.CB_API_PRIVATE_KEY!,
});

const { pricebooks } = await client.getBestBidAsk({
  product_ids: ['BTC-USD', 'ETH-USD'],
});
for (const book of pricebooks) {
  console.log(book.product_id, book.bids[0]?.price, book.asks[0]?.price);
}
```

### Check what a key is allowed to do

```typescript
import { CBAdvancedTradeClient } from 'coinbase-api';

const client = new CBAdvancedTradeClient({
  apiKey: process.env.CB_API_KEY_NAME!,
  apiSecret: process.env.CB_API_PRIVATE_KEY!,
});

const permissions = await client.getApiKeyPermissions();
console.log(permissions); // can_view, can_trade, can_transfer, portfolio_uuid
```

### Open orders and fills

```typescript
import { CBAdvancedTradeClient } from 'coinbase-api';

const client = new CBAdvancedTradeClient({
  apiKey: process.env.CB_API_KEY_NAME!,
  apiSecret: process.env.CB_API_PRIVATE_KEY!,
});

const { orders } = await client.getOrders({
  product_ids: ['BTC-USD'],
  order_status: ['OPEN'],
  limit: 50,
});
console.log('Open orders:', orders.length);

const { fills } = await client.getFills({ product_ids: ['BTC-USD'], limit: 50 });
for (const f of fills) console.log(f.trade_time, f.side, f.price, f.size);
```

## Advanced Trade: trading (key with trade permission)

Every order takes a `client_order_id`. `generateNewOrderId()` creates one for you; reuse the same id when you retry, so a retry cannot create a second order. Sizes and prices are strings.

### Preview an order first

`previewOrder` checks an order without placing it, which is a safe way to test parameters and keys.

```typescript
import { CBAdvancedTradeClient } from 'coinbase-api';

const client = new CBAdvancedTradeClient({
  apiKey: process.env.CB_API_KEY_NAME!,
  apiSecret: process.env.CB_API_PRIVATE_KEY!,
});

const preview = await client.previewOrder({
  product_id: 'BTC-USD',
  side: 'BUY',
  order_configuration: {
    limit_limit_gtc: { base_size: '0.0001', limit_price: '10000.00' },
  },
});
console.log(preview);
```

### Limit order (post-only)

```typescript
import { CBAdvancedTradeClient } from 'coinbase-api';

const client = new CBAdvancedTradeClient({
  apiKey: process.env.CB_API_KEY_NAME!,
  apiSecret: process.env.CB_API_PRIVATE_KEY!,
});

const result = await client.submitOrder({
  client_order_id: client.generateNewOrderId(),
  product_id: 'BTC-USD',
  side: 'BUY',
  order_configuration: {
    limit_limit_gtc: {
      base_size: '0.0001',
      limit_price: '10000.00', // far from market on purpose
      post_only: true,
    },
  },
});

if (result.success) {
  console.log('Order id:', result.success_response?.order_id);
} else {
  console.log('Rejected:', result.error_response);
}
```

### Market order sized in the quote currency

```typescript
import { CBAdvancedTradeClient } from 'coinbase-api';

const client = new CBAdvancedTradeClient({
  apiKey: process.env.CB_API_KEY_NAME!,
  apiSecret: process.env.CB_API_PRIVATE_KEY!,
});

// Spend 10 USD on BTC. Use base_size instead to sell a fixed amount of BTC.
const result = await client.submitOrder({
  client_order_id: client.generateNewOrderId(),
  product_id: 'BTC-USD',
  side: 'BUY',
  order_configuration: {
    market_market_ioc: { quote_size: '10' },
  },
});
console.log(result);
```

### Stop-limit order

```typescript
import { CBAdvancedTradeClient } from 'coinbase-api';

const client = new CBAdvancedTradeClient({
  apiKey: process.env.CB_API_KEY_NAME!,
  apiSecret: process.env.CB_API_PRIVATE_KEY!,
});

const result = await client.submitOrder({
  client_order_id: client.generateNewOrderId(),
  product_id: 'BTC-USD',
  side: 'SELL',
  order_configuration: {
    stop_limit_stop_limit_gtc: {
      base_size: '0.0001',
      stop_price: '20000.00',
      limit_price: '19900.00',
      stop_direction: 'STOP_DIRECTION_STOP_DOWN',
    },
  },
});
console.log(result);
```

### Get, edit and cancel orders

```typescript
import { CBAdvancedTradeClient } from 'coinbase-api';

const client = new CBAdvancedTradeClient({
  apiKey: process.env.CB_API_KEY_NAME!,
  apiSecret: process.env.CB_API_PRIVATE_KEY!,
});

const orderId = 'your-order-id';

const { order } = await client.getOrder({ order_id: orderId });
console.log(order.status, order.filled_size);

// Edit price and/or size of an open GTC limit order
const edited = await client.updateOrder({
  order_id: orderId,
  price: '10500.00',
  size: '0.0001',
});
console.log('Edited:', edited.success);

// Cancel one or more orders by id
const { results } = await client.cancelOrders({ order_ids: [orderId] });
for (const r of results) console.log(r.order_id, r.success, r.failure_reason);
```

## Coinbase App API

### Spot price (no key)

```typescript
import { CBAppClient } from 'coinbase-api';

const client = new CBAppClient();

const { data } = await client.getSpotPrice({ currencyPair: 'BTC-GBP' });
console.log(`1 BTC = ${data.amount} ${data.currency}`);

const rates = await client.getExchangeRates({ currency: 'USD' });
console.log('1 USD in BTC:', rates.data.rates.BTC);
```

## Coinbase Exchange (formerly Coinbase Pro)

### Ticker, 24h stats, order book and candles (no key)

```typescript
import { CBExchangeClient } from 'coinbase-api';

const client = new CBExchangeClient();

const ticker = await client.getProductTicker({ product_id: 'BTC-USD' });
console.log('Last:', ticker.price, 'bid:', ticker.bid, 'ask:', ticker.ask);

const stats = await client.getProductStats({ product_id: 'BTC-USD' });
console.log('24h open/high/low:', stats.open, stats.high, stats.low);

const book = await client.getProductBook({ product_id: 'BTC-USD', level: 2 });
console.log('Top of book:', book.bids[0], book.asks[0]);

// granularity in seconds: 60, 300, 900, 3600, 21600 or 86400
// each row is [time, low, high, open, close, volume]
const candles = await client.getProductCandles({ product_id: 'BTC-USD', granularity: 3600 });
console.log('Latest hourly candle:', candles[0]);
```

### Private Exchange client

Exchange keys are separate from CDP keys and also need the passphrase you set when creating the key.

```typescript
import { CBExchangeClient } from 'coinbase-api';

const client = new CBExchangeClient({
  apiKey: process.env.CB_EXCHANGE_API_KEY!,
  apiSecret: process.env.CB_EXCHANGE_API_SECRET!,
  apiPassphrase: process.env.CB_EXCHANGE_API_PASSPHRASE!,
});

const accounts = await client.getAccounts();
console.log(accounts);
```

## WebSockets

All streams go through one `WebsocketClient`. The second argument to `subscribe` is the WebSocket key, which picks the product and the connection. The client connects on the first subscribe, sends heartbeats, reconnects and resubscribes on its own.

| WebSocket key | Stream |
| --- | --- |
| `advTradeMarketData` | Advanced Trade public market data (ticker, level2, market_trades, candles, status, heartbeats) |
| `advTradeUserData` | Advanced Trade private data (user orders, futures_balance_summary), authenticated automatically |
| `exchangeMarketData` | Coinbase Exchange public feed (ticker, ticker_batch, matches, heartbeat, status) |

### Public Advanced Trade streams

```typescript
import { WebsocketClient } from 'coinbase-api';

const ws = new WebsocketClient();

ws.on('open', ({ wsKey }) => console.log('connected', wsKey));
ws.on('update', (data) => {
  if (data.channel === 'ticker') {
    for (const event of data.events) {
      for (const t of event.tickers) console.log(t.product_id, t.price);
    }
  }
});
ws.on('response', (data) => console.log('response', JSON.stringify(data)));
ws.on('reconnected', ({ wsKey }) => console.log('reconnected', wsKey));
ws.on('exception', (err) => console.error('exception', err));

ws.subscribe(
  [
    { topic: 'ticker', payload: { product_ids: ['BTC-USD', 'ETH-USD'] } },
    { topic: 'market_trades', payload: { product_ids: ['BTC-USD'] } },
    { topic: 'level2', payload: { product_ids: ['BTC-USD'] } },
    'heartbeats',
  ],
  'advTradeMarketData',
);
```

### Private Advanced Trade streams (orders)

```typescript
import { WebsocketClient } from 'coinbase-api';

const ws = new WebsocketClient({
  apiKey: process.env.CB_API_KEY_NAME!,
  apiSecret: process.env.CB_API_PRIVATE_KEY!,
});

ws.on('update', (data) => {
  if (data.channel === 'user') {
    for (const event of data.events) {
      for (const o of event.orders ?? []) {
        console.log(o.order_id, o.status, o.cumulative_quantity);
      }
    }
  }
});
ws.on('exception', (err) => console.error('exception', err));

ws.subscribe('user', 'advTradeUserData');
ws.subscribe('futures_balance_summary', 'advTradeUserData');
```

### Coinbase Exchange public feed (the old Coinbase Pro feed)

```typescript
import { WebsocketClient } from 'coinbase-api';

const ws = new WebsocketClient();

ws.on('update', (data) => {
  if (data.type === 'ticker') console.log(data.product_id, data.price, data.best_bid, data.best_ask);
  if (data.type === 'match') console.log('trade', data.side, data.price, data.size);
});

ws.subscribe(
  [
    { topic: 'ticker', payload: { product_ids: ['BTC-USD'] } },
    { topic: 'matches', payload: { product_ids: ['BTC-USD'] } },
  ],
  'exchangeMarketData',
);
```

### Unsubscribe and close

```typescript
import { WebsocketClient } from 'coinbase-api';

const ws = new WebsocketClient();
const level2 = { topic: 'level2', payload: { product_ids: ['BTC-USD'] } };

ws.subscribe([level2, 'heartbeats'], 'advTradeMarketData');

setTimeout(() => ws.unsubscribe(level2, 'advTradeMarketData'), 5_000);
setTimeout(() => ws.closeAll(), 10_000); // closes every connection, no reconnect
```

## Error handling

REST errors are thrown with the HTTP status in `code` and the response in `body`. Keys and secrets in the attached request options are replaced with `omittedFromError`, so the error is safe to log.

```typescript
import { CBAdvancedTradeClient } from 'coinbase-api';

const client = new CBAdvancedTradeClient({
  apiKey: process.env.CB_API_KEY_NAME!,
  apiSecret: process.env.CB_API_PRIVATE_KEY!,
});

try {
  await client.getAccounts();
} catch (e: any) {
  if (e?.code === 401) {
    console.error('Unauthorized: check the key name, the private key and its permissions');
  } else {
    console.error('Coinbase error', e?.code, e?.body ?? e?.message);
  }
}
```

Order rejections are not thrown: `submitOrder` resolves with `success: false` and the reason in `error_response`, so always check `success`.

## More

- [All examples](./) and [one example per endpoint](./apidoc/)
- [SDK docs](https://sieblyio.github.io/docs/coinbase/) and [JavaScript tutorial](https://siebly.io/sdk/coinbase/javascript/tutorial)
- Other Siebly SDKs for exchange APIs: https://siebly.io
