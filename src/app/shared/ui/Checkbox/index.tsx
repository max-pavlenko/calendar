import {FC, ReactNode, useEffect, useState} from "react";
import {CheckboxContainer, HiddenCheckbox, StyledCheckbox} from "@/app/shared/ui/Checkbox/styles";

type Props = {
   checked: boolean;
   onChange?: (checked: boolean) => void;
   label?: ReactNode;
};

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
