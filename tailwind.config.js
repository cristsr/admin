const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');
const mapColors = Object.keys(colors).join('|');

const themes = {
  // Default theme is required for theming system to work correctly
  default: {
    primary: {
      ...colors.indigo,
      DEFAULT: colors.indigo[600],
    },
    accent: {
      ...colors.slate,
      DEFAULT: colors.slate[800],
    },
    warn: {
      ...colors.red,
      DEFAULT: colors.red[600],
    },
    'on-warn': {
      500: colors.red['50'],
    },
  },
  // Rest of the themes will use the 'default' as the base theme
  // and extend them with their given configuration
  indigo: {
    primary: {
      ...colors.teal,
      DEFAULT: colors.teal[600],
    },
  },
  rose: {
    primary: colors.rose,
  },
  purple: {
    primary: {
      ...colors.purple,
      DEFAULT: colors.purple[600],
    },
  },
  amber: {
    primary: colors.amber,
  },
};

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,ts,css,scss,sass}'],
  safelist: [
    {
      pattern: new RegExp(
        `(bg|text|border)-(${mapColors})-(100|200|300|400|500)`,
      ),
    },
  ],
  theme: {
    colors,
  },
  plugins: [
    require('@tailwindcss/typography'),

    plugin(function ({ addUtilities, addComponents, e, prefix, config }) {
      // Add your custom styles here
    }),
  ],
};
