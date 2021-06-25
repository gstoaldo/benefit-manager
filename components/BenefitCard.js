import styled from 'styled-components';
import { benefitTypeLabels } from 'utils/benefit';
import Card from './Card';

const BenefitCard = ({ benefit }) => (
  <Card>
    <BenefitName>{benefit.name}</BenefitName>
    <BenefitType>{benefitTypeLabels[benefit.type]}</BenefitType>
  </Card>
);

const BenefitName = styled.h3`
  font-weight: bold;
`;

const BenefitType = styled.p`
  font-weight: normal;
`;

export default BenefitCard;
