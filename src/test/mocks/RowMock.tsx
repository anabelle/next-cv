import React from 'react';

interface RowProps {
  children: React.ReactNode;
  gap?: string | number;
  align?: string;
  justify?: string;
}

const RowMock = ({ children, gap = 0, align, justify }: RowProps) => {
  return (
    <div
      data-testid="row-mock"
      data-gap={gap}
      data-align={align}
      data-justify={justify}
    >
      {children}
    </div>
  );
};

export default RowMock;
