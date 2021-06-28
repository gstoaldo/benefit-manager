import styled from 'styled-components';

const Button = ({ children, variant = 'outlined', ...rest }) => {
  const ButtonComponent = {
    outlined: OutlinedButton,
    text: TextButton,
  }[variant];

  return (
    <ButtonComponent variant={variant} {...rest}>
      {children}
    </ButtonComponent>
  );
};

const BaseButton = styled.button`
  font-size: var(--f1);
  font-weight: bold;
  color: var(--color-primary);
  padding: 8px 16px;
  border-radius: 5px;
  background: transparent;
  &:hover {
    background: ${(props) => !props.disabled && 'var(--color-primary-light)'};
  }
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => props.disabled && '0.5'};
`;

const OutlinedButton = styled(BaseButton)`
  border: 2px solid currentColor;
`;

const TextButton = styled(BaseButton)`
  border: none;
`;

export default Button;
