import '@vanilla-extract/css/disableRuntimeStyles';
import '@testing-library/jest-dom';
import * as mockReact from 'react';
import * as mockStyleMocks from './mocks/styleMocks';

// --- Define mockAtomsFn first ---
// Define a type for the mock function including the 'properties' field
interface MockAtomsFn extends jest.Mock<string, [any]> {
  properties: {
    has: jest.Mock<boolean, [any]>;
  };
}
// Create the mock function and assert its type via unknown
const mockAtomsFn = jest.fn(() => 'mock-atoms-class') as unknown as MockAtomsFn;
// Assign the properties object
mockAtomsFn.properties = {
  has: jest.fn((key) => true), // Simplistic mock
};

// --- Mock sprinkles.css using mockAtomsFn ---
jest.mock('../strum-design-system/sprinkles.css', () => ({
  atoms: mockAtomsFn,
  Atoms: {}, // Keep existing type mock
  mapResponsiveValue: jest.fn((value) => value),
}));

// Mock Button.css
jest.mock('../strum-design-system/components/Button/Button.css', () => ({
  buttonStyle: jest.fn(() => 'mock-button-style-class'),
}));

// Mock Row.css
jest.mock('../strum-design-system/components/Layout/Row.css', () => ({
  rowStyle: jest.fn(() => 'mock-row-style-class'),
  rowBase: {},
}));

// Mock Column.css
jest.mock('../strum-design-system/components/Layout/Column.css', () => ({
  columnStyle: 'mock-column-style-base',
  xsColumnsStyle: {
    auto: 'mock-col-xs-auto',
    12: 'mock-col-xs-12' /* Add others if needed */,
  },
  smColumnsStyle: {
    auto: 'mock-col-sm-auto',
    12: 'mock-col-sm-12' /* Add others if needed */,
  },
  mdColumnsStyle: { auto: 'mock-col-md-auto' /* Add others if needed */ },
  lgColumnsStyle: {
    auto: 'mock-col-lg-auto',
    4: 'mock-col-lg-4',
    6: 'mock-col-lg-6' /* Add others if needed */,
  },
  xlColumnsStyle: { auto: 'mock-col-xl-auto' /* Add others if needed */ },
  xxlColumnsStyle: { auto: 'mock-col-xxl-auto' /* Add others if needed */ },
}));

// Mock Section.css - Adjust path and make it an object for color variants
jest.mock('../components/Section/Section.css', () => ({
  sectionStyle: {
    standard: 'mock-section-standard',
    alternate: 'mock-section-alternate',
  },
}));

// Mock Footer.css
jest.mock('../components/Footer/Footer.css', () => ({
  footerStyle: 'mock-footer-style',
  footerLinkStyle: 'mock-footer-link-style',
}));

// --- Mock utils/compose using mockAtomsFn ---
jest.mock('../strum-design-system/utils/compose', () => ({
  composeStyles: jest.fn((...args) => args.filter(Boolean).join(' ')),
  // Mock composeWithAtoms to join classes passed to it
  composeWithAtoms: jest.fn((atomicProps, ...otherClasses) => {
    const atomClass = mockAtomsFn(atomicProps);
    return [atomClass, ...otherClasses.flat()].filter(Boolean).join(' ');
  }),
  compose: jest.fn((fns) => (args) => args),
}));

// Mock themes
jest.mock('../strum-design-system/themes/contract.css', () => ({
  vars: mockStyleMocks.vars,
}));
jest.mock('../strum-design-system/themes/themeUtils', () => ({
  getVarName: jest.fn((value) => `--mock-${value}`),
  assignInlineVars: jest.fn((vars) => ({ style: vars })),
  getModeColors: jest.fn(() => ({
    /* return simple mock object if needed */
  })),
}));
jest.mock('../strum-design-system/themes', () => ({
  timbre: {
    contract: { vars: mockStyleMocks.vars },
    modes: { light: 'light-mode', dark: 'dark-mode' },
  },
}));

// Mock next/router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));

// Mock PageHead component (often involves Next.js specifics)
jest.mock('../components/PageHead', () => {
  const PageHeadMock = () => null; // Render nothing for PageHead in tests
  return { __esModule: true, default: PageHeadMock };
});

// Mock FontAwesome setup
jest.mock('../helpers/fontawesomeConfig', () => ({
  // No actual implementation needed, just prevents errors
}));
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: (props) => {
    // Simple mock: renders icon name or a placeholder
    return mockReact.createElement('i', {
      className: `fa ${props.icon.iconName}`, // Use iconName if available
      'data-testid': 'mock-fa-icon',
    });
  },
}));

// Mock Alert component used specifically in ErrorBoundary tests if needed elsewhere
jest.mock('../strum-design-system/components/Alert/Alert', () => {
  const AlertMock = ({
    children,
    color,
  }: {
    children: mockReact.ReactNode;
    color?: string;
  }) =>
    mockReact.createElement(
      'div',
      { 'data-testid': 'alert-mock', 'data-color': color || 'neutral' },
      children,
    );
  return { __esModule: true, default: AlertMock };
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
