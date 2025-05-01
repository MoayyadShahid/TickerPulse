/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          light: '#F8F9FA',
          dark: '#121212',
        },
        surface: {
          light: '#FFFFFF',
          dark: '#1E1E1E',
        },
        card: {
          light: '#FFFFFF',
          dark: 'rgba(255, 255, 255, 0.12)',
        },
        text: {
          light: '#1A1B2E',
          dark: '#E1E1E1',
          secondary: {
            light: '#64748B',
            dark: '#9E9E9E',
          },
        },
        primary: {
          light: '#4F46E5',
          DEFAULT: '#6366F1',
          dark: '#818CF8',
        },
        secondary: {
          light: '#3B82F6',
          DEFAULT: '#60A5FA',
          dark: '#93C5FD',
        },
        accent: {
          light: '#F59E0B',
          DEFAULT: '#FBBF24',
          dark: '#FCD34D',
        },
        success: {
          light: '#10B981',
          DEFAULT: '#34D399',
          dark: '#6EE7B7',
        },
        warning: {
          light: '#F59E0B',
          DEFAULT: '#FBBF24',
          dark: '#FCD34D',
        },
        error: {
          light: '#EF4444',
          DEFAULT: '#F87171',
          dark: '#FCA5A5',
        },
      },
      boxShadow: {
        card: '0 2px 4px rgba(0, 0, 0, 0.2)',
        'card-hover': '0 4px 8px rgba(0, 0, 0, 0.3)',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          '"Fira Sans"',
          '"Droid Sans"',
          '"Helvetica Neue"',
          'sans-serif',
        ],
      },
      fontSize: {
        'headline': ['18px', '1.4'],
        'body': ['14px', '1.6'],
        'meta': ['12px', '1.4'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};