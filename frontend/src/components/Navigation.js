import React, { useState } from "react";
import styled from "styled-components";
import DropdownMenu from "./DropdownMenu";

const StyledNavigation = styled.div`
  min-height: 50px;
  flex: 1;
  background: linear-gradient(180deg, #4b4d61, #34364a);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const StyledSearchByButton = styled.button`
  border: none;
  background-color: transparent;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
`;

function Navigation() {
  const [open, setOpen] = useState(false);
  return (
    <StyledNavigation>
      <StyledSearchByButton onClick={() => setOpen(!open)}>
        Search by...
      </StyledSearchByButton>
      {open && <DropdownMenu />}
    </StyledNavigation>
  );
}

export default Navigation;
