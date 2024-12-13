/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#4A90E2',
          purple: '#8A2BE2',
          lightBlue: '#87CEFA',
          white: '#FFFFFF',
        },
        background: {
          dark: '#1C1C1C',
          black: '#000000',
        },
        accent: {
          violet: '#6A5ACD',
          electric: '#7DF9FF',
        }
      },
      container: {
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1126px',
          xl: '1280px',
          '2xl': '1536px',
        },
      },
    },
  },
  plugins: [],
}