/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        sm:'250px'
      },
      colors:{
        customBaseColors:'#202124'
      }
    },
  },
  plugins: [],
}