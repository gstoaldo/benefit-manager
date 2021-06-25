import styled from 'styled-components';

const Button = ({ children, ...rest }) => (
  <BaseButton {...rest}>{children}</BaseButton>
);

const BaseButton = styled.button`
  font-size: var(--f1);
  font-weight: bold;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  background: transparent;
  &:hover {
    background: var(--color-primary-light);
  }
`;

export default Button;
