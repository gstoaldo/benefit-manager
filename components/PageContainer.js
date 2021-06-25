import styled from 'styled-components';

const PageContainer = ({ children }) => <Container>{children}</Container>;

const Container = styled.div`
  height: 100%;
  max-width: var(--max-page-width);
  margin: auto;
  padding: 0 16px;
`;

export default PageContainer;
