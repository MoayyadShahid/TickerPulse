import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-error-dark/10 rounded-lg text-center animate-fade-in">
      <AlertCircle className="text-error mb-2" size={24} />
      <p className="text-body text-error mb-3">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-surface hover:bg-surface/80 rounded-md text-text transition-colors"
          aria-label="Retry"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;