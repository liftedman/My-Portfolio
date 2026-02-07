import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00d9ff',
        secondary: '#a78bfa',
        accent: '#10b981',
        danger: '#ff6b6b',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(167, 139, 250, 0.1) 100%)',
        'gradient-secondary': 'linear-gradient(to top right, rgba(15, 23, 42, 0.4), rgba(147, 51, 234, 0.2))',
        'gradient-vivid': 'linear-gradient(to right, #00d9ff, #a78bfa, #10b981, #ff6b6b)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(6, 182, 212, 0.5), 0 0 40px rgba(6, 182, 212, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 30px rgba(6, 182, 212, 0.8), 0 0 60px rgba(6, 182, 212, 0.5)',
          },
        },
        shimmer: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
      boxShadow: {
        'glow-cyan': '0 0 30px rgba(6, 182, 212, 0.4), 0 0 60px rgba(6, 182, 212, 0.2)',
        'glow-purple': '0 0 30px rgba(167, 139, 250, 0.4), 0 0 60px rgba(167, 139, 250, 0.2)',
        'glow-neon': '0 0 30px rgba(16, 185, 129, 0.4), 0 0 60px rgba(16, 185, 129, 0.2)',
      },
    },
  },
  plugins: [],
};

export default config;
