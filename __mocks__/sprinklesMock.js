// __mocks__/sprinklesMock.js

// Mock the atoms function expected from sprinkles.css.ts
const atoms = jest.fn((props) => {
  // Return a descriptive class name for testing
  return 'mocked-sprinkles-class';
});

// Mock the properties Set expected alongside the atoms function
const properties = new Set([
  'padding',
  'margin',
  'display',
  'color',
  'backgroundColor',
]); // Add common properties

const mapResponsiveValue = jest.fn((value) => value);

module.exports = {
  atoms,
  properties,
  mapResponsiveValue,
  Atoms: {},
};
