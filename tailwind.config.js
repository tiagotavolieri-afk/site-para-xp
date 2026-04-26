/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#04080f',
        surface: '#080f1e',
        'surface-2': '#0c1628',
        border: '#132040',
        'border-light': '#1c2f57',
        blue: '#3B77BC',
        'blue-light': '#5a92d4',
        'blue-dark': '#2a5a96',
        red: '#DE482B',
        'red-light': '#e86a52',
        'red-dark': '#b83820',
        green: '#81C046',
        'green-light': '#9dd464',
        'green-dark': '#639632',
        yellow: '#FCCF03',
        'yellow-light': '#fdd835',
        'yellow-dark': '#d4ad00',
        muted: '#4a6080',
        'text-primary': '#eef2f7',
        'text-secondary': '#7a95b8',
        'text-muted': '#4a6080',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
