import React from 'react';
import { render, screen } from '@testing-library/react';
import ContactInformation from './ContactInformation';
import { type CMSPersonalInformation } from '../../cms-integration/markdown/personal';
import { type CMSPrivateInformation } from '../../cms-integration/markdown/private';

// --- Mocks ---

// Mock SectionHeader component
jest.mock('../SectionHeader/SectionHeader', () => ({
  __esModule: true,
  default: (props) => <div data-testid="section-header">{props.text}</div>,
}));

// Mock Strum Design System components to just render children
jest.mock('../../strum-design-system/components/Box/Box', () => ({
  __esModule: true,
  default: ({ children }) => <>{children}</>, // Render children directly
}));
jest.mock('../../strum-design-system/components/Nav/UnorderedList', () => ({
  __esModule: true,
  default: ({ children }) => <ul>{children}</ul>, // Render as ul
}));
jest.mock('../../strum-design-system/components/Nav/NavListItem', () => ({
  __esModule: true,
  default: ({ children }) => <li>{children}</li>, // Render as li
}));
jest.mock('../../strum-design-system/components/Layout/Row', () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>, // Render as div
}));
jest.mock('../../strum-design-system/components/Layout/Column', () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>, // Render as div
}));

// --- Test Suite ---

describe('ContactInformation', () => {
  const mockPersonalInformation: CMSPersonalInformation = {
    attributes: {
      location: 'Mockville',
      familyName: 'Test',
      givenName: 'User',
      email: 'test@example.com',
    },
    html: '',
  };

  const mockPrivateInformation: CMSPrivateInformation[] = [
    {
      attributes: { label: 'Phone' },
      html: '<a href="tel:123">123-456-7890</a>',
      slug: 'phone',
    },
    {
      attributes: { label: 'Address' },
      html: '<span>123 Mock St</span>',
      slug: 'address',
    },
  ];

  it('should render only public information when privateInformation is not provided', () => {
    render(
      <ContactInformation personalInformation={mockPersonalInformation} />,
    );

    // Check that the mocked SectionHeader is present
    expect(screen.getByTestId('section-header')).toHaveTextContent(
      'Contact Information',
    );
    expect(screen.getByText('Location:')).toBeInTheDocument();
    expect(screen.getByText('Mockville')).toBeInTheDocument();
    expect(screen.getByText('E-mail:')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();

    // Check that private info is not rendered
    expect(screen.queryByText('Phone:')).not.toBeInTheDocument();
    expect(screen.queryByText('123-456-7890')).not.toBeInTheDocument();
    expect(screen.queryByText('Address:')).not.toBeInTheDocument();
    expect(screen.queryByText('123 Mock St')).not.toBeInTheDocument();
  });

  it('should render both public and private information when privateInformation is provided', () => {
    render(
      <ContactInformation
        personalInformation={mockPersonalInformation}
        privateInformation={mockPrivateInformation}
      />,
    );

    // Check that the mocked SectionHeader is present
    expect(screen.getByTestId('section-header')).toHaveTextContent(
      'Contact Information',
    );
    expect(screen.getByText('Location:')).toBeInTheDocument();
    expect(screen.getByText('Mockville')).toBeInTheDocument();
    expect(screen.getByText('E-mail:')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();

    // Check private info - More robustly
    expect(screen.getByText('Phone:')).toBeInTheDocument();
    // Find the list item containing the phone label, then check its content
    const phoneListItem = screen.getByText('Phone:').closest('li');
    expect(phoneListItem).toHaveTextContent('123-456-7890');

    expect(screen.getByText('Address:')).toBeInTheDocument();
    // Find the list item containing the address label, then check its content
    const addressListItem = screen.getByText('Address:').closest('li');
    expect(addressListItem).toHaveTextContent('123 Mock St');
  });
});
