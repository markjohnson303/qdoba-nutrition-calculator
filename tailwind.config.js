/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stroke: '#747579',
        macro: {
          protein: '#FF8660',
          fat: '#FFD15E',
          carb: '#5DBA87',
          calorie: '#689EFA'
        },
        background: {
          primary: '#141415',
          secondary: '#1F1F1F',
          tertiary: '#383838'
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#B4B4B4',
          tertiary: '#747579',
          dark: '#141415'
        },
        branding: {
          accent: '#5BD598',
          danger: '#FF6E4D',
          warning: '#F9D36D',
          info: '#2891FF'
        },
      },
      fontFamily: {
        sans: ["'Inter'", 'sans-serif']
      },
      fontSize: {
        titleBar: ['1.25rem', { lineHeight: '1.2', fontWeight: '700' }],
        sectionHeading: ['1.125rem', { lineHeight: '1.25', fontWeight: '600' }],
        caption: ['0.875rem', { lineHeight: '1.4', fontWeight: '400' }],
      },
      borderRadius: {
        'pill': '9999px',
      },
      boxShadow: {
        'card': '0 1px 1px rgba(0,0,0,0.32)',
        'level2': '0 2px 4px rgba(0,0,0,0.48)'
      }
    },
  },
  plugins: [
    function({ addComponents }) {
      addComponents({
        '.card': {
          '@apply bg-background-secondary rounded-lg': {},
        },
        '.tile': {
          '@apply bg-background-tertiary rounded': {},
        },
        '.btn-primary': {
          '@apply bg-white text-text-dark px-6 py-3 rounded-pill transition-all inline-flex items-center gap-2 hover:scale-105 active:bg-background-tertiary active:scale-95': {},
        },
        '.btn-secondary': {
          '@apply px-4 py-2 bg-background-tertiary text-text-primary rounded-pill transition-colors flex items-center gap-2 text-sm border border-stroke hover:scale-105 active:bg-background-tertiary active:scale-95': {},
        },
        '.btn-selection': {
          '@apply px-2 py-1 rounded text-xs text-text-primary border-[0.5px] border-transparent transition-colors duration-200 ease-in-out hover:scale-105 active:bg-background-tertiary active:scale-95 ease-in-out': {},
        },
        '.btn-selection-active': {
          '@apply bg-white text-text-dark': {},
        },
        '.btn-selection-inactive': {
          '@apply bg-background-tertiary hover:border-white': {},
        },
      })
    }
  ],
}