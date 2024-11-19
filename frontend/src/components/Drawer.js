import styled from "styled-components";
import Portal from "./Portal";

const StyledDrawer = styled.aside`
  position: fixed;
  height: 100%;
  top: 0;
  background-color: #ffffff;
  overflow-y: auto;
  width: 100%;
  z-index: 2;
  padding: 20px;
  @media only screen and (min-width: 48em) {
    max-width: 678px;
    padding: 2.5em;
  }
`;

const StyledHeader = styled.div`
  flex: 1;
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
`;

const StyledIconButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
  border: 0;
  width: 40px;
  height: 40px;
`;

const StyledImage = styled.img`
  max-height: 300px;
  max-width: 300px;
`;

function Drawer({ selectedSpecies, error, close }) {
  return (
    <Portal>
      <StyledDrawer>
        <StyledHeader>
          <StyledIconButton onClick={() => close()}>
            {" "}
            <img src="/close-line-icon.svg" alt="X" />
          </StyledIconButton>{" "}
        </StyledHeader>
        {error && <div>No additional information found.</div>}
        {Object.keys(selectedSpecies).length !== 0 && (
          <>
            {" "}
            {selectedSpecies.originalimage && (
              <StyledImage
                alt={selectedSpecies.title}
                src={selectedSpecies.originalimage.source}
              />
            )}
            <h1>{selectedSpecies.title}</h1>
            <h2>{selectedSpecies.description}</h2>
            <p>{selectedSpecies.extract}</p>
          </>
        )}
      </StyledDrawer>
    </Portal>
  );
}

export default Drawer;
