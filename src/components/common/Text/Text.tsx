import { ReactNode } from 'react';

import { TextBase } from './Text.style';

interface TextProps {
  children: ReactNode;
  color?: string;
  size?: string;
}

export function Text({ children, color, size }: TextProps) {
  return (
    <TextBase $color={color} $size={size}>
      {children}
    </TextBase>
  );
}
