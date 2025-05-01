import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BarChart3, LineChart, TrendingUp, Newspaper, Globe2 } from 'lucide-react';
import { Article, NewsSource } from '../../types';
import ArticleCard from './ArticleCard';

interface SourceSectionProps {
  source: NewsSource;
  articles: Article[];
}

const getSourceIcon = (source: NewsSource) => {
  const iconProps = {
    size: 24,
    className: "text-primary mr-2",
    strokeWidth: 2
  };

  switch(source) {
    case 'CNBC':
      return <Newspaper {...iconProps} />;
    case 'Bloomberg':
      return <BarChart3 {...iconProps} />;
    case 'Yahoo Finance':
      return <TrendingUp {...iconProps} />;
    case 'WSJ':
      return <LineChart {...iconProps} />;
    case 'Economist':
      return <Globe2 {...iconProps} />;
    default:
      return null;
  }
};

const SourceSection: React.FC<SourceSectionProps> = ({ source, articles }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  if (articles.length === 0) {
    return null;
  }
  
  const latestArticleDate = new Date(
    Math.max(...articles.map(article => new Date(article.publishedAt).getTime()))
  );
  
  const formatLastUpdated = () => {
    return latestArticleDate.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <section className="mb-8 bg-background-light dark:bg-background-dark rounded-xl overflow-hidden border border-text-secondary-light/10 dark:border-text-secondary-dark/10">
      <div 
        className="flex items-center justify-between p-4 bg-surface-light dark:bg-surface-dark border-b border-text-secondary-light/10 dark:border-text-secondary-dark/10 cursor-pointer hover:bg-background-light dark:hover:bg-background-dark transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            {getSourceIcon(source)}
            <span className="text-headline font-bold">{source}</span>
          </div>
          <span className="text-meta text-text-secondary-light dark:text-text-secondary-dark">
            Last updated: {formatLastUpdated()}
          </span>
        </div>
        <button 
          aria-expanded={isExpanded}
          aria-controls={`${source.toLowerCase().replace(' ', '-')}-articles`}
          className="p-2 hover:bg-surface-light dark:hover:bg-surface-dark rounded-full transition-colors"
        >
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>
      
      {isExpanded && (
        <div 
          id={`${source.toLowerCase().replace(' ', '-')}-articles`}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6 animate-fade-in"
        >
          {articles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </section>
  );
};

export default SourceSection;