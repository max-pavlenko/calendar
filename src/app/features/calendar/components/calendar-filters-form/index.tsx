import {FC, PropsWithChildren} from 'react';
import Input from '@/app/shared/ui/atoms/Input';
import Dropdown from '@/app/shared/ui/atoms/dropdown';
import EventLabelsStore from '@/app/features/events/models/event-labels.store';
import {Actions, OptionButton} from '@/app/features/calendar/components/calendar-filters-form/styles';
import {EventLabelSearchOption} from '@/app/features/events/types/event-label';
import EventsStore from '@/app/features/calendar/model/events.store';
import {observer} from 'mobx-react-lite';
import {EVENT_DEFAULTS} from '@/app/shared/constants/defaults';

type Props = PropsWithChildren<{}>;

const CalendarFilters: FC<Props> = ({children}) => {
   const dropdownLabelsOptions: EventLabelSearchOption[] = [
      EVENT_DEFAULTS.LABEL_SEARCH_OPTION,
      ...Object.entries(EventLabelsStore.getAll).map(([id, {label}]) => ({value: id, label}))
   ];
   
   return (
       <Actions>
          <Input placeholder="Search tasks" value={EventsStore.filters.name} onChange={(e) => EventsStore.patchFilters({name: e.target.value})}/>
          <Dropdown selectedOption={EventsStore.filters.labelOption} onChange={(option) => EventsStore.patchFilters({labelOption: option})}
                    options={dropdownLabelsOptions} renderOption={({label}) => <OptionButton>{label}</OptionButton>}/>
          {children}
       </Actions>
   );
};

export default observer(CalendarFilters);
