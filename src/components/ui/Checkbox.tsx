import styled from "styled-components";
import {FC, ReactNode, useEffect, useState} from "react";

type Props = {
   checked: boolean;
   onChange?: (checked: boolean) => void;
   label?: ReactNode;
};

const CheckboxContainer = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;

const HiddenCheckbox = styled.input.attrs({type: "checkbox"})`
  position: absolute;
  display: none;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none;
`;

const StyledCheckbox = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-radius: 4px;
`;

const Checkbox: FC<Props> = ({checked = false, label, onChange = () => {}}) => {
   const [isChecked, setIsChecked] = useState(checked);

   useEffect(() => {
      setIsChecked(checked);
   }, [checked]);

   const handleCheckboxChange = () => {
      setIsChecked(prevChecked => !prevChecked);
      onChange(!isChecked);
   };

   return (
       <CheckboxContainer>
          <HiddenCheckbox checked={isChecked} onChange={handleCheckboxChange}/>
          <StyledCheckbox onClick={handleCheckboxChange} type='button'>
                 <svg style={{opacity: isChecked ? 1 : 0}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                     <polyline points="20 6 9 17 4 12"/>
                 </svg>
          </StyledCheckbox>
          {label}
       </CheckboxContainer>
   );
};

export default Checkbox;
