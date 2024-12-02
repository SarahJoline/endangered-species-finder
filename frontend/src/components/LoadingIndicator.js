import styled, { keyframes } from "styled-components";
import Portal from "./Portal";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingOverlay = styled.div`
  position: absolute; /* Positioned relative to the map container */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10; /* Ensures it appears above map markers and tooltips */
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #fff;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  color: white;
  margin-top: 10px;
  font-size: 1.2rem;
`;

function LoadingIndicator() {
  return (
    <Portal>
      <LoadingOverlay>
        <Spinner />
        <LoadingText>Loading...</LoadingText>
      </LoadingOverlay>
    </Portal>
  );
}

export default LoadingIndicator;
