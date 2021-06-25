import styled from 'styled-components';
import Card from './Card';
import LinkButton from './LinkButton';

const EmployeeCard = ({ employee, benefits, href }) => {
  return (
    <Card>
      <Header>
        <EmployeeName>{employee.name || 'Nome'}</EmployeeName>
        <LinkButton href={href}>Editar</LinkButton>
      </Header>
      <EmployeeCPF>{employee.cpf || 'CPF'}</EmployeeCPF>
      <List>
        {benefits.length > 0 ? (
          benefits.map((benefit) => (
            <li key={benefit.id}>
              <BenefitTag>{benefit.name}</BenefitTag>
            </li>
          ))
        ) : (
          <NoBenefits />
        )}
      </List>
    </Card>
  );
};

const NoBenefits = () => <BenefitTag>Nenhum benefício</BenefitTag>;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-top: -8px;
  margin-right: -16px;
`;

const EmployeeName = styled.h3`
  font-weight: bold;
`;

const EmployeeCPF = styled.p`
  font-weight: normal;
`;

const List = styled.ul`
  margin-top: 16px;
  margin-left: -4px;

  & li {
    display: inline-block;
    gap: 8px;
    margin: 0 4px;
  }
`;

const BenefitTag = styled.span`
  padding: 4px 8px;
  border: 2px solid var(--color-primary-light);
  border-radius: 100px;
`;

export default EmployeeCard;
