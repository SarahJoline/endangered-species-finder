import styled from "styled-components";
import Portal from "./Portal";
const StyledDropdownMenu = styled.aside`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 50px;
  padding: 20px;
  gap: 20px;
  background: linear-gradient(180deg, #34364a, #4b4d61);
`;

const StyledButton = styled.button`
  border: none;
  background: transparent;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
`;
function DropdownMenu() {
  return (
    <Portal>
      <StyledDropdownMenu>
        <StyledButton>Endangered</StyledButton>
        <StyledButton>Aquatic Mammals</StyledButton>
        <StyledButton>Birds</StyledButton>
        <StyledButton>Fish</StyledButton>
        <StyledButton>Land Mammals</StyledButton>
      </StyledDropdownMenu>
    </Portal>
  );
}

export default DropdownMenu;
