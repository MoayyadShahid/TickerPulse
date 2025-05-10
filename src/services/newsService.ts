// src/services/newsService.ts
import type { Article } from '../types';

const NEWS_API_KEY = import.meta.env.VITE_NEWSAPI_KEY;
// Domains for top reputable finance news outlets
const NEWS_DOMAINS = 'bloomberg.com,cnbc.com,reuters.com,wsj.com,ft.com';

interface NewsApiArticle {
  source: { id: string | null; name: string };
  author?: string | null;
  title: string;
  description?: string | null;
  url: string;
  urlToImage?: string | null;
  publishedAt: string;
  content?: string | null;
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

  const query = encodeURIComponent(ticker);
  const url = `https://newsapi.org/v2/everything?q=${query}&domains=${NEWS_DOMAINS}&language=en&sortBy=publishedAt&pageSize=40&apiKey=${NEWS_API_KEY}`;

  try {
    const response = await fetch(url);
    const data: NewsApiResponse = await response.json();

    if (data.status !== 'ok') {
      throw new Error(data.message || 'Failed to fetch news articles.');
    }

    return data.articles.map((item, index) => ({
      id: `newsapi-${index}`,
      source: item.source.name,
      headline: item.title,
      description: item.description || '',
      url: item.url,
      publishedAt: item.publishedAt,
      imageUrl: item.urlToImage || '',
    }));
  } catch (error) {
    console.error('Error fetching from NewsAPI:', error);
    return [];
  }
}
