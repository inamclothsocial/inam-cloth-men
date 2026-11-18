/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          300: '#9BC4B4',
          400: '#83B6A3',
          500: '#6fa993',
          600: '#568977',
          700: '#426E5F',
        },
        gold: {
          300: '#F0E2C6',
          400: '#DFC998',
          500: '#CAB27E',
          600: '#B0955C',
          700: '#957C44',
        },
        ivory: {
          50: '#FFFFFF',
          100: '#FBF8F2',
          200: '#F5EBDD',
          300: '#E9D8C4',
        },
        charcoal: {
          900: '#18221F',
          700: '#34403B',
          500: '#6F756F',
          300: '#9DA39E',
        },
      },
      fontFamily: {
        sans: ['"Poppins"', 'system-ui', 'sans-serif'],
        serif: ['"Poppins"', 'system-ui', 'sans-serif'],
        script: ['"Poppins"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(202, 178, 126, 0.08)',
        'luxury': '0 10px 30px -5px rgba(202, 178, 126, 0.15)',
        'floating': '0 20px 40px -10px rgba(202, 178, 126, 0.15)',
      },
    },
  },
  plugins: [],
}
