/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: {
          950: 'rgba(35,31,32,1)',
          500: 'rgba(35,31,32,0.5)',
          300: 'rgba(35,31,32,0.3)',
          200: 'rgba(35,31,32,0.2)',
          100: 'rgba(35,31,32,0.1)',
          50: 'rgba(35,31,32,0.05)',
          10: 'rgba(35,31,32,0.0001)',
        },
        secondary: {
          950: 'rgb(113,113,113)',
          500: 'rgba(113,113,113,0.5)',
          300: 'rgba(113,113,113,0.3)',
          200: 'rgba(113,113,113,0.2)',
          100: 'rgba(113,113,113,0.1)',
          50: 'rgba(113,113,113,0.05)',
        },
        inputColor: {
          950: 'rgb(53,50,46)',
        },
        main: {
          50: 'rgba(68,148,201,1)',
        }
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
  },
  plugins: [],
}