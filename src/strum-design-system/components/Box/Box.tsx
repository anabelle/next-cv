import React from 'react';
import { atoms } from '../../sprinkles.css';
import type { Atoms } from '../../sprinkles.css';

// Base props including sprinkles atoms (omit conflicting ones if necessary)
type BaseBoxProps = Omit<Atoms, 'color'>; // Example: Omit 'color' if it conflicts

// Type to create props for the polymorphic component
type PolymorphicComponentProps<Element extends React.ElementType, Props> = 
  Props &
  BaseBoxProps &
  Omit<
    React.ComponentPropsWithoutRef<Element>, 
    keyof (Props & BaseBoxProps)
  >;

// Type for the 'as' prop
type PolymorphicAsProp<Element extends React.ElementType> = {
  as?: Element;
};

// Type for the Box component props, including the 'as' prop
type BoxProps<Element extends React.ElementType = 'div'> = 
  PolymorphicComponentProps<Element, PolymorphicAsProp<Element>>;

// Type for the Ref of the polymorphic component
type PolymorphicRef<Element extends React.ElementType> = 
  React.ComponentPropsWithRef<Element>['ref'];

// Type for the Box component itself, including the forwardRef
type BoxComponent = <Element extends React.ElementType = 'div'>(
  props: BoxProps<Element> & { ref?: PolymorphicRef<Element> }
) => React.ReactElement | null;

// Implementation using forwardRef
const Box: BoxComponent = React.forwardRef(
  <Element extends React.ElementType = 'div'>(
    { as, className, ...props }: BoxProps<Element>,
    ref: PolymorphicRef<Element>
  ) => {
    const Component = as || 'div';

    // Separate atom props from other props
    const atomProps: Record<string, unknown> = {};
    const otherProps: Record<string, unknown> = {};

    for (const key in props) {
      if (atoms.properties.has(key as keyof Atoms)) {
        atomProps[key] = props[key as keyof typeof props];
      } else {
        otherProps[key] = props[key as keyof typeof props];
      }
    }

    const atomicClassName = atoms(atomProps as Atoms);
    const finalClassName = className ? `${atomicClassName} ${className}` : atomicClassName;

    return (
      <Component
        ref={ref}
        className={finalClassName}
        {...otherProps}
      />
    );
  }
);

// Assign displayName directly to the component returned by forwardRef
(Box as React.FunctionComponent).displayName = 'Box';

export default Box;
export type { BoxProps }; // Export BoxProps type if needed
