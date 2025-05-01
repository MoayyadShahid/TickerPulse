import React from 'react';
import { Article } from '../../types';
import { ExternalLink } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    }
  };

  const publishedTime = formatDate(article.publishedAt);

  return (
    <article className="bg-card-light dark:bg-card-dark rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] transform hover:scale-[1.02] transition-all duration-300 h-full">
      <div className="p-6 flex flex-col h-full">
        <header className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-meta font-semibold text-primary-light">{article.source}</span>
          </div>
          <h2 className="text-headline font-semibold line-clamp-2">
            {article.headline}
          </h2>
        </header>
        
        <div className="mb-4 flex-grow">
          <p className="text-body text-text-secondary line-clamp-2">
            {article.description}
          </p>
        </div>
        
        <footer className="flex items-center justify-between text-meta text-text-secondary mt-auto">
          <span>{publishedTime}</span>
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-primary hover:text-primary-light transition-colors"
            aria-label={`Read more about ${article.headline}`}
          >
            Read more <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </footer>
      </div>
    </article>
  );
};

export default ArticleCard;