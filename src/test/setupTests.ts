import '@vanilla-extract/css/disableRuntimeStyles';
import '@testing-library/jest-dom';
import * as React from 'react';
import * as styleMocks from './mocks/styleMocks';

// Mock the entire Button component
jest.mock('../strum-design-system/components/Button/Button', () => {
  return {
    __esModule: true,
    default: require('./mocks/ButtonMock').default,
  };
});

// Mock Section component
jest.mock('../components/Section/Section', () => {
  return {
    __esModule: true,
    default: require('./mocks/SectionMock').default,
  };
});

// Mock Row component
jest.mock('../strum-design-system/components/Layout/Row', () => {
  return {
    __esModule: true,
    default: require('./mocks/RowMock').default,
  };
});

// Mock Alert component used in ErrorBoundary
jest.mock('../strum-design-system/components/Alert/Alert', () => {
  const AlertMock = ({
    children,
    color,
  }: {
    children: React.ReactNode;
    color?: string;
  }) =>
    React.createElement(
      'div',
      { 'data-testid': 'alert-mock', 'data-color': color || 'neutral' },
      children,
    );
  return { __esModule: true, default: AlertMock };
});

// Mock CSS modules more comprehensively
jest.mock('../strum-design-system/sprinkles.css', () => ({
  atoms: styleMocks.atoms,
  Atoms: {},
  mapResponsiveValue: jest.fn((value) => value),
}));

// Mock Button.css
jest.mock('../strum-design-system/components/Button/Button.css', () => ({
  buttonStyle: styleMocks.buttonStyle,
}));

// Mock Row.css
jest.mock('../strum-design-system/components/Layout/Row.css', () => ({
  rowStyle: styleMocks.rowStyle,
  rowBase: {},
}));

// Mock Section.css
jest.mock('../strum-design-system/components/Layout/Section.css', () => ({
  sectionStyle: styleMocks.sectionStyle,
}));

// Mock PDFDownloadButton component
jest.mock('../components/PDF/PDFDownloadButton', () => {
  const PDFDownloadButtonMock = ({ secret }: { secret?: string }) =>
    React.createElement(
      'a',
      {
        'data-testid': 'pdf-download-button-mock',
        href: secret ? `/api/pdf?secret=${secret}` : '/api/pdf',
        target: '_blank',
      },
      'View or Download PDF',
    );
  return { __esModule: true, default: PDFDownloadButtonMock };
});

// Mock Layout components used in ResumeLayout
jest.mock('../strum-design-system/components/Layout/Column', () => {
  const ColumnMock = ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', { 'data-testid': 'column-mock' }, children);
  return { __esModule: true, default: ColumnMock };
});

jest.mock('../components/Section/Section', () => {
  const SectionMock = ({
    children,
    color,
  }: {
    children: React.ReactNode;
    color?: string;
  }) =>
    React.createElement(
      'section',
      { 'data-testid': 'section-mock', 'data-color': color || 'standard' },
      children,
    );
  return { __esModule: true, default: SectionMock };
});

// Mock Footer.css
jest.mock('../components/Footer/Footer.css', () => ({
  footerStyle: 'mock-footer-style',
  footerLinkStyle: 'mock-footer-link-style',
}));

// Mock Footer component
jest.mock('../components/Footer/Footer', () => {
  const FooterMock = (props: any) =>
    React.createElement(
      'footer',
      { 'data-testid': 'footer-mock' },
      'Mock Footer',
    );
  return { __esModule: true, default: FooterMock };
});

// Mock Header component
jest.mock('../components/Header/Header', () => {
  const HeaderMock = (props: any) =>
    React.createElement(
      'header',
      { 'data-testid': 'header-mock' },
      'Mock Header',
    );
  return { __esModule: true, default: HeaderMock };
});

// Mock SectionHeader component
jest.mock('../components/SectionHeader/SectionHeader', () => {
  const SectionHeaderMock = ({ text }: { text: string; icon: any }) =>
    React.createElement('div', { 'data-testid': 'section-header-mock' }, text);
  return { __esModule: true, default: SectionHeaderMock };
});

// Mock other major components used in ResumeLayout
jest.mock('../components/Articles/AboutMe', () => {
  const AboutMeMock = (props: any) =>
    React.createElement(
      'div',
      { 'data-testid': 'about-me-mock' },
      'About Me Content',
    );
  return { __esModule: true, default: AboutMeMock };
});

