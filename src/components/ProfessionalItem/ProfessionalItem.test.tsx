import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfessionalItem from './ProfessionalItem';
import { type CMSProfessionalExperience } from '../../cms-integration/markdown/professional';

// Mock FontAwesomeIcon to be findable
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: (props) => (
    <i data-testid="calendar-icon" aria-label="calendar icon"></i>
  ),
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

    // Check for actual rendered content
    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent(
      /Tester.*at Test Corp/,
    );
    expect(screen.getByText(/Jan 2020.*Dec 2022/)).toBeInTheDocument();
    expect(screen.getByTestId('calendar-icon')).toBeInTheDocument();
    expect(screen.getByText('Tested things.')).toBeInTheDocument(); // Check for HTML content rendered
  });

  it('should render correctly without an end date', () => {
    // Use mockPropsBase which doesn't have endDate
    render(<ProfessionalItem {...mockPropsBase} />);

    // Check for actual rendered content
    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent(
      /Tester.*at Test Corp/,
    );
    expect(screen.getByText(/Jan 2020.*Current/)).toBeInTheDocument();
    expect(screen.getByTestId('calendar-icon')).toBeInTheDocument();
    expect(screen.getByText('Tested things.')).toBeInTheDocument(); // Check for HTML content rendered
  });
});
