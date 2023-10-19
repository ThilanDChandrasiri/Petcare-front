/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'custom-fractions': '1.3fr .7fr',
        'custom-fractions1': '.7fr 1.3fr'
      },
      colors: {
        primary: '#5E6EED',
        primary2: '#574476',
        red1: '#F3797E',
        tablehead: '#eeecf1',
        bg1:'#D7A1F9',
        bg2:'#CE8CF8',
        bghome: '#eee'
      },
      fontFamily: {
        roboto: ['roboto regular']

      }


    },
  },
  plugins: [],
}