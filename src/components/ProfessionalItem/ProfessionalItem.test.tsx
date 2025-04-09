import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfessionalItem from './ProfessionalItem';
import { type CMSProfessionalExperience } from '../../cms-integration/markdown/professional';

// Mock FontAwesomeIcon
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: (props) => <i data-testid="calendar-icon"></i>,
}));

describe('ProfessionalItem', () => {
  const mockPropsBase: CMSProfessionalExperience = {
    attributes: {
      organization: 'Test Corp',
      startDate: 'Jan 2020',
      title: 'Tester',
    },
    html: '<p>Tested things.</p>',
    slug: 'test-corp',
  };

  it('should render correctly with an end date', () => {
    const propsWithEndDate = {
      ...mockPropsBase,
      attributes: {
        ...mockPropsBase.attributes,
        endDate: 'Dec 2022',
      },
    };
    render(<ProfessionalItem {...propsWithEndDate} />);

    // Check for the mock component
    expect(screen.getByTestId('professional-item-mock')).toBeInTheDocument();
    expect(screen.getByTestId('professional-item-mock')).toHaveTextContent(
      `Professional: ${propsWithEndDate.slug}`,
    );
  });

  it('should render correctly without an end date', () => {
    // Use mockPropsBase which doesn't have endDate
    render(<ProfessionalItem {...mockPropsBase} />);

    // Check for the mock component
    expect(screen.getByTestId('professional-item-mock')).toBeInTheDocument();
    expect(screen.getByTestId('professional-item-mock')).toHaveTextContent(
      `Professional: ${mockPropsBase.slug}`,
    );
  });
});
