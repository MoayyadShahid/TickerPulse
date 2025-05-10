// src/services/newsService.ts
import type { Article } from '../types';

export async function fetchNewsArticles(ticker?: string): Promise<Article[]> {
  if (!ticker) return [];

  const url = `/api/news?ticker=${encodeURIComponent(ticker)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // NewsAPI’s response shape comes straight through, so:
    return data.articles.map((item: any, idx: number) => ({
      id: `newsapi-${idx}`,
      source: item.source.name,
      headline: item.title,
      description: item.description || '',
      url: item.url,
      publishedAt: item.publishedAt,
      imageUrl: item.urlToImage || '',
    }));
  } catch (err) {
    console.error("Error fetching news via proxy:", err);
    return [];
  }
}
