import {
  AdvTradeGlobalPublicWSTopic,
  CBAdvancedTradeGlobalPublicWSEvent,
  WebsocketClient,
  WS_KEY_MAP,
} from '../../../src/index.js';

const client = new WebsocketClient();
const wsKey = WS_KEY_MAP.advTradeGlobalMarketData;

client.on('open', ({ wsKey }) => console.log('open:', wsKey));
client.on('reconnect', ({ wsKey }) => console.log('reconnecting:', wsKey));
client.on('reconnected', ({ wsKey }) => console.log('reconnected:', wsKey));
client.on('close', ({ wsKey }) => console.log('closed:', wsKey));
client.on('exception', (event) => console.error('exception:', event));
client.on('response', (event) => console.log('response:', event));
client.on('update', (event: CBAdvancedTradeGlobalPublicWSEvent) => {
  console.log(event.params.channel, event.params.data);
});

// No credentials are required. Instrument and interval parameters go in the channel name.
// Use 100ms or agg2 on this public feed; raw intervals require authentication.
const topics: AdvTradeGlobalPublicWSTopic[] = [
  'quote.BTC-PERPETUAL',
  'ticker.BTC-PERPETUAL.100ms',
  'book.BTC-PERPETUAL.none.10.100ms',
  'trades.BTC-PERPETUAL.100ms',
  'deribit_price_index.btc_usd',
];

client.subscribe(topics, wsKey);

// Existing object-style requests work too, with the complete channel in topic:
// client.subscribe({ topic: 'platform_state' }, wsKey);

// Removing a topic also removes it from the automatic reconnect subscriptions:
// client.unsubscribe('quote.BTC-PERPETUAL', wsKey);
