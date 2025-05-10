// src/data/mockData.ts
import { Article, NewsSource, SearchSuggestion } from '../types';

// Mock search suggestions
export const mockSearchSuggestions: SearchSuggestion[] = [
  { id: '1', symbol: 'AAPL', name: 'Apple Inc.', type: 'stock' },
  { id: '2', symbol: 'MSFT', name: 'Microsoft Corporation', type: 'stock' },
  { id: '3', symbol: 'GOOGL', name: 'Alphabet Inc.', type: 'stock' },
  { id: '4', symbol: 'AMZN', name: 'Amazon.com, Inc.', type: 'stock' },
  { id: '5', symbol: 'TSLA', name: 'Tesla, Inc.', type: 'stock' },
  { id: '6', symbol: 'META', name: 'Meta Platforms, Inc.', type: 'stock' },
  { id: '7', symbol: 'NFLX', name: 'Netflix, Inc.', type: 'stock' },
  { id: '8', symbol: 'SPY', name: 'SPDR S&P 500 ETF Trust', type: 'etf' },
  { id: '9', symbol: 'QQQ', name: 'Invesco QQQ Trust', type: 'etf' },
  { id: '10', symbol: '^GSPC', name: 'S&P 500 Index', type: 'index' },
];

// Mock articles
export const mockArticles: Article[] = [
  {
    id: '1',
    source: 'CNBC',
    headline: 'Apple\'s market cap surpasses $3 trillion as AI strategy gains momentum',
    description: 'Apple shares hit an all-time high on Tuesday, pushing the iPhone maker\'s market value above $3 trillion as investors bet on the company\'s AI strategy.',
    url: 'https://www.cnbc.com/article/apple-market-cap-3-trillion',
    publishedAt: '2025-01-15T14:30:00Z',
    imageUrl: 'https://images.pexels.com/photos/7255020/pexels-photo-7255020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '2',
    source: 'Bloomberg',
    headline: 'Microsoft\'s Azure revenue grows 31%, beating analysts\' expectations',
    description: 'Microsoft reported Azure cloud services growth that topped analysts\' predictions, signaling strong demand for AI-related computing power.',
    url: 'https://www.bloomberg.com/article/microsoft-earnings',
    publishedAt: '2025-01-14T22:15:00Z',
    imageUrl: 'https://images.pexels.com/photos/207580/pexels-photo-207580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '3',
    source: 'WSJ',
    headline: 'Google unveils next-generation AI search capabilities',
    description: 'Alphabet\'s Google announced significant upgrades to its search engine powered by advanced AI models, aiming to maintain its dominance in online search.',
    url: 'https://www.wsj.com/article/google-ai-search',
    publishedAt: '2025-01-14T18:45:00Z',
    imageUrl: 'https://images.pexels.com/photos/3760561/pexels-photo-3760561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '4',
    source: 'Yahoo Finance',
    headline: 'Amazon reports record holiday sales, shares jump 7%',
    description: 'Amazon.com Inc. reported its best-ever holiday quarter, boosted by Prime membership growth and expanding AWS cloud services.',
    url: 'https://finance.yahoo.com/article/amazon-holiday-sales',
    publishedAt: '2025-01-13T21:30:00Z',
    imageUrl: 'https://images.pexels.com/photos/4549428/pexels-photo-4549428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '5',
    source: 'Economist',
    headline: 'Tesla\'s robotaxi plans face regulatory hurdles in major markets',
    description: 'Elon Musk\'s ambitious timeline for Tesla\'s autonomous taxi service is meeting resistance from regulators in key markets including the US and Europe.',
    url: 'https://www.economist.com/article/tesla-robotaxi-regulations',
    publishedAt: '2025-01-12T09:15:00Z',
    imageUrl: 'https://images.pexels.com/photos/13861/IMG_3496bfree.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '6',
    source: 'CNBC',
    headline: 'Meta\'s Reality Labs division reports smaller-than-expected losses',
    description: 'Meta\'s metaverse and AR/VR unit posted lower quarterly losses than analysts had projected, potentially signaling improved efficiency in the company\'s long-term bet.',
    url: 'https://www.cnbc.com/article/meta-reality-labs-earnings',
    publishedAt: '2025-01-11T16:20:00Z',
    imageUrl: 'https://images.pexels.com/photos/6937496/pexels-photo-6937496.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '7',
    source: 'Bloomberg',
    headline: 'Nvidia unveils new AI chip with 2x performance of previous generation',
    description: 'Nvidia Corp. launched its latest AI accelerator chip, claiming twice the performance of its predecessor while using less power, maintaining its lead in the AI hardware race.',
    url: 'https://www.bloomberg.com/article/nvidia-new-ai-chip',
    publishedAt: '2025-01-10T13:45:00Z',
    imageUrl: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '8',
    source: 'Yahoo Finance',
    headline: 'Netflix subscriber growth accelerates, driven by ad-supported tier',
    description: 'Netflix added more subscribers than expected in the fourth quarter, with its lower-priced advertising tier gaining traction in key markets.',
    url: 'https://finance.yahoo.com/article/netflix-subscriber-growth',
    publishedAt: '2025-01-09T20:10:00Z',
    imageUrl: 'https://images.pexels.com/photos/16450/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '9',
    source: 'WSJ',
    headline: 'S&P 500 hits new record as earnings season begins on positive note',
    description: 'The S&P 500 index reached a new all-time high as the Q4 earnings season kicked off with better-than-expected results from major financial institutions.',
    url: 'https://www.wsj.com/article/sp500-record-earnings',
    publishedAt: '2025-01-08T22:30:00Z',
    imageUrl: 'https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '10',
    source: 'Economist',
    headline: 'Global chip shortage eases as new semiconductor plants come online',
    description: 'The prolonged semiconductor shortage that hampered industries from automobiles to consumer electronics is showing signs of improvement as manufacturing capacity expands.',
    url: 'https://www.economist.com/article/chip-shortage-easing',
    publishedAt: '2025-01-07T11:05:00Z',
    imageUrl: 'https://images.pexels.com/photos/3912992/pexels-photo-3912992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

// Group articles by source
export const getArticlesBySource = () => {
  const groupedArticles: Record<NewsSource, Article[]> = {
    'CNBC': [],
    'Bloomberg': [],
    'Yahoo Finance': [],
    'WSJ': [],
    'Economist': [],
  };

  mockArticles.forEach(article => {
    groupedArticles[article.source].push(article);
  });

  return groupedArticles;
};

// Simulate search delay
export const simulateSearch = (query: string): Promise<SearchSuggestion[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = mockSearchSuggestions.filter(
        suggestion => 
          suggestion.symbol.toLowerCase().includes(query.toLowerCase()) || 
          suggestion.name.toLowerCase().includes(query.toLowerCase())
      );
      resolve(results);
    }, 300);
  });
};

// Simulate fetching articles
export const simulateFetchArticles = (ticker: string): Promise<Article[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, we would filter based on ticker
      resolve(
       mockArticles.filter(a =>
         a.headline.toLowerCase().includes(ticker.toLowerCase())
       )
     );
    }, 800);
  });
};