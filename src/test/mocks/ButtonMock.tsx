import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  atoms?: any;
  color?: 'primary' | 'black' | 'dark' | 'light' | 'medium' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const MockButton: React.FC<ButtonProps> = (props) => {
  const { atoms, children, color = 'primary', size = 'md', ...rest } = props;

  // Include mock-atoms-class when atoms prop is provided
  const className = atoms ? 'mock-atoms-class' : '';

  // Simply render a button with data attributes for testing
  return (
    <button
      data-testid="mock-button"
      data-color={color}
      data-size={size}
      data-has-atoms={!!atoms}
      className={className}
      {...rest}
    >
      {children}
    </button>
  );
};

export default MockButton;
