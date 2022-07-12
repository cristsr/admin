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

  const grayish = colors.neutral;

  const utils = {
    '.bg-light': {
      backgroundColor: grayish[100],
    },
    '.bg-dark': {
      backgroundColor: grayish[900],
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
      backgroundColor: grayish[800],
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

  // white rgb(255, 255, 255)
  // black rgb(0, 0, 0)
  const material = {
    ':root': {
      // Common variables
      '--light-primary-text': '#FFFFFF',
      '--light-secondary-text': 'rgba(255, 255, 255, 0.7)',
      '--light-disabled-text': 'rgba(255, 255, 255, 0.5)',
      '--light-dividers': 'rgba(255, 255, 255, 0.12)',
      '--light-focused': 'rgba(255, 255, 255, 0.12)',

      '--dark-primary-text': 'rgba(0, 0, 0, 0.87)',
      '--dark-secondary-text': 'rgba(0, 0, 0, 0.54)',
      '--dark-disabled-text': 'rgba(0, 0, 0, 0.38)',
      '--dark-dividers': 'rgba(0, 0, 0, 0.12)',
      '--dark-focused': 'rgba(0, 0, 0, 0.12)',

      // Background palette for light theme.
      '--bg-light-status-bar': grayish[300],
      '--bg-light-bar': grayish[100],
      '--bg-light-background': grayish[50],
      '--bg-light-hover': '',
      '--bg-light-card': '',
      '--bg-light-dialog': '',
      '--bg-light-disabled-button': '',
      '--bg-light-raised-button': '',
      '--bg-light-selected-button': grayish[300],
      '--bg-light-selected-disabled-button': grayish[400],
      '--bg-light-disabled-button-toggle': grayish[200],
      '--bg-light-unselected-chip': grayish[300],
      '--bg-light-disabled-list-option': grayish[200],
      '--bg-light-tooltip': grayish[700],

      // Background palette for dark theme.
      '--bg-dark-status-bar': grayish[900],
      '--bg-dark-bar': grayish[900],
      '--bg-dark-background': grayish[900],
      '--bg-dark-hover': '',
      '--bg-dark-card': grayish[800],
      '--bg-dark-dialog': grayish[800],
      '--bg-dark-disabled-button': '',
      '--bg-dark-raised-button': grayish[800],
      '--bg-dark-selected-button': grayish[900],
      '--bg-dark-selected-disabled-button': grayish[800],
      '--bg-dark-disabled-button-toggle': '',
      '--bg-dark-unselected-chip': grayish[700],
      '--bg-dark-disabled-list-option': '',
      '--bg-dark-tooltip': grayish[700],
    },
  };

  addUtilities(material);
};

module.exports = plugin(theming);
