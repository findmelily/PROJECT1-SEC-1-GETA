/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["MNPuKhem", "Helvetica", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
