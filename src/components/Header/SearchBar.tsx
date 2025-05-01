import React, { useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';
import { SearchSuggestion } from '../../types';

interface SearchBarProps {
  query: string;
  suggestions: SearchSuggestion[];
  isLoading: boolean;
  error: string | null;
  showSuggestions: boolean;
  onQueryChange: (query: string) => void;
  onSelectSuggestion: (suggestion: SearchSuggestion) => void;
  onClearSearch: () => void;
  onBlur: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  query,
  suggestions,
  isLoading,
  error,
  showSuggestions,
  onQueryChange,
  onSelectSuggestion,
  onClearSearch,
  onBlur,
}) => {
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close suggestions dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        onBlur();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onBlur]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-text-secondary" aria-hidden="true" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Enter stock ticker or company name"
          className="w-full pl-10 pr-10 py-3 bg-surface-light dark:bg-surface-dark border border-text-secondary/20 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg text-text-light dark:text-text-dark placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark outline-none transition-colors"
          aria-label="Search stocks"
          aria-expanded={showSuggestions}
          aria-controls="search-suggestions"
        />
        
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {isLoading ? (
            <LoadingSpinner size="small" />
          ) : query ? (
            <button
              onClick={onClearSearch}
              className="text-text-secondary hover:text-text transition-colors"
              aria-label="Clear search"
            >
              <X className="h-5 w-5" />
            </button>
          ) : null}
        </div>
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && (query.length > 0) && (
        <div
          ref={suggestionsRef}
          id="search-suggestions"
          className="absolute z-10 mt-1 w-full bg-surface-light dark:bg-surface-dark border border-text-secondary/20 rounded-lg shadow-lg max-h-60 overflow-auto animate-fade-in"
          role="listbox"
        >
          {error ? (
            <div className="p-3 text-error text-body">{error}</div>
          ) : suggestions.length === 0 && !isLoading ? (
            <div className="p-3 text-text-secondary text-body">No results found</div>
          ) : (
            suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                onClick={() => onSelectSuggestion(suggestion)}
                className="px-4 py-3 flex flex-col cursor-pointer hover:bg-background-light dark:hover:bg-background-dark transition-colors"
                role="option"
                aria-selected="false"
              >
                <span className="font-semibold text-headline">{suggestion.symbol}</span>
                <span className="text-text-secondary text-meta">
                  {suggestion.name} • {suggestion.type.toUpperCase()}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;