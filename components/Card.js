import styled from 'styled-components';

const Card = styled.article`
  border: 2px solid var(--color-primary-light);
  border-radius: var(--border-radius);
  padding: 16px;
  margin: 16px 0;

  opacity: 1;
  animation-name: fade-in;
  animation-duration: 0.5s;
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;

  @keyframes fade-in {
    from {
      opacity: 0;
    }
  }
`;

export default Card;
