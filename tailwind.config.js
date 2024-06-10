/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#12372A',
        secondary: '#436850',
        tertiary: '#ADBC9F',
        quaternary: '#FBFADA',
      },
    },
  },
  plugins: [],
};

