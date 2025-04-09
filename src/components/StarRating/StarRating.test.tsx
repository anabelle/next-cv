import React from 'react';
import { render, screen } from '@testing-library/react';
import StarRating from './StarRating';

// Mock the FontAwesomeIcon to simplify testing - we only care about count
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: (props) => (
    <i data-testid="star-icon" className={`fa-${props.icon.iconName}`}></i>
  ),
}));

describe('StarRating', () => {
  it('should render 1 star when stars prop is 1', () => {
    render(<StarRating stars={1} />);
    const starIcons = screen.queryAllByTestId('star-icon');
    expect(starIcons).toHaveLength(1);
  });

  it('should render 2 stars when stars prop is 2', () => {
    render(<StarRating stars={2} />);
    const starIcons = screen.queryAllByTestId('star-icon');
    expect(starIcons).toHaveLength(2);
  });

  it('should render 3 stars when stars prop is 3', () => {
    render(<StarRating stars={3} />);
    const starIcons = screen.queryAllByTestId('star-icon');
    expect(starIcons).toHaveLength(3);
  });

  // Optional: Test invalid prop values if necessary, though TypeScript should prevent this
});
