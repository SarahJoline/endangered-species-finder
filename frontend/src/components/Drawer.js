import styled from "styled-components";
import Portal from "./Portal";

const StyledDrawer = styled.aside`
  position: fixed;
  display: flex;
  flex-direction: column;
  height: 100%;
  top: 0;
  background-color: #e9f7ec;
  overflow-y: hidden;
  width: 100%;
  z-index: 2;
  padding: 10px;
  box-sizing: border-box;
  @media only screen and (min-width: 48em) {
    max-width: 678px;
    padding: 1.5em;
  }
`;

const StyledHeader = styled.div`
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
  max-width: 50%;
`;

const StyledTitle = styled.h1`
  font-weight: 400;
  font-size: 30px;
  margin-top: 0px;
`;

const StyledSubtitle = styled.h2`
  font-weight: 400;
  font-size: 25px;
`;

const StyledParagraph = styled.p`
  width: 80%;
`;

const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: auto;
  flex: 1;
`;

function Drawer({ selectedSpecies, error, close }) {
  return (
    <Portal>
      <StyledDrawer>
        <StyledHeader>
          <StyledIconButton onClick={() => close()}>
            <img src="/close-line-icon.svg" alt="X" />
          </StyledIconButton>{" "}
        </StyledHeader>
        <StyledContentContainer>
          <StyledTitle>
            {Object.keys(selectedSpecies).length !== 0 &&
              selectedSpecies.title.toUpperCase()}
          </StyledTitle>
          {error && <div>No additional information found.</div>}
          {Object.keys(selectedSpecies).length !== 0 && (
            <>
              {selectedSpecies.originalimage && (
                <StyledImage
                  alt={selectedSpecies.title}
                  src={selectedSpecies.originalimage.source}
                />
              )}
              <StyledSubtitle>{selectedSpecies.description}</StyledSubtitle>
              <StyledParagraph>{selectedSpecies.extract}</StyledParagraph>
            </>
          )}
        </StyledContentContainer>
      </StyledDrawer>
    </Portal>
  );
}

export default Drawer;
