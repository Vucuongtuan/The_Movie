/** @type {import('tailwindcss').Config} */
const {
  default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette');
const flowbite = require('flowbite-react/tailwind');
module.exports = {
  important: true,
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,ts,jsx,tsx,mdx',
    flowbite.content(),
  ],
  theme: {
    screens: {
      se: { min: '0px', max: '768px' },
      md: { min: '1px', max: '768px' },
      lg: { min: '769px', max: '1000px' },
      xl: { min: '1001px', max: '1535px' },
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
      animation: {
        aurora: 'aurora 60s linear infinite',
      },
      colors: {
        customBaseColors: '#202124',
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: '50% 50%, 50% 50%',
          },
          to: {
            backgroundPosition: '350% 50%, 350% 50%',
          },
        },
      },
    },
  },
  plugins: [addVariablesForColors, flowbite.plugin()],
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
