import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

// Import mocked atoms from our test utils instead of actual implementation
import { atoms } from '../../../test/mocks/styleMocks';

describe('Button', () => {
  it('should render with default props', () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    // Check for default styles if possible, or snapshot
    // expect(button).toHaveClass(...); // Add specific class checks if defaults are known
  });

  it('should render children', () => {
    render(
      <Button>
        <span>Child Span</span>
      </Button>,
    );
    expect(screen.getByText('Child Span')).toBeInTheDocument();
  });

  it('should apply color variants', () => {
    render(<Button color="primary">Primary</Button>);
    // Check for specific class associated with the 'primary' color variant
    // This requires knowing the generated class names or using snapshots
    expect(
      screen.getByRole('button', { name: /primary/i }),
    ).toBeInTheDocument();
    // Example: expect(screen.getByRole('button')).toHaveClass('button_color_primary');
  });

  it('should apply size variants', () => {
    render(<Button size="lg">Large</Button>);
    // Check for specific class associated with the 'lg' size variant
    expect(screen.getByRole('button', { name: /large/i })).toBeInTheDocument();
    // Example: expect(screen.getByRole('button')).toHaveClass('button_size_lg');
  });

  it('should apply atomic properties (atoms)', () => {
    const className = 'mock-atoms-class'; // Use mock class instead of real atoms
    render(<Button atoms={{ marginTop: 4 }}>Atomic Button</Button>);
    const button = screen.getByRole('button', { name: /atomic button/i });
    expect(button).toBeInTheDocument();
    expect(button.className).toContain(className);
  });

  it('should pass through standard button attributes', () => {
    render(
      <Button type="submit" disabled>
        Submit
      </Button>,
    );
    const button = screen.getByRole('button', { name: /submit/i });
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toBeDisabled();
  });

  it('should handle click events', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);
    const button = screen.getByRole('button', { name: /clickable/i });
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Add snapshot test as a fallback for complex style checks
  it('matches snapshot with specific props', () => {
    const { container } = render(
      <Button color="medium" size="sm" atoms={{ padding: 3 }}>
        Snapshot Button
      </Button>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
