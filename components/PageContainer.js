import styled from 'styled-components';

const PageContainer = ({ children }) => <Container>{children}</Container>;

const Container = styled.div`
  height: 100%;
`;

export default PageContainer;
