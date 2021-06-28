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
  flex: 1;
`;

const Header = styled.header`
  height: 40px;
  margin-bottom: 32px;
  margin-left: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const SectionTitle = styled.h2`
  font-weight: bold;
`;

export default PageSection;
