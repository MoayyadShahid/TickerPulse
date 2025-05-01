import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  color = 'border-primary' 
}) => {
  const sizeClasses = {
    small: 'w-4 h-4 border-[2px]',
    medium: 'w-8 h-8 border-[3px]',
    large: 'w-12 h-12 border-[4px]',
  };

  return (
    <div className="flex justify-center items-center">
      <div 
        className={`${sizeClasses[size]} ${color} border-t-transparent rounded-full animate-spin`}
        role="status" 
        aria-label="Loading"
      />
    </div>
  );
};

export default LoadingSpinner;