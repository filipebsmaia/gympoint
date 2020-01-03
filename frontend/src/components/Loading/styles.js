import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;

  svg {
    margin: 15px;
    animation: rotate 1.5s linear infinite;

    @keyframes rotate {
      to {
        transform: rotate(-360deg);
      }
    }
  }
`;
