import styled from 'styled-components';

const Loading = () => {
  return <LoadingOverlay>Por favor, aguarde...</LoadingOverlay>;
};

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: hsl(0deg 0% 100% / 80%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Loading;
