/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Monoton", "sans-serif"],
        flux: ["Afacad Flux", "serif"],
      },
    },
  },
  plugins: [],
};
