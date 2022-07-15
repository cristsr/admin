const plugin = require('tailwindcss/plugin');
const tailwindColors = require('tailwindcss/colors');
const chroma = require('chroma-js');
const config = require('../assets/tailwind.json');
const colors = require('tailwindcss/colors');

const createScheme = (config) => {
  const { color, hue } = config;
  const scheme = tailwindColors[color];
  scheme.main = scheme[hue];
  return scheme;
};

const cssProps = (scheme, name) => {
  return scheme.map(([key, value]) => [`--${name}-${key}`, value]);
};

const generateContrast = (scheme) => {
  const dark = scheme.reduce((acc, [_, color]) => {
    return chroma.contrast(color, '#FFFFFF') > chroma.contrast(acc, '#FFFFFF')
      ? color
      : acc;
  }, '#FFFFFF');

  return scheme.map(([key, color]) => {
    return chroma.contrast(color, dark) > chroma.contrast(color, '#FFFFFF')
      ? [key, dark]
      : [key, '#FFFFFF'];
  });
};

const generatePalette = (scheme, paletteName) => {
  const schemaEntries = Object.entries(scheme);
  const colors = cssProps(schemaEntries, paletteName);
  const contrastEntries = generateContrast(schemaEntries);
  const contrast = cssProps(contrastEntries, `contrast-${paletteName}`);
  return Object.fromEntries([...colors, ...contrast]);
};

const generatePalettes = () => {
  const palettes = config.palettes;

  const primary = Object.fromEntries(
    palettes.primary.map((config) => {
      const palette = generatePalette(createScheme(config), 'primary');
      return ['body.theme-' + config.color, palette];
    }),
  );
  const accent = generatePalette(createScheme(palettes.accent), 'accent');
  const warn = generatePalette(createScheme(palettes.warn), 'warn');

  return {
    ...primary,
    body: {
      ...accent,
      ...warn,
    },
  };
};

const theming = ({ addBase, addUtilities }) => {
  const palettes = generatePalettes();
  addBase(palettes);

  const grayish = colors.slate;

  // Common vars
  const lightDefaultText = grayish[300];
  const lightSecondaryText = grayish[400];

  const darkDefaultText = grayish[700];
  const darkSecondaryText = grayish[600];

  const materialConfig = {
    ':root': {
      // Common variables
      '--light-default-text': lightDefaultText,
      '--light-secondary-text': lightSecondaryText,
      '--light-disabled-text': grayish[400],
      '--light-dividers': chroma(grayish[100]).alpha(0.12).css(),
      '--light-focused': grayish[200],

      '--dark-default-text': darkDefaultText,
      '--dark-secondary-text': darkSecondaryText,
      '--dark-disabled-text': grayish[400],
      '--dark-dividers': grayish[200],
      '--dark-focused': grayish[500],

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

  addBase(materialConfig);

  const scheme = {
    'body.light': {
      '--bg-default': grayish[100],
      '--fg-default': '#ffffff',
      '--text-default': darkDefaultText,
      '--text-secondary': darkSecondaryText,
    },
    'body.dark': {
      '--bg-default': grayish[900],
      '--fg-default': grayish[800],
      '--text-default': lightDefaultText,
      '--text-secondary': lightSecondaryText,
    },
  };

  addUtilities(scheme);

  const utils = {
    '.bg-default': {
      backgroundColor: 'var(--bg-default)',
    },
    '.bg-primary': {
      backgroundColor: 'var(--primary-main)',
    },

    '.fg-default': {
      backgroundColor: 'var(--fg-default)',
    },

    '.text-default': {
      color: 'var(--text-default)',
    },
    '.text-primary': {
      color: 'var(--primary-main)',
    },
    '.text-secondary': {
      color: 'var(--text-secondary)',
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
