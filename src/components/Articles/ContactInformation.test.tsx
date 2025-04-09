import React from 'react';
import { render, screen } from '@testing-library/react';
import ContactInformation from './ContactInformation';
import { type CMSPersonalInformation } from '../../cms-integration/markdown/personal';
import { type CMSPrivateInformation } from '../../cms-integration/markdown/private';

// Mock SectionHeader component
jest.mock('../SectionHeader/SectionHeader', () => ({
  __esModule: true,
  default: (props) => <div data-testid="section-header">{props.text}</div>,
}));

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

  it('should render contact info using the mock component', () => {
    render(
      <ContactInformation personalInformation={mockPersonalInformation} />,
    );

    // Check that the mock component is rendered
    expect(screen.getByTestId('contact-info-mock')).toBeInTheDocument();
    expect(screen.getByTestId('contact-info-mock')).toHaveTextContent(
      'Contact Info Content',
    );
  });

  it('should render contact info with private information using the mock component', () => {
    render(
      <ContactInformation
        personalInformation={mockPersonalInformation}
        privateInformation={mockPrivateInformation}
      />,
    );

    // Check that the mock component is rendered
    expect(screen.getByTestId('contact-info-mock')).toBeInTheDocument();
    expect(screen.getByTestId('contact-info-mock')).toHaveTextContent(
      'Contact Info Content',
    );
  });

  it('should render contact info when location is missing', () => {
    const infoWithoutLocation = {
      ...mockPersonalInformation,
      attributes: {
        ...mockPersonalInformation.attributes,
        location: undefined, // Explicitly remove location
      },
    };
    render(<ContactInformation personalInformation={infoWithoutLocation} />);

    // Check that the mock component is rendered
    expect(screen.getByTestId('contact-info-mock')).toBeInTheDocument();
    expect(screen.getByTestId('contact-info-mock')).toHaveTextContent(
      'Contact Info Content',
    );
  });
});
