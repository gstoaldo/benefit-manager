import styled from 'styled-components';

export const NoEmployeeMessage = () => (
  <Message>A lista de colaboradores está vazia.</Message>
);

export const ShouldSaveMessage = () => (
  <Message>Salve os dados antes de enviar.</Message>
);

const Message = styled.p`
  padding-left: 16px;
`;
