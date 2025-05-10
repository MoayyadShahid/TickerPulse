// src/services/stockService.ts
import type { SearchSuggestion } from '../types';

const FINNHUB_KEY = import.meta.env.VITE_FINNHUB_KEY;
// Simple in‑memory cache for US symbols
let usSymbolsCache: Array<{ symbol: string; description: string }> | null = null;

// Helper to map Finnhub result to our type
function toSuggestion(r: { symbol: string; description: string }): SearchSuggestion {
  return {
    id: r.symbol,
    symbol: r.symbol,
    name: r.description,
    type: 'stock',
  };
}

export async function searchStocks(query: string): Promise<SearchSuggestion[]> {
  query = query.trim();
  if (!query) return [];

  // 1) Try the search endpoint
  const searchUrl = `https://finnhub.io/api/v1/search?q=${encodeURIComponent(
    query
  )}&token=${FINNHUB_KEY}`;
  try {
    const resp = await fetch(searchUrl);
    if (!resp.ok) throw new Error(`Search failed: ${resp.status}`);
    const { result }: { result: Array<{ symbol: string; description: string }> } =
      await resp.json();

    // 2) Filter for “plain” US tickers (no dot in the symbol)
    const plain = (result || []).filter(r => /^[A-Z]{1,5}$/.test(r.symbol));
    if (plain.length) {
      return plain.slice(0, 10).map(toSuggestion);
    }
  } catch (err) {
    console.warn('Finnhub /search error, will fallback:', err);
  }

  // 3) Fallback: fetch (and cache) all US symbols, then filter
  if (!usSymbolsCache) {
    const listUrl = `https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${FINNHUB_KEY}`;
    const listResp = await fetch(listUrl);
    if (!listResp.ok) throw new Error(`Symbol list failed: ${listResp.status}`);
    usSymbolsCache = await listResp.json();
  }

  const cache = usSymbolsCache ?? [];
  const matches = cache.filter(e =>
    e.symbol.toLowerCase().includes(query.toLowerCase()) ||
    e.description.toLowerCase().includes(query.toLowerCase())
  );

  return matches.slice(0, 10).map(toSuggestion);
}
