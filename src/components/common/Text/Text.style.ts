import { styled } from 'styled-components';

export const TextBase = styled.div<{ $color?: string; $size?: string }>`
  color: ${(props) => (props.$color ? props.$color : 'inherit')};
  font-size: ${(props) => (props.$size ? props.$size : 'inherit')};
`;
