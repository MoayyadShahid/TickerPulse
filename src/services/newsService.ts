import { supabase } from '../lib/supabase';
import type { Article, NewsSource } from '../types';

export async function fetchNewsArticles(ticker?: string): Promise<Article[]> {
  try {
    const query = supabase
      .from('news_articles')
      .select(`
        id,
        headline,
        description,
        url,
        image_url,
        published_at,
        news_sources (
          name
        )
      `)
      .order('published_at', { ascending: false });

    if (ticker) {
      query.eq('stock_symbol', ticker);
    }

    const { data, error } = await query.limit(50);

    if (error) throw error;

    return data.map(article => ({
      id: article.id,
      source: article.news_sources.name as NewsSource,
      headline: article.headline,
      description: article.description || '',
      url: article.url,
      publishedAt: article.published_at,
      imageUrl: article.image_url,
    }));
  } catch (error) {
    console.error('Error fetching news articles:', error);
    throw error;
  }
}