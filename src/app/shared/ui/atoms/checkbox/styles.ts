import styled from 'styled-components';

export const CheckboxContainer = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;
export const HiddenCheckbox = styled.input.attrs({type: "checkbox"})`
  position: absolute;
  display: none;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
`;
export const StyledCheckbox = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-radius: 4px;
`;
