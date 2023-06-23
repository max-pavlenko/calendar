import styled from "styled-components";

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;
export const DropdownDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
`;
export const DropdownList = styled.ul`
  position: absolute;
  top: calc(100% - 3px);
  left: 0;
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 4px 4px;
  background-color: #fff;
  z-index: 10;
  
`;
export const DropdownListItem = styled.li`
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }
`;
