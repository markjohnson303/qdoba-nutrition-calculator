/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stroke: '#303030',
        macro: {
          protein: '#FF6E4D',
          fat: '#F9D36D',
          carb: '#5BD598',
          calorie: '#2891FF'
        },
        background: {
          primary: '#121212',
          secondary: '#1B1B1E',
          card: '#222325',
          surface: '#2C2C2F'
        },
        text: {
          primary: '#FFFFFF',
          secondary: 'rgba(255,255,255,0.66)',
          tertiary: 'rgba(255,255,255,0.38)'
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
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '300ms', 
        'slow': '450ms'
      },
      transitionTimingFunction: {
        'cardEase': 'cubic-bezier(0.4, 0, 0.2, 1)'
      }
    },
  },
  plugins: [],
}