import axios from 'axios';

const MOCK_STOCK = { price: 9.42, change: -0.18, changePercent: -1.87 };
const BRAPI_TOKEN = process.env.REACT_APP_BRAPI_TOKEN;

export async function getStockQuote(ticker = 'SOJA3') {
  try {
    const params = BRAPI_TOKEN ? { token: BRAPI_TOKEN } : {};
    const { data } = await axios.get(`https://brapi.dev/api/quote/${ticker}`, {
      params,
      timeout: 5000,
    });
    const q = data.results?.[0];
    if (!q) return MOCK_STOCK;
    return {
      price: q.regularMarketPrice,
      change: q.regularMarketChange,
      changePercent: q.regularMarketChangePercent,
    };
  } catch {
    return MOCK_STOCK;
  }
}
