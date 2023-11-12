import ColoredLabels from '@/app/features/events/models/event-labels.store';
import {useState} from 'react';
import InlineEditableText from '../../../../shared/ui/atoms/inline-editable-text';
import {ColorSquare, HiddenColorInput} from '@/app/features/events/components/event-form/styles';

export const EventSelectOption = ({labelID, isSelected}: { labelID: string, isSelected: boolean }) => {
   const {color, label} = ColoredLabels.getAll[labelID];
   const [newLabel, setNewLabel] = useState(label);
   
   if (!color) return null;
   
   return (
       <>
          <InlineEditableText initialText={label} onSubmit={setNewLabel}/>
          <ColorSquare onClick={e => e.stopPropagation()} style={{backgroundColor: color}}>
             <HiddenColorInput value={color} disabled={!isSelected}
                               onChange={e => ColoredLabels.patchOne(labelID, {color: e.target.value, label: newLabel})}
             />
          </ColorSquare>
       </>
   );
};
