import styled from "styled-components";
import Portal from "./Portal";

const StyledDrawer = styled.aside`
  position: fixed;
  height: 100%;
  top: 0;
  background-color: #e9f7ec;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  // max-height: 300px;
  max-width: 40vw;
`;

const StyledTitle = styled.h1`
  font-weight: 400;
  font-size: 30px;
`;

const StyledSubtitle = styled.h2``;

const StyledParagraph = styled.p`
  width: 80%;
`;

const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledPlaceHolder = styled.div`
  width: 40px;
`;

function Drawer({ selectedSpecies, error, close }) {
  return (
    <Portal>
      <StyledDrawer>
        <StyledHeader>
          <StyledPlaceHolder></StyledPlaceHolder>
          <StyledTitle>{selectedSpecies.title}</StyledTitle>
          <StyledIconButton onClick={() => close()}>
            <img src="/close-line-icon.svg" alt="X" />
          </StyledIconButton>{" "}
        </StyledHeader>
        <StyledContentContainer>
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
