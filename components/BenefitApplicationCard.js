import styled from 'styled-components';
import Card from './Card';
import Button from 'components/Button';
import { benefitTypeLabels } from 'utils/benefits';
import { inputLabels } from 'utils/inputs';

const BenefitApplicationCard = ({
  fieldsValidation,
  benefit,
  active,
  disabled,
  onClick,
}) => {
  const allFieldsAreValid = benefit.requiredFields.every(
    (field) => fieldsValidation[field]
  );

  return (
    <Card>
      <Header>
        <BenefitName>{benefit.name}</BenefitName>
        {active ? (
          <ActiveTag>Ativo</ActiveTag>
        ) : (
          <Button
            variant="text"
            disabled={disabled || !allFieldsAreValid}
            onClick={onClick}
          >
            Enviar
          </Button>
        )}
      </Header>
      <BenefitType>{benefitTypeLabels[benefit.type]}</BenefitType>
      <List>
        {benefit.requiredFields.map((field) => (
          <li key={field}>
            <FieldTag isValid={fieldsValidation[field]}>
              {inputLabels[field]}
            </FieldTag>
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
  margin-top: 8px;

  & li {
    display: inline-block;
    margin-right: 8px;
    margin-top: 8px;
  }
`;

const FieldTag = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 100px;
  border: 2px solid;
  color: ${(props) => !props.isValid && 'var(--color-error)'};
  border-color: ${(props) =>
    props.isValid ? 'var(--color-primary-light)' : 'var(--color-error)'};
`;

const ActiveTag = styled.div`
  padding: 8px 24px;
  background: var(--color-primary-light);
  color: var(--color-primary);
  border-radius: var(--border-radius);
  margin-right: -8px;
`;

export default BenefitApplicationCard;
