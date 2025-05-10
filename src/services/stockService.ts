// src/services/stockService.ts
import type { SearchSuggestion } from '../types';

const FINNHUB_KEY = import.meta.env.VITE_FINNHUB_KEY;

interface FinnhubResult {
  symbol: string;
  description: string;
}

export async function searchStocks(query: string): Promise<SearchSuggestion[]> {
  if (!query.trim()) return [];

  const url = `https://finnhub.io/api/v1/search?q=${encodeURIComponent(
    query
  )}&token=${FINNHUB_KEY}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Finnhub search failed: ${res.status}`);
    }
    const { result }: { result: FinnhubResult[] } = await res.json();

    // Map the Finnhub result to your SearchSuggestion type
    return (result || []).slice(0, 10).map(r => ({
      id: r.symbol,
      symbol: r.symbol,
      name: r.description,
      type: 'stock',
    }));
  } catch (err) {
    console.error('Error searching stocks via Finnhub:', err);
    return [];
  }
}
