/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bozo: {
          DEFAULT: '#6b7280', // Gris neutro (tailwind gray-500)
          dark: '#374151',    // Gris oscuro (tailwind gray-700)
        },
      },
      fontFamily: {
        display: ['Geist', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}; 