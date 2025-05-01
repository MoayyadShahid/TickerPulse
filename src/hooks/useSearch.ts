import { useState, useEffect, useCallback } from 'react';
import { SearchSuggestion } from '../types';
import { searchStocks } from '../services/stockService';

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSuggestion, setSelectedSuggestion] = useState<SearchSuggestion | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchTickers = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setSuggestions([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const results = await searchStocks(searchQuery);
        setSuggestions(results);
      } catch (err) {
        setError('Failed to fetch suggestions. Please try again.');
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim()) {
        searchTickers(query);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, searchTickers]);

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
    setShowSuggestions(true);
    setSelectedSuggestion(null);
  };

  const handleSelectSuggestion = (suggestion: SearchSuggestion) => {
    setSelectedSuggestion(suggestion);
    setQuery(suggestion.symbol);
    setShowSuggestions(false);
  };

  const handleClearSearch = () => {
    setQuery('');
    setSuggestions([]);
    setSelectedSuggestion(null);
  };

  return {
    query,
    suggestions,
    isLoading,
    error,
    selectedSuggestion,
    showSuggestions,
    handleQueryChange,
    handleSelectSuggestion,
    handleClearSearch,
    setShowSuggestions,
  };
};