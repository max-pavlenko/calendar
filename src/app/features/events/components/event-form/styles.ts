import styled from 'styled-components';

export const ColorSquare = styled.label`
  width: 15px;
  position: relative;
  height: 15px;
  border-radius: 4px;
  padding: 0;
  border: none;
  cursor: pointer;
`;
export const FormControl = styled.div`
  display: grid;
  gap: 5px;
`;
export const Form = styled.form.attrs(props => ({
   ...props
}))`
  display: grid;
  gap: 8px;
`;
export const ColorBarsList = styled.ul`
  display: flex;
  gap: 3px;
`;
export const ColorBar = styled.li`
  height: 3px;
  border-radius: 7px;
  flex: 1;
`;
export const HiddenColorInput = styled.input.attrs({
   type: "color",
})`
  height: 0;
  width: 0;
  visibility: hidden;
`;
