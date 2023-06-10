import {ReactNode, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import Checkbox from "@/components/ui/Checkbox";

export type MultiSelectHandler<T> = ({}: { option: T, selectedOptions: T[] }) => void;

type Props<T> = {
   options: T[],
   onSelect?: MultiSelectHandler<T>,
   renderOption: (option: T) => ReactNode,
   preselectedOptions?: T[],
   onAddOption?: () => void,
   onDeleteOption?: (option: T) => void
};

const DropdownContainer = styled.div`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  max-height: 200px;
  overflow-y: auto;
`;

const Option = styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover > button {
    opacity: 1;
  }
`;

const DeleteBtn = styled.button`
  background-color: transparent;
  color: red;
  opacity: 0;
  font-size: 18px;
`

const AddColoredLabelBtn = styled.button`
  background-color: mistyrose;
  padding: 5px 10px;
  font-size: 15px;
  width: 100%;
`;

const MultiSelectDropdown = <T extends string>({options, onDeleteOption, preselectedOptions = [], onAddOption, onSelect = () => {}, renderOption}: Props<T>) => {
   const [selectedOptions, setSelectedOptions] = useState<T[]>(preselectedOptions);
   const dropdownContainerRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      setSelectedOptions(preselectedOptions);
   }, [preselectedOptions]);

   const handleOptionSelect = (option: T) => {
      let newSelectedOptions = [...selectedOptions];

      if (selectedOptions.includes(option)) {
         newSelectedOptions = selectedOptions.filter((selected) => selected !== option);
      } else {
         newSelectedOptions.push(option);
      }

      setSelectedOptions(newSelectedOptions);
      onSelect({option, selectedOptions: newSelectedOptions});
   };


   const handleAddOption = () => {
      onAddOption && onAddOption();
      setTimeout(() => dropdownContainerRef.current?.scroll({top: dropdownContainerRef.current!.scrollHeight, behavior: 'smooth'}), 0);
   };

   return (
       <DropdownContainer ref={dropdownContainerRef}>
          {options.map((option, i) => (
                  <Option key={option}>
                     <Checkbox onChange={_ => handleOptionSelect(option)} label={renderOption(option)} checked={selectedOptions.includes(option)}/>
                     {onDeleteOption && <DeleteBtn onClick={_ => onDeleteOption(option)}>&times;</DeleteBtn>}
                  </Option>
              )
          )}
          {onAddOption &&
              <AddColoredLabelBtn onClick={handleAddOption} type="button">
                  + Add Label
              </AddColoredLabelBtn>
          }
       </DropdownContainer>
   );
};

export default MultiSelectDropdown;
