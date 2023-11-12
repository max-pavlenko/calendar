import {FC} from 'react';
import Calendar from 'react-calendar';
import {OnChangeFunc, TileContentFunc} from 'react-calendar/src/shared/types';
import CalendarTileContent from '@/app/features/calendar/components/calendar-tile-content';
import EventsStore from '@/app/features/calendar/model/events.store';
import {DateEvent, DropDateEventOnDateEventHandler, DropDateEventOnDayHandler} from '@/app/features/events/types/event';

type Props = {
   onDayClick: OnChangeFunc;
   onEventClick: (event: DateEvent) => void;
};

const CalendarGrid: FC<Props> = ({onDayClick, onEventClick}) => {
   const handleDeleteDateEvent = ({id}: DateEvent) => EventsStore.removeEvent(id);
   const handleOnDayDrop: DropDateEventOnDayHandler = ({date, event}) => EventsStore.patchEvent({...event, date});
   
   const handleOnDateEventDrop: DropDateEventOnDateEventHandler = ({eventOnDropped, currentlyDraggedEvent}) => {
      if (+eventOnDropped.date !== +currentlyDraggedEvent.date) {
         currentlyDraggedEvent.date = eventOnDropped.date;
      }
      
      EventsStore.changeEventDatePosition(currentlyDraggedEvent, eventOnDropped.id);
   };
   
   const CalendarCell: TileContentFunc = (libProps) =>
       <CalendarTileContent onEventDrop={handleOnDateEventDrop} onDayDrop={handleOnDayDrop}
                            onEventDelete={handleDeleteDateEvent} onEventClick={onEventClick} {...libProps} />;
   
   return (
       <Calendar showFixedNumberOfWeeks onClickDay={onDayClick} tileContent={CalendarCell}/>
   );
};

export default CalendarGrid;
