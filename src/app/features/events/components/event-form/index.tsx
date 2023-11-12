import {FormEventHandler, PropsWithChildren, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import EventLabelsStore from '@/app/features/events/models/event-labels.store';
import MultiSelectDropdown from '../../../../shared/ui/molecules/multi-select-dropdown';
import Input from '@/app/shared/ui/atoms/Input';
import Button from '@/app/shared/ui/atoms/Button';
import {ColorBar, ColorBarsList, Form, FormControl} from '@/app/features/events/components/event-form/styles';
import {DateEvent} from '@/app/features/events/types/event';
import {ColoredLabelBtn} from '@/app/shared/ui/molecules/multi-select-dropdown/styles';
import {EventSelectOption} from '../event-select-option';
import {Props} from '@/app/features/events/types/event-form';
import {MultiSelectOptionHandler} from '@/app/shared/ui/molecules/multi-select-dropdown/types';
import {EVENT_DEFAULTS} from '@/app/shared/constants/defaults';

const EventForm = <T extends DateEvent>({children, defaultValues = EVENT_DEFAULTS.FORM, onSubmit, ...props}: PropsWithChildren<Props<T>>) => {
   const [form, setForm] = useState(defaultValues);

   useEffect(() => {
      setForm(defaultValues);
   }, [defaultValues]);

   const handleFormSubmit: FormEventHandler = (e) => {
      e.preventDefault();
      onSubmit(form as T);

      setForm(EVENT_DEFAULTS.FORM);
   };

   const handleLabelSelect: MultiSelectOptionHandler<string> = ({selectedOptions}) => {
      setForm(prevState => ({...prevState, labels: selectedOptions}));
   };

   const eventLabelsIDs = Object.keys(EventLabelsStore.getAll);

   return (
       <Form {...props} onSubmit={handleFormSubmit}>
          <div>
             {children}
             <ColorBarsList>
                {form.labels.map(label => (
                    <ColorBar key={label} style={{backgroundColor: EventLabelsStore.getAll[label].color}}/>
                ))}
             </ColorBarsList>
          </div>
          <FormControl>
             <label>Event Name:</label>
             <Input required value={form.name} onChange={e => setForm({...form, name: e.target.value})}/>
          </FormControl>

          <FormControl>
             <label>Multiple Labels:</label>
             <MultiSelectDropdown onDeleteOption={(option) => EventLabelsStore.removeOne(option)}
                 renderOption={(labelID) => <EventSelectOption isSelected={form.labels.includes(labelID)} labelID={labelID}/>}
                 options={eventLabelsIDs} onSelect={handleLabelSelect} preselectedOptions={form.labels}>
                    <ColoredLabelBtn onClick={() => EventLabelsStore.addOne(EVENT_DEFAULTS.LABEL)} type="button">
                        + Add Label
                    </ColoredLabelBtn>
             </MultiSelectDropdown>
          </FormControl>

          <Button>Save</Button>
       </Form>
   );
};
export default observer(EventForm);

