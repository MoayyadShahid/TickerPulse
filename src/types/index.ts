export interface Article {
  id: string;
  source: NewsSource;
  headline: string;
  description: string;
  url: string;
  publishedAt: string;
  imageUrl?: string;
}

export type NewsSource = 'CNBC' | 'Bloomberg' | 'Yahoo Finance' | 'WSJ' | 'Economist';

export interface SearchSuggestion {
  id: string;
  symbol: string;
  name: string;
  type: 'stock' | 'company' | 'etf' | 'index';
}