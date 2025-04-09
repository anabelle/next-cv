import React, { ButtonHTMLAttributes } from 'react';
import { Atoms } from '../../sprinkles.css';
import { composeWithAtoms } from '../../utils/compose';
import { buttonStyle } from './Button.css';

interface Button extends ButtonHTMLAttributes<HTMLButtonElement> {
  atoms?: Atoms;
  color?: 'primary' | 'black' | 'dark' | 'light' | 'medium' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Button: React.FC<Button> = (props) => {
  const { atoms: atomicProperties, children, color, size, ...rest } = props;

  const classes = composeWithAtoms(
    atomicProperties,
    buttonStyle({
      color,
      size,
    }),
  );

  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
};

export default Button;
