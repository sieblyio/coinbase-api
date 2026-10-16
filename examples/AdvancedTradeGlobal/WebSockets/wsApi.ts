import { WebsocketAPIClient, WS_KEY_MAP } from '../../../src/index.js';

const apiKey = process.env.CB_API_KEY;
const apiSecret = process.env.CB_API_SECRET;
const client = new WebsocketAPIClient({ apiKey, apiSecret });

async function run() {
  try {
    // Public RPC calls open the connection automatically and need no credentials.
    const time = await client.getTime();
    console.log('Server time:', time.result);

    // The same typed promise interface is available without the named wrapper.
    const test = await client
      .getWSClient()
      .sendWSAPIRequest(WS_KEY_MAP.advTradeGlobalWSAPI, 'public/test');
    console.log('Gateway version:', test.result.version);

    if (apiKey && apiSecret) {
      // Optional warm-up: await client.connectWSAPI();
      // Private calls share automatic authentication and session renewal.
      const positions = await client.getPositions({ currency: 'USDC' });
      console.log('Positions:', positions.result);

      // Logout has no JSON-RPC reply. This waits for the server to close the socket.
      await client.logout({ invalidate_token: false });
    }
  } finally {
    client.getWSClient().closeAll();
  }
}

run().catch((error) => console.error('WS API request failed:', error));
