/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // PitchIQ design system
        canvas: '#EEF0F5', // light blue-grey page background
        ink: '#0a0a0a', // primary text / dark sections
        muted: '#6B7280', // secondary text
        hairline: '#C8D0E0', // borders & dividers
        primary: {
          DEFAULT: '#FF0000', // accent / CTA red
          hover: '#D60000',
        },
        // Dark-mode surfaces
        'dark-canvas': '#0a0a0a',
        'dark-surface': '#141414',
        'dark-hairline': '#262626',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'Times New Roman', 'serif'],
      },
      borderRadius: {
        DEFAULT: '12px',
        xl: '16px',
        '2xl': '20px',
        '3xl': '28px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(16, 24, 40, 0.04), 0 8px 24px rgba(16, 24, 40, 0.06)',
        card: '0 1px 3px rgba(16, 24, 40, 0.05), 0 12px 40px rgba(16, 24, 40, 0.08)',
        float: '0 24px 60px rgba(16, 24, 40, 0.16)',
        glow: '0 10px 40px rgba(255, 0, 0, 0.28)',
      },
      maxWidth: {
        container: '1200px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        aura: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.5' },
          '50%': { transform: 'scale(1.18)', opacity: '0.8' },
        },
        typeline: {
          '0%': { width: '0%' },
          '65%, 100%': { width: '100%' },
        },
        'caret-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(24px, -30px) scale(1.12)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.94)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shine: {
          '0%': { transform: 'translateX(-120%) skewX(-20deg)' },
          '100%': { transform: 'translateX(220%) skewX(-20deg)' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        float: 'float 6s ease-in-out infinite',
        'pulse-dot': 'pulse-dot 1.2s ease-in-out infinite',
        aura: 'aura 8s ease-in-out infinite',
        typeline: 'typeline 2.4s ease-out infinite',
        'caret-blink': 'caret-blink 1s steps(1) infinite',
        blob: 'blob 14s ease-in-out infinite',
        marquee: 'marquee 26s linear infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
        shine: 'shine 3.5s ease-in-out infinite',
        'spin-slow': 'spin-slow 18s linear infinite',
        'bounce-subtle': 'bounce-subtle 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
