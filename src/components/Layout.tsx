import { ReactNode } from 'react';
import { styled } from 'styled-components';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <Container>
      <Inner>
        <Header>
          국내 모든 임상시험 검색하고
          <br />
          온라인으로 참여하기
        </Header>
        {children}
      </Inner>
    </Container>
  );
}

const Container = styled.div`
  width: 500px;
  height: 100vh;
  background-color: #d4ebfb;
  margin: auto;
  display: flex;
  flex-direction: column;
`;

const Inner = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  padding: 20px 0;
`;
