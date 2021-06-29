import Head from 'next/head';
import styled from 'styled-components';
import LinkButton from './LinkButton';

const Layout = ({ title, link = false, href, linkText, children }) => (
  <div>
    <Head>
      <title>{title}</title>
    </Head>
    <PageHeader title={title} link={link} href={href} linkText={linkText} />
    <Main>{children}</Main>
  </div>
);

const PageHeader = ({ title, link = false, href, linkText }) => (
  <Header>
    <PageTitle>{title}</PageTitle>
    {link && <LinkButton href={href}>{linkText}</LinkButton>}
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

const Main = styled.div`
  display: flex;
  gap: 64px;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 0;
  }
`;

export default Layout;
