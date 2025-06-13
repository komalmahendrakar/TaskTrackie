// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // ✅ Add this to ensure Tailwind works on index.html
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend:{
     keyframes: {
         shine: {
           '0%': { 'background-position': '100%' },
           '100%': { 'background-position': '-100%' },
         },
       },
       animation: {
         shine: 'shine 5s linear infinite',
       }, 
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        poetsen: ['"Poetsen One"', 'cursive'],
      },
    },
  },
  plugins: [],
};
