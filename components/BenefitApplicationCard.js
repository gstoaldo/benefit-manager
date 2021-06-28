import styled from 'styled-components';
import Card from './Card';
import Button from 'components/Button';
import { inputLabels, benefitTypeLabels } from 'utils/labels';

const BenefitApplicationCard = ({ benefit, active, onClick }) => {
  return (
    <Card>
      <Header>
        <BenefitName>{benefit.name}</BenefitName>
        {active ? (
          <ActiveTag>Ativo</ActiveTag>
        ) : (
          <Button variant="text" onClick={onClick}>
            Enviar
          </Button>
        )}
      </Header>
      <BenefitType>{benefitTypeLabels[benefit.type]}</BenefitType>
      <List>
        {benefit.requiredFields.map((field) => (
          <li key={field}>
            <Tag>{inputLabels[field]}</Tag>
          </li>
        ))}
      </List>
    </Card>
  );
};

const Header = styled.header`
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -8px;
  margin-right: -16px;
`;

const BenefitName = styled.h3`
  font-weight: bold;
`;

const BenefitType = styled.p`
  font-weight: normal;
`;

const List = styled.ul`
  margin-top: 16px;

  & li {
    display: inline-block;
    margin-right: 8px;
  }
`;

const Tag = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border: 2px solid var(--color-primary-light);
  border-radius: 100px;
`;

const ActiveTag = styled.div`
  padding: 8px 24px;
  background: var(--color-primary-light);
  color: var(--color-primary);
  border-radius: var(--border-radius);
  margin-right: -8px;
`;

export default BenefitApplicationCard;
