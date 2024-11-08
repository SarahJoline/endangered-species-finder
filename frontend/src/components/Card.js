import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

function card({ sp, handleClick }) {
  return (
    <div key={sp.taxonomy.id}>
      <StyledButton onClick={handleClick}>
        {sp.common_name} ({sp.taxonomy.species})
      </StyledButton>
    </div>
  );
}

export default card;
