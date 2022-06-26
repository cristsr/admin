const plugin = require('tailwindcss/plugin');

const themes = ['indigo', 'blue', 'amber', 'emerald', 'rose', 'accent', 'warn'];

const theming = (options) => {
  return ({ addComponents, e, theme }) => {
    const themes = options.themes;
  };
};

module.exports = plugin.withOptions(theming);
