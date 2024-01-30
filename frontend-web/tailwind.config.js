/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light100: '#FAF6FF',
          100: '#832F55',
          dark100: '#200E35',
        },
        greyScale: {
          white: '#ffffff',
          grey100: '#FAFAFA',
          grey200: '#EEEEEE',
          grey300: '#d9d9d9',
          grey400: '#999999',
          grey500: '#767676',
          black: '#111111',
        },
      },

      fontFamily: {
        pretendard: ['pretendard'],
        inooariduri: ['inooariduri'],
        jsarirang: ['jsarirang'],
      },
    },
  },
  plugins: [],
};