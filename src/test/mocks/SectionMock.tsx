import React from 'react';

interface SectionProps {
  color?: 'standard' | 'alternate';
  children: React.ReactNode;
}

const SectionMock = ({ color = 'standard', children }: SectionProps) => {
  return (
    <section data-testid="section-mock" data-color={color}>
      {children}
    </section>
  );
};

export default SectionMock;
