import {ReactNode, useState} from 'react';
import {DropdownContainer, DropdownDiv, DropdownList, DropdownListItem} from "@/app/shared/ui/Dropdown/styles";

type Option = {
   value: string;
   label: string;
};

type Props<T> = {
   options: T[];
   selectedOption?: T | null;
   onChange?: (option: T | null) => void;
   renderOption: (option: T) => ReactNode;
};

const Dropdown = <T extends Option>({options, selectedOption, onChange, renderOption}: Props<T>) => {
   const [isOpen, setIsOpen] = useState(false);

   const handleDropdownToggle = () => {
      setIsOpen(prev => !prev);
   };

   const handleOptionSelect = (option: T) => {
      onChange && onChange(option);
      setIsOpen(false);
   };

   return (
       <DropdownContainer>
          <DropdownDiv onClick={handleDropdownToggle}>
             {selectedOption ? renderOption(selectedOption) : 'Select an option'}
          </DropdownDiv>
          {isOpen && (
              <DropdownList>
                 {options.map((option) => (
                     <DropdownListItem
                         key={option.value}
                         onClick={() => handleOptionSelect(option)}
                     >
                        {renderOption(option)}
                     </DropdownListItem>
                 ))}
              </DropdownList>
          )}
       </DropdownContainer>
   );
};

export default Dropdown;
