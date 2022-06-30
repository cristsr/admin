const colors = require('tailwindcss/colors');
const mapColors = Object.keys(colors).join('|');
const config = require('./src/assets/tailwind.json');

module.exports = {
  prefix: '',
  darkMode: 'class',
  content: ['./src/**/*.{html,ts,css,scss,sass}'],
  safelist: [
    ...config.colors.map((v) => v.name),
    {
      pattern: new RegExp(
        `(bg|text|border)-(${mapColors})-(100|200|300|400|500|600|700)`,
      ),
    },
  ],
  theme: {
    colors,
  },
  plugins: [
    require('./src/tailwind/theming'),
    require('@tailwindcss/typography'),
  ],
};
