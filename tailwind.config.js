/** @type {import('tailwindcss').Config} */
const {
  default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette');
module.exports = {
  important: true,
  content: ['./src/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,ts,jsx,tsx,mdx'],
  theme: {
    screens: {
      se: { min: '0px', max: '768px' },
      md: { min: '1px', max: '768px' },
      lg: { min: '769px', max: '1279px' },
      xl: { min: '1280px', max: '1535px' },
      '2xl': { min: '1536px' },
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },

    extend: {
      screens: {
        sm: '250px',
      },
      colors: {
        customBaseColors: '#202124',
      },
    },
  },
  plugins: [addVariablesForColors],
};
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme('colors'));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  );

  addBase({
    ':root': newVars,
  });
}
