/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f6faf8',
          100: '#eef5f0',
          200: '#ddeae2',
          300: '#c8dcd1',
          400: '#a8c5b8',
          500: '#7db39a',
          600: '#669683',
          700: '#557a6d',
          800: '#466159',
          900: '#3a4d48',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
