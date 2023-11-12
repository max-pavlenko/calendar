import {useEffect, useRef, useState} from 'react';
import Checkbox from '../../atoms/checkbox';
import {DeleteBtn, DropdownContainer, Option} from '@/app/shared/ui/molecules/multi-select-dropdown/styles';
import {Props} from '@/app/shared/ui/molecules/multi-select-dropdown/types';

const MultiSelectDropdown = <T = string>({options, comparator, onDeleteOption, preselectedOptions = [], onSelect, children, renderOption}: Props<T>) => {
   const [selectedOptions, setSelectedOptions] = useState<T[]>(preselectedOptions);
   const dropdownContainerRef = useRef<HTMLDivElement>(null);
   
   useEffect(() => {
      preselectedOptions && setSelectedOptions(preselectedOptions);
   }, [preselectedOptions]);
   
   function isOptionSelected(option: T) {
      return comparator?.({selectedOptions, option}) ?? selectedOptions.includes(option);
   }
   
   const handleOptionSelect = (option: T) => {
      let newSelectedOptions = [...selectedOptions];
      
      if (isOptionSelected(option)) {
         newSelectedOptions = selectedOptions.filter((selected) => selected !== option);
      } else {
         newSelectedOptions.push(option);
      }
      
      setSelectedOptions(newSelectedOptions);
      onSelect({option, selectedOptions: newSelectedOptions});
   };
   
   return (
       <DropdownContainer ref={dropdownContainerRef}>
          {options.map((option, i) => (
              <Option key={i}>
                 <Checkbox onChange={() => handleOptionSelect(option)} label={renderOption(option)} checked={isOptionSelected(option)}/>
                 {onDeleteOption && <DeleteBtn onClick={() => onDeleteOption(option)}>&times;</DeleteBtn>}
              </Option>
              )
          )}
          {children}
       </DropdownContainer>
   );
};

export default MultiSelectDropdown;
