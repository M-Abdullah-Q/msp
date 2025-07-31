/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'happy': ['Happy Monkey', 'cursive'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#e8f4ff',
          100: '#d1e9ff',
          200: '#a8d5ff',
          300: '#74b9ff',
          400: '#3e92ff',
          500: '#00A8E8',
          600: '#007EA7',
          700: '#005f7f',
          800: '#003459',
          900: '#00171F',
          950: '#000a0d',
        },
        accent: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-in': 'slideIn 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 168, 232, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 168, 232, 0.6)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        }
      },
      scrollBehavior: {
        smooth: 'smooth',
      }
    },
  },
  plugins: [],
};