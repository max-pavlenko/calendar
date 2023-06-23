import styled from "styled-components";

export const DropdownContainer = styled.div`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  max-height: 200px;
  overflow-y: auto;
`;
export const Option = styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover > button {
    opacity: 1;
  }
`;
export const DeleteBtn = styled.button`
  background-color: transparent;
  color: red;
  opacity: 0;
  font-size: 18px;
`
export const AddColoredLabelBtn = styled.button`
  background-color: mistyrose;
  padding: 5px 10px;
  font-size: 15px;
  width: 100%;
`;
