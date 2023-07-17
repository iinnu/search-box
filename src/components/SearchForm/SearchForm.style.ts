import { styled } from 'styled-components';

export const InputBase = styled.div`
  background-color: white;
  border-radius: 42px;
  display: grid;
  grid-template-columns: 7fr 1fr;
`;

export const InputWithIcon = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 0 15px 20px;

  & svg {
    margin-right: 10px;
  }
`;

export const Input = styled.input`
  border: none;
  font-size: 18px;
  background-color: unset;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

export const Button = styled.button`
  background-color: #357ae1;
  border: none;
  color: white;
  padding: 10px;
  font-size: 15px;
  border-radius: 0 42px 42px 0;
  cursor: pointer;
`;
