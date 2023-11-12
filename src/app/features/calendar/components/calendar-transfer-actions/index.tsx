import {ChangeEventHandler, FC, useRef} from 'react';
import Button from '@/app/shared/ui/atoms/Button';
import {WindowService} from '@/app/shared/services/window';
import {JsonIOService} from '@/app/shared/services/json-io';
import {isSerializedDateEvents, SerializedDateEvents} from '@/app/features/events/types/event';
import EventLabelsStore from '@/app/features/events/models/event-labels.store';
import EventsStore from '@/app/features/calendar/model/events.store';
import {observer} from 'mobx-react-lite';
import {ActionsWrapper} from '@/app/features/calendar/components/calendar-transfer-actions/styles';

type Props = {};

const CalendarTransferActions: FC<Props> = ({}) => {
   const importDateEventsInputRef = useRef<HTMLInputElement>(null);
   
   const handleImportDateEvents = () => {
      importDateEventsInputRef.current!.click();
   };
   
   const handleEventsImport = (data: unknown) => {
      if (!isSerializedDateEvents(data)) return alert('Invalid file format');
      
      data.dateEvents = data.dateEvents.map(event => ({...event, date: new Date(event.date)}));
      EventLabelsStore.setEventLabels = data.eventLabels;
      EventsStore.setDateEvents(data.dateEvents);
      importDateEventsInputRef.current!.value = '';
   };
   
   const handleFileImport: ChangeEventHandler<HTMLInputElement> = async e => {
      JsonIOService.import<SerializedDateEvents>(e.target.files![0]).then(handleEventsImport);
   }
   
   return (
       <ActionsWrapper>
          <Button onClick={() => WindowService.captureScreenshot(document.querySelector('.react-calendar')!, 'my_calendar')}>
             Download
          </Button>
          <Button onClick={() => JsonIOService.export<SerializedDateEvents>({dateEvents: EventsStore.dateEvents, eventLabels: EventLabelsStore.getAll})}>
             Export
          </Button>
          <Button onClick={handleImportDateEvents}>Import</Button>
          <input onChange={handleFileImport} ref={importDateEventsInputRef} type="file" style={{display: 'none'}} accept=".json"/>
       </ActionsWrapper>
   );
};

export default observer(CalendarTransferActions);
