// src/components/Header/Header.tsx
import React from 'react';
import { LineChart } from 'lucide-react';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';
import { useSearch } from '../../hooks/useSearch';
import type { SearchSuggestion } from '../../types';

interface HeaderProps {
  onSearch: (ticker: string | undefined) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const {
    query,
    suggestions,
    isLoading,
    error,
    showSuggestions,
    handleQueryChange,
    handleSelectSuggestion,
    handleClearSearch,
    setShowSuggestions,
  } = useSearch();

  const handleSuggestionSelect = (suggestion: SearchSuggestion) => {
    handleSelectSuggestion(suggestion);
    onSearch(suggestion.symbol);
  };

  const handleClear = () => {
    handleClearSearch();
    onSearch(undefined);
  };

  return (
    <header className="sticky top-0 z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-text-secondary-light/10 dark:border-text-secondary-dark/10 py-4 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-between w-full mb-6">
            <div className="flex items-center">
              <LineChart className="h-8 w-8 text-primary mr-2" />
              <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">TickerPulse</h1>
            </div>
            <ThemeToggle />
          </div>

          <div className="w-full lg:w-3/5 md:w-4/5">
            <SearchBar
              query={query}
              suggestions={suggestions}
              isLoading={isLoading}
              error={error}
              showSuggestions={showSuggestions}
              onQueryChange={handleQueryChange}
              onSelectSuggestion={handleSuggestionSelect}
              onClearSearch={handleClear}
              onBlur={() => setShowSuggestions(false)}
            />
            
            {query && !showSuggestions && (
              <div className="mt-3 text-center text-text-secondary-light dark:text-text-secondary-dark text-meta">
                Showing results for <span className="font-semibold text-text-light dark:text-text-dark">{query}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;