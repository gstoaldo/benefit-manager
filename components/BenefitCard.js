import styled from 'styled-components';
import { benefitTypeLabels, benefitTypeSymbols } from 'utils/labels';
import Card from './Card';

const BenefitCard = ({ benefit }) => {
  const { name, type } = benefit;
  const label = benefitTypeLabels[type];
  const symbol = benefitTypeSymbols[type];

  return (
    <Card>
      <BenefitName>{name}</BenefitName>
      <BenefitType>{`${symbol} ${label}`}</BenefitType>
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
