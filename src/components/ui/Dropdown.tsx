import {ReactNode, useState} from 'react';
import styled from 'styled-components';

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

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownDiv = styled.div`
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

const DropdownList = styled.ul`
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

const DropdownListItem = styled.li`
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }
`;

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
