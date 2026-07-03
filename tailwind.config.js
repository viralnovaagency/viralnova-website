/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#050507',
          900: '#08080c',
          850: '#0c0c12',
          800: '#101018',
          750: '#14141e',
          700: '#181826',
          650: '#1c1c2e',
          600: '#22223a',
          500: '#2a2a48',
        },
        neon: {
          50: '#f0f0ff',
          100: '#e0e0ff',
          200: '#c4b5ff',
          300: '#a78bfa',
          400: '#8b5cf6',
          500: '#7c3aed',
          600: '#6d28d9',
          700: '#5b21b6',
          800: '#4c1d95',
          900: '#2e1065',
        },
        electric: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        accent: {
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
        success: {
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
        },
        warning: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        error: {
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-sm': '0 0 20px -4px rgba(124, 58, 237, 0.5)',
        glow: '0 0 40px -8px rgba(124, 58, 237, 0.6)',
        'glow-lg': '0 0 60px -10px rgba(124, 58, 237, 0.7)',
        'glow-xl': '0 0 80px -12px rgba(124, 58, 237, 0.8)',
        'glow-blue': '0 0 40px -8px rgba(59, 130, 246, 0.5)',
        'glow-blue-lg': '0 0 60px -10px rgba(59, 130, 246, 0.6)',
        'glow-mix': '0 0 50px -8px rgba(124, 58, 237, 0.4), 0 0 30px -6px rgba(59, 130, 246, 0.3)',
        'glow-mix-lg': '0 0 70px -10px rgba(124, 58, 237, 0.5), 0 0 50px -8px rgba(59, 130, 246, 0.4)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 30px -8px rgba(124, 58, 237, 0.5)' },
          '50%': { boxShadow: '0 0 60px -6px rgba(124, 58, 237, 0.85)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out forwards',
        'fade-in': 'fade-in 0.8s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'spin-slow': 'spin-slow 18s linear infinite',
        shimmer: 'shimmer 3s linear infinite',
        'scale-in': 'scale-in 0.5s ease-out forwards',
        'gradient-shift': 'gradient-shift 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
