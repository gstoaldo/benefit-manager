import styled from 'styled-components';
import Link from 'next/link';

const PageHeader = ({ title, link = false, href, linkTitle }) => (
  <Header>
    <PageTitle>{title}</PageTitle>
    {link && (
      <Link href={href} passHref>
        <HeaderLink>{linkTitle}</HeaderLink>
      </Link>
    )}
  </Header>
);

const Header = styled.header`
  padding: 32px;
  display: flex;
  justify-content: space-between;
`;

const PageTitle = styled.h1`
  font-weight: normal;
`;

const HeaderLink = styled.a`
  color: var(--color-primary);
  font-weight: bold;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export default PageHeader;
