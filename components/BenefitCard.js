import styled from 'styled-components';
import { benefitTypeLabels, benefitTypeSymbol } from 'utils/benefit';
import Card from './Card';

const BenefitCard = ({ benefit }) => {
  const { name, type } = benefit;
  const label = benefitTypeLabels[type];
  const symbol = benefitTypeSymbol[type];

  return (
    <Card>
      <BenefitName>{name}</BenefitName>
      <BenefitType>{`${label} ${symbol}`}</BenefitType>
    </Card>
  );
};

const BenefitName = styled.h3`
  font-weight: bold;
`;

const BenefitType = styled.p`
  font-weight: normal;
`;

export default BenefitCard;
