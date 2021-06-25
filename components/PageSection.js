import styled from 'styled-components';

const PageSection = ({ title, action, children }) => (
  <Section>
    <Header>
      <SectionTitle>{title}</SectionTitle>
      {action}
    </Header>
    <div>{children}</div>
  </Section>
);

const Section = styled.section`
  margin: 32px 0;
`;

const Header = styled.header`
  padding: 32px 0;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
`;

const SectionTitle = styled.h2`
  font-weight: bold;
`;

export default PageSection;
