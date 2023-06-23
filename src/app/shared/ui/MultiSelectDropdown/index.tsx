import {ReactNode, useEffect, useRef, useState} from "react";
import Checkbox from "@/app/shared/ui/Checkbox";
import {AddColoredLabelBtn, DeleteBtn, DropdownContainer, Option} from "@/app/shared/ui/MultiSelectDropdown/styles";

export type MultiSelectOptionHandler<T> = ({selectedOptions, option}: { option: T, selectedOptions: T[] }) => void;

type Props<T> = {
   options: T[],
   onSelect?: MultiSelectOptionHandler<T>,
   renderOption: (option: T) => ReactNode,
   preselectedOptions?: T[],
   onAddOption?: () => void,
   onDeleteOption?: (option: T) => void
};

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
