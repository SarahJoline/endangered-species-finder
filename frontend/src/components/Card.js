import styled from "styled-components";

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

function card({ sp, setSelectedSpecies }) {
  return (
    //   // <div key={sp.taxonomy.id}>
    <StyledButton onClick={() => setSelectedSpecies(sp.species)}>
      {sp.species}
    </StyledButton>
    //   // </div>
  );
}

export default card;
