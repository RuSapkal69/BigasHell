/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        gradient: 'gradient 9s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%': { backgroundPosition: '100% 100%' },
          '50%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 100%' },
        },
      },
    },
    },
  plugins: [],
};