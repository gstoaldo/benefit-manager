import styled from 'styled-components';

const Input = ({ name, label, value, ...rest }) => {
  return (
    <Container>
      <Label htmlFor={name}>{label}</Label>
      <StyledInput
        id={name}
        name={name}
        value={value || ''}
        autoComplete="off"
        {...rest}
      />
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 32px;
`;

const Label = styled.label`
  display: block;
  padding: 0 16px;
`;

const StyledInput = styled.input`
  width: 100%;
  border: 2px solid var(--color-primary-light);
  border-radius: var(--border-radius);
  padding: 8px 16px;
  font-weight: bold;
  font-size: var(--f1);

  &:focus {
    outline: none;
    border: 2px solid var(--color-primary);
  }
`;

export default Input;
