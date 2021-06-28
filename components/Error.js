import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from 'components/Button';

const Error = ({ open, children }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(true);
  }, [open]);

  if (open && show) {
    return (
      <ErrorMessage>
        <Message>{children}</Message>
        <Button onClick={() => setShow(false)}>OK</Button>
      </ErrorMessage>
    );
  }

  return null;
};

const Message = styled.p`
  text-align: left;
  margin-bottom: 16px;
  font-weight: bold;
`;

const ErrorMessage = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  max-width: 300px;
  margin: auto;
  padding: 16px;
  background-color: var(--color-primary-light);
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  border-top: 0;
  border-radius: 0 0 var(--border-radius) var(--border-radius);
  text-align: end;
`;

export default Error;
