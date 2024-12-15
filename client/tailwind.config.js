/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["poppins", "sans-serif"],
        sans: ['ui-sans-serif', 'system-ui', 'sans-serif',],
      }
    },
  },
  plugins: [daisyui],
}

