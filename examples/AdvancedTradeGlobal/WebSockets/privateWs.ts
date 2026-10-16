import {
  AdvTradeGlobalPrivateWSTopic,
  CBAdvancedTradeGlobalPrivateWSEvent,
  WebsocketClient,
  WS_KEY_MAP,
} from '../../../src/index.js';

const client = new WebsocketClient({
  apiKey: process.env.CB_API_KEY,
  apiSecret: process.env.CB_API_SECRET,
});
const wsKey = WS_KEY_MAP.advTradeGlobalUserData;

client.on('open', ({ wsKey }) => console.log('open:', wsKey));
client.on('authenticated', ({ wsKey }) => console.log('authenticated:', wsKey));
client.on('reconnect', ({ wsKey }) => console.log('reconnecting:', wsKey));
client.on('reconnected', ({ wsKey }) => console.log('reconnected:', wsKey));
client.on('close', ({ wsKey }) => console.log('closed:', wsKey));
client.on('exception', (event) => console.error('exception:', event));
client.on('response', (event) => console.log('response:', event));
client.on('update', (event: CBAdvancedTradeGlobalPrivateWSEvent) => {
  console.log(event.params.channel, event.params.data);
});

// Authentication and renewal are automatic. Subscriptions wait for public/auth
// to succeed and are restored after authenticating a replacement connection.
const topics: AdvTradeGlobalPrivateWSTopic[] = [
  'user.orders.future.USDC.100ms',
  'user.trades.future.USDC.100ms',
  'user.changes.future.USDC.100ms',
  'user.portfolio.USDC',
];
client.subscribe(topics, wsKey);

// client.unsubscribe('user.portfolio.USDC', wsKey);
