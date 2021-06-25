import styled from 'styled-components';
import { benefitTypeLabels } from 'utils/benefit';

const BenefitCard = ({ benefit }) => (
  <Card>
    <BenefitName>{benefit.name}</BenefitName>
    <BenefitType>{benefitTypeLabels[benefit.type]}</BenefitType>
  </Card>
);

const Card = styled.article`
  border: 2px solid var(--color-primary-light);
  border-radius: var(--border-radius);
  padding: 16px;
  margin: 16px 0;
`;

const BenefitName = styled.h3`
  font-weight: bold;
`;

const BenefitType = styled.p`
  font-weight: normal;
`;

export default BenefitCard;
