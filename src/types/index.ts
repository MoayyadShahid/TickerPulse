// src/types/index.ts
export type Article = {
  id: string;
  source: string; // Keep it generic for now
  headline: string;
  description: string;
  url: string;
  publishedAt: string;
  imageUrl?: string;
};

export type NewsSource = string; // Temporarily loosen type for dynamic sources

export interface SearchSuggestion {
  id: string;
  symbol: string;
  name: string;
  type: 'stock' | 'company' | 'etf' | 'index';
}