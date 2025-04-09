// Mock functions for vanilla-extract CSS modules
export const atoms = jest.fn((props) => 'mock-atoms-class');
export const buttonStyle = jest.fn((props) => 'mock-button-style-class');
export const rowStyle = jest.fn(() => {
  return jest.fn(() => 'mock-row-style-class');
});
export const sectionStyle = {
  standard: 'mock-section-standard-class',
  alternate: 'mock-section-alternate-class',
};
export const composeWithAtoms = jest.fn((atomsProps, ...styles) => {
  return ['mock-composed-class', ...(styles || [])].filter(Boolean).join(' ');
});

// Mock for theme variables
export const vars = {
  colors: {
    primary: '#000',
    secondary: '#fff',
    black: '#000',
    dark: '#333',
    medium: '#666',
    light: '#ccc',
    white: '#fff',
  },
  spacers: {
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
  },
  backgrounds: {
    alternate: 'mock-alternate-bg',
    standard: 'mock-standard-bg',
  },
  contrastColors: {
    primary: '#fff',
    black: '#fff',
    dark: '#fff',
    light: '#000',
    medium: '#000',
    white: '#000',
  },
  darkenedColors: {
    primary: '#000',
    black: '#000',
    dark: '#222',
    light: '#999',
    medium: '#444',
    white: '#eee',
  },
  gutters: {
    x: '1rem',
    y: '1rem',
  },
};
