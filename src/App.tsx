import React, { useState } from 'react';
import Header from './components/Header/Header';
import NewsContainer from './components/NewsSection/NewsContainer';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [currentTicker, setCurrentTicker] = useState<string | undefined>(undefined);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (ticker: string | undefined) => {
    setCurrentTicker(ticker);
    setHasSearched(true);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark flex flex-col">
        <Header onSearch={handleSearch} />
        <main className="flex-grow">
          {!hasSearched ? (
            <div className="container mx-auto px-4 py-16 text-center">
              <h2 className="text-2xl font-semibold mb-4">
                Stay informed with the latest financial news
              </h2>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-lg max-w-2xl mx-auto">
                Search for a stock to get started. Enter a stock ticker or company name 
                to view the latest financial news from top sources.
              </p>
            </div>
          ) : (
            <NewsContainer ticker={currentTicker} />
          )}
        </main>
        <footer className="py-4 px-6 bg-surface-light dark:bg-surface-dark border-t border-text-secondary-light/10 dark:border-text-secondary-dark/10">
          <div className="container mx-auto">
            <p className="text-center text-text-secondary-light dark:text-text-secondary-dark text-meta">
              TickerPulse © {new Date().getFullYear()} - Financial news aggregator for educational purposes only
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;