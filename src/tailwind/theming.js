const plugin = require('tailwindcss/plugin');
const tailwindColors = require('tailwindcss/colors');
const chroma = require('chroma-js');
const config = require('../assets/tailwind.json');
const colors = require('tailwindcss/colors');

const createScheme = (name, main) => ({
  ...tailwindColors[name],
  main: tailwindColors[name][main],
});

const cssProps = (scheme, name) => {
  return scheme.map(([key, value]) => [`--${name}-${key}`, value]);
};

const generateContrast = (scheme) => {
  const dark = scheme.reduce((acc, [_, color]) => {
    if (chroma.contrast(color, '#FFFFFF') > chroma.contrast(acc, '#FFFFFF')) {
      return color;
    }

    return acc;
  }, '#FFFFFF');

  return scheme.map(([key, color]) => {
    if (chroma.contrast(color, dark) > chroma.contrast(color, '#FFFFFF')) {
      return [key, dark];
    }

    return [key, '#FFFFFF'];
  });
};

const generatePalette = ({ name, main, palette }) => {
  const scheme = createScheme(name, main);
  const schemaEntries = Object.entries(scheme);

  const colors = cssProps(schemaEntries, palette);

  const contrastEntries = generateContrast(schemaEntries);
  const contrast = cssProps(contrastEntries, `contrast-${palette}`);

  return Object.fromEntries([...colors, ...contrast]);
};

const theming = ({ addUtilities }) => {
  const primaryEntries = config.colors.map((config) => {
    const palette = generatePalette({ ...config, palette: 'primary' });
    return ['body.theme-' + config.name, palette];
  });

  const primary = Object.fromEntries(primaryEntries);
  const accent = generatePalette({ ...config.accent, palette: 'accent' });
  const warn = generatePalette({ ...config.warn, palette: 'warn' });

  const themes = {
    ...primary,
    body: {
      ...accent,
      ...warn,
    },
  };

  addUtilities(themes);

  const utils = {
    '.bg-light': {
      backgroundColor: colors.slate[100],
    },
    '.bg-dark': {
      backgroundColor: colors.slate[900],
    },
    '.bg-primary': {
      backgroundColor: 'var(--primary-main)',
    },
    '.bg-accent': {
      backgroundColor: 'var(--accent-main)',
    },
    '.bg-warn': {
      backgroundColor: 'var(--warn-main)',
    },

    '.fg-light': {
      backgroundColor: colors.white,
    },
    '.fg-dark': {
      backgroundColor: colors.slate[800],
    },

    '.text-primary': {
      color: 'var(--primary-main)',
    },
    '.text-secondary': {},
    '.text-accent': {
      color: 'var(--accent-main)',
    },
    '.text-warn': {
      color: 'var(--warn-main)',
    },

    '.border-primary': {
      border: '1px solid var(--primary-main)',
    },
    '.border-accent': {
      border: '1px solid var(--accent-main)',
    },
    '.border-warn': {
      border: '1px solid var(--warn-main)',
    },
  };

  addUtilities(utils);
};

module.exports = plugin(theming);
