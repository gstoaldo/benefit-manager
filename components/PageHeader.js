import styled from 'styled-components';
import LinkButton from './LinkButton';

const PageHeader = ({ title, link = false, href, linkTitle }) => (
  <Header>
    <PageTitle>{title}</PageTitle>
    {link && <LinkButton href={href}>{linkTitle}</LinkButton>}
  </Header>
);

const Header = styled.header`
  padding: 32px 0;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

const PageTitle = styled.h1`
  font-weight: normal;
`;

export default PageHeader;
