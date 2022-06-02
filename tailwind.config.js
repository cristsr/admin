const colors = require('tailwindcss/colors');

const { guessProductionMode } = require('@ngneat/tailwind');

process.env.TAILWIND_MODE = guessProductionMode() ? 'build' : 'watch';

console.log(`Running Tailwind in ${process.env.TAILWIND_MODE} mode`);

const mapColors = Object.keys(colors).join('|');

module.exports = {
  content: ['./src/**/*.{html,ts,css,scss,sass}'],
  purge: {
    options: {
      safelist: [
        {
          pattern: new RegExp(
            `(bg|text|border)-(${mapColors})-(100|200|300|400|500)`,
          ),
        },
      ],
    },
  },
  theme: {
    colors,
    // extend: {
    //   gridTemplateColumns: {
    //     auto: 'auto 1fr',
    //   },
    //   gridTemplateRows: {
    //     auto: 'auto 1fr',
    //   },
    // },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
