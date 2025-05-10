// src/services/newsService.ts
import type { Article } from '../types';

interface NewsApiArticle {
  source: { id: string | null; name: string };
  title: string;
  description?: string | null;
  url: string;
  urlToImage?: string | null;
  publishedAt: string;
}

interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsApiArticle[];
  code?: string;
  message?: string;
}

export async function fetchNewsArticles(ticker?: string): Promise<Article[]> {
  if (!ticker) return [];

  const url = `/api/news?ticker=${encodeURIComponent(ticker)}`;

  try {
    const response = await fetch(url);
    const data: NewsApiResponse = await response.json();

    if (data.status !== 'ok') {
      throw new Error(data.message || 'Failed to fetch news articles.');
    }

    return data.articles.map((item, idx) => ({
      id: `newsapi-${idx}`,
      source: item.source.name,
      headline: item.title,
      description: item.description || '',
      url: item.url,
      publishedAt: item.publishedAt,
      imageUrl: item.urlToImage || '',
    }));
  } catch (error) {
    console.error('Error fetching news via proxy:', error);
    return [];
  }
}
