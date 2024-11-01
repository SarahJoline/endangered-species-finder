import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
`;

function card({ sp }) {
  console.log(sp);

  return (
    <div key={sp.taxonomy.id}>
      <StyledButton>
        {sp.common_name} ({sp.taxonomy.species})
      </StyledButton>
    </div>
  );
}

export default card;
