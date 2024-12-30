import styled from "styled-components";

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
`;

function Navigation() {
  return (
    <StyledNavigation>
      <StyledSearchByButton onClick={() => console.log("dropdown")}>
        Search by...
      </StyledSearchByButton>
    </StyledNavigation>
  );
}

export default Navigation;
