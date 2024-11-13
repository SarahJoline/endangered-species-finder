import styled from "styled-components";

const StyledDrawer = styled.div``;

function Drawer({ selectedSpecies }) {
  return (
    <StyledDrawer>
      {" "}
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
  );
}

export default Drawer;
