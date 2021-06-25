import styled from 'styled-components';

const PageContainer = ({ children }) => <Container>{children}</Container>;

const Container = styled.div`
  height: 100%;
  max-width: 1200px;
  margin: auto;
  padding: 0 16px;
`;

export default PageContainer;
