import styled from 'styled-components';

const Button = ({ children, ...rest }) => (
  <BaseButton {...rest}>{children}</BaseButton>
);

const BaseButton = styled.button`
  font-size: var(--f1);
  font-weight: bold;
  color: var(--color-primary);
  border: 2px solid currentColor;
  padding: 8px 16px;
  border-radius: 5px;
  background: transparent;
  &:hover {
    background: ${(props) => !props.disabled && 'var(--color-primary-light)'};
  }
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => props.disabled && '0.5'};
`;

export default Button;
