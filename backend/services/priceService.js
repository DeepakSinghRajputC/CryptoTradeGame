import fetch from 'node-fetch';

// List of cryptocurrencies to track
const COINS = ['bitcoin', 'ethereum', 'tether', 'binancecoin', 'cardano'];

// Mapping from CMC symbols to our coin names
const COIN_MAPPING = {
  'BTC': 'bitcoin',
  'ETH': 'ethereum',
  'USDT': 'tether',
  'BNB': 'binancecoin',
  'ADA': 'cardano',
};

// In-memory cache for prices
let priceCache = {
  prices: {},
  lastUpdate: null,
};

// Cache duration: 1 week
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000;

/**
 * Fetches current prices from CoinGecko API
 * Respects rate limits and handles errors gracefully
 */
// async function fetchPrices() {
//   try {
//     const ids = COINS.join(',');
//     const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`;

//     console.log('Fetching prices from CoinGecko...');
//     const response = await fetch(url);

//     if (!response.ok) {
//       throw new Error(`CoinGecko API error: ${response.status}`);
//     }

//     const data = await response.json();

//     // Update cache
//     priceCache.prices = data;
//     priceCache.lastUpdate = new Date();

//     console.log('Prices updated successfully at', priceCache.lastUpdate);

//     // Emit updates to WebSocket clients (will be handled by the WebSocket server)
//     return priceCache;

//   } catch (error) {
//     console.error('Failed to fetch prices from CoinGecko:', error.message);
//     // Keep old prices if fetch fails
//     return priceCache;
//   }
// }

/**
 * Returns the current cached prices
 */
function getPrices() {
  return priceCache;
}

/**
 * Fetches prices and emits to WebSocket clients
 */
async function fetchPrices(wss) {
  try {
    const url = process.env.CMC_API_URL;
    const apiKey = process.env.CMC_API_KEY;

    console.log('Fetching prices from CoinMarketCap...');
    const response = await fetch(url, {
      headers: {
        'X-CMC_PRO_API_KEY': apiKey,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`CoinMarketCap API error: ${response.status}`);
    }

    const data = await response.json();

    // Map CMC data to our format
    const prices = {};
    data.data.forEach(coin => {
      const coinName = COIN_MAPPING[coin.symbol];
      if (coinName) {
        prices[coinName] = { usd: coin.quote.USD.price };
      }
    });

    // Update cache
    priceCache.prices = prices;
    priceCache.lastUpdate = new Date();

    console.log('Prices updated successfully at', priceCache.lastUpdate);

    // Emit updates to WebSocket clients
    if (wss) {
      const message = JSON.stringify(priceCache);
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    }

    return priceCache;

  } catch (error) {
    console.error('Failed to fetch prices from CoinMarketCap:', error.message);
    // Keep old prices if fetch fails
    return priceCache;
  }
}

/**
 * Starts the price update interval
 * Fetches immediately, then every CACHE_DURATION
 */
function startPriceUpdates(wss) {
  // Initial fetch
  fetchPrices(wss);

  // Set up interval for subsequent fetches
  setInterval(() => fetchPrices(wss), CACHE_DURATION);
}

export { getPrices, startPriceUpdates, fetchPrices };