import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Article, NewsSource } from '../../types';
import SourceSection from './SourceSection';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { fetchNewsArticles } from '../../services/newsService';

interface NewsContainerProps {
  ticker?: string;
}

const NewsContainer: React.FC<NewsContainerProps> = ({ ticker }) => {
  const [articlesBySource, setArticlesBySource] = useState<Record<NewsSource, Article[]>>({
    'CNBC': [],
    'Bloomberg': [],
    'Yahoo Finance': [],
    'WSJ': [],
    'Economist': [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const observer = useRef<IntersectionObserver | null>(null);
  const loadingRef = useCallback((node: HTMLDivElement | null) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [isLoading, hasMore]);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const articles = await fetchNewsArticles(ticker);
        const grouped = articles.reduce((acc, article) => {
          if (!acc[article.source]) {
            acc[article.source] = [];
          }
          acc[article.source].push(article);
          return acc;
        }, {} as Record<NewsSource, Article[]>);
        
        setArticlesBySource(grouped);
        setHasMore(false);
      } catch (err) {
        setError('Failed to fetch news articles. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchArticles();
  }, [ticker]);

  const handleRetry = () => {
    setPage(1);
    setArticlesBySource({
      'CNBC': [],
      'Bloomberg': [],
      'Yahoo Finance': [],
      'WSJ': [],
      'Economist': [],
    });
    setHasMore(true);
  };

  if (error) {
    return (
      <div className="p-8 flex justify-center">
        <ErrorMessage message={error} onRetry={handleRetry} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading && page === 1 ? (
        <div className="py-12 flex justify-center">
          <LoadingSpinner size="large" />
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-8 px-2">
            {ticker ? `Latest News for ${ticker}` : 'Market Headlines'}
          </h2>
          
          <div className="space-y-6">
            {Object.entries(articlesBySource).map(([source, articles]) => (
              <SourceSection 
                key={source} 
                source={source as NewsSource} 
                articles={articles} 
              />
            ))}
          </div>
          
          {hasMore && (
            <div ref={loadingRef} className="py-6 flex justify-center">
              {isLoading && <LoadingSpinner size="medium" />}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NewsContainer;