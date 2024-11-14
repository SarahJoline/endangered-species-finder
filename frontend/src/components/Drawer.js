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

function Drawer({ selectedSpecies, error }) {
  return (
    <Portal>
      <StyledDrawer>
        {" "}
        {error && <div>No additional information found.</div>}
        {Object.keys(selectedSpecies).length !== 0 && (
          <>
            {" "}
            {selectedSpecies.originalimage && (
              <img
                width="300"
                height="300"
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
