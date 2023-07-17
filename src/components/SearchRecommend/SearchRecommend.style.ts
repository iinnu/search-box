import { styled } from 'styled-components';

export const Container = styled.div`
  margin-top: 20px;
  background-color: white;
  border-radius: 30px;
  height: 400px;
  box-shadow: 0px 0px 7px -3px #bcbcbc;
`;

export const Inner = styled.div`
  height: 100%;
  box-sizing: border-box;
  padding: 25px;
  display: grid;
  grid-template-rows: 25px 1fr;
`;

export const List = styled.div`
  padding: 10px;
  box-sizing: border-box;
  overflow: scroll;
`;

export const ListItem = styled.div`
  margin-bottom: 30px;
`;
