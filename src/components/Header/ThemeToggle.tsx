import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-full hover:bg-background-light dark:hover:bg-background-dark border border-text-secondary-light/20 dark:border-text-secondary-dark/20 transition-all duration-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_2px_8px_rgba(0,0,0,0.3)] focus:outline-none focus:ring-2 focus:ring-primary/50 active:scale-95"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-text-light dark:text-text-dark" />
      ) : (
        <Moon className="h-5 w-5 text-text-light dark:text-text-dark" />
      )}
    </button>
  );
};

export default ThemeToggle;