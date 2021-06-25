import styled from 'styled-components';

const Layout = ({ children }) => <Container>{children}</Container>;

const Container = styled.div`
  display: flex;
  gap: 64px;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 0;
  }
`;

export default Layout;
