// src/services/newsService.ts
import type { Article } from '../types';

const FINNHUB_KEY = import.meta.env.VITE_FINNHUB_KEY;

// Fetches the last 7 days of company news from Finnhub
export async function fetchNewsArticles(ticker?: string): Promise<Article[]> {
  if (!ticker) return [];
  
  // Validate API key
  if (!FINNHUB_KEY) {
    console.error('VITE_FINNHUB_KEY is not set');
    return [];
  }

  // Build date range: today and seven days ago
  const toDate = new Date().toISOString().split('T')[0];
  const fromDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  const url = `https://finnhub.io/api/v1/company-news?symbol=${encodeURIComponent(
    ticker
  )}&from=${fromDate}&to=${toDate}&token=${FINNHUB_KEY}`;

  try {
    console.log(`Fetching news for ${ticker} from Finnhub...`);
    const res = await fetch(url);
    
    if (!res.ok) {
      throw new Error(`Finnhub API error: ${res.status} ${res.statusText}`);
    }
    
    const data: Array<{
      id: number;
      source: string;
      headline: string;
      summary: string;
      url: string;
      datetime: number;
      image: string;
    }> = await res.json();

    console.log(`Found ${data.length} articles for ${ticker}`);

    return data.map(item => ({
      id: `finnhub-${item.id}`,
      source: item.source,
      headline: item.headline,
      description: item.summary,
      url: item.url,
      publishedAt: new Date(item.datetime * 1000).toISOString(),
      imageUrl: item.image,
    }));
  } catch (err: unknown) {
    console.error('Error fetching news from Finnhub:', err);
    return [];
  }
}
