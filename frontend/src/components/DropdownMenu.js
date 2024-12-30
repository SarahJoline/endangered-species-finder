import styled from "styled-components";
import Portal from "./Portal";
const StyledDropdownMenu = styled.div``;
function DropdownMenu() {
  return (
    <Portal>
      <DropdownMenu></DropdownMenu>
    </Portal>
  );
}

export default DropdownMenu;
