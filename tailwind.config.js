/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        champagne: {
          400: '#fde68a',
          500: '#f59e0b',
          600: '#d97706',
        },
        rosewood: {
          400: '#fb7185',
          500: '#f43f5e',
        }
      }
    },
  },
  plugins: [],
}