jest.mock('../components/Articles/ContactInformation', () => {
  const ContactInfoMock = (props: any) =>
    React.createElement(
      'div',
      { 'data-testid': 'contact-info-mock' },
      'Contact Info Content',
    );
  return { __esModule: true, default: ContactInfoMock };
});

jest.mock('../components/Articles/NotableProjects', () => {
  const ProjectsMock = (props: any) =>
    React.createElement(
      'div',
      { 'data-testid': 'projects-mock' },
      'Projects Content',
    );
  return { __esModule: true, default: ProjectsMock };
});

jest.mock('../components/Skills/Skills', () => {
  const SkillsMock = (props: any) =>
    React.createElement(
      'div',
      { 'data-testid': 'skills-mock' },
      'Skills Content',
    );
  return { __esModule: true, default: SkillsMock };
});

jest.mock('../components/EducationItem/EducationItem', () => {
  const EducationItemMock = (props: any) =>
    React.createElement(
      'div',
      { 'data-testid': 'education-item-mock' },
      `Education: ${props.slug || 'mock'}`,
    );
  return { __esModule: true, default: EducationItemMock };
});

jest.mock('../components/ProfessionalItem/ProfessionalItem', () => {
  const ProfessionalItemMock = (props: any) =>
    React.createElement(
      'div',
      { 'data-testid': 'professional-item-mock' },
      `Professional: ${props.slug || 'mock'}`,
    );
  return { __esModule: true, default: ProfessionalItemMock };
});

// Mock AutoGrid components
jest.mock('../strum-design-system/components/AutoGrid/AutoGrid', () => {
  const AutoGridMock = ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', { 'data-testid': 'auto-grid-mock' }, children);
  return { __esModule: true, default: AutoGridMock };
});

jest.mock('../strum-design-system/components/AutoGrid/AutoGridCell', () => {
  const AutoGridCellMock = ({ children }: { children: React.ReactNode }) =>
    React.createElement(
      'div',
      { 'data-testid': 'auto-grid-cell-mock' },
      children,
    );
  return { __esModule: true, default: AutoGridCellMock };
});

// Mock Box component
jest.mock('../strum-design-system/components/Box/Box', () => {
  const BoxMock = ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', { 'data-testid': 'box-mock' }, children);
  return { __esModule: true, default: BoxMock };
});

// Mock PageHead component
jest.mock('../components/PageHead', () => {
  const PageHeadMock = () => null;
  return { __esModule: true, default: PageHeadMock };
});

// Mock Container component
jest.mock('../strum-design-system/components/Container/Container', () => {
  const ContainerMock = ({ children }: { children: React.ReactNode }) =>
    React.createElement('div', { 'data-testid': 'container-mock' }, children);
  return { __esModule: true, default: ContainerMock };
});

// Mock utils/compose
jest.mock('../strum-design-system/utils/compose', () => ({
  composeStyles: jest.fn((...args) => args.filter(Boolean).join(' ')),
  composeWithAtoms: styleMocks.composeWithAtoms,
  compose: jest.fn((fns) => (args) => args),
}));

// Mock themes
jest.mock('../strum-design-system/themes/contract.css', () => ({
  vars: styleMocks.vars,
}));

// Mock timbre colors
jest.mock('../strum-design-system/themes/timbre/colors', () => ({
  __esModule: true,
  default: {
    primary: '#000',
    secondary: '#fff',
    black: '#000',
    dark: '#333',
    medium: '#666',
    light: '#ccc',
    white: '#fff',
  },
}));

// Mock accessibility styles
jest.mock('../strum-design-system/styles/accessibility.css', () => ({
  visuallyHidden: 'mock-visually-hidden',
}));

// Mock other CSS files
jest.mock('../strum-design-system/styles/borderRadius.css', () => ({
  rounded: 'mock-rounded',
  circleBorderRadius: 'mock-circle-border-radius',
  roundedBorderRadius: 'mock-rounded-border-radius',
}));

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '/',
    };
  },
}));

// Mock FontAwesome icons
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: jest.fn().mockImplementation(({ icon, transform, color }) =>
    React.createElement('i', {
      className: Array.isArray(icon) ? icon.join('-') : icon,
    }),
  ),
}));

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
