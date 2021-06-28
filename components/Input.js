import styled from 'styled-components';

const Input = ({ name, label, value, onChange }) => {
  return (
    <Container>
      <Label htmlFor={name}>{label}</Label>
      <StyledInput
        id={name}
        name={name}
        value={value || ''}
        onChange={onChange}
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
