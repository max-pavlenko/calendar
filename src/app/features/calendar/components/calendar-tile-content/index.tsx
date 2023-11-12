import {DragEvent, DragEventHandler, EventHandler, FC, MouseEvent} from 'react';
import {TileArgs} from 'react-calendar/src/shared/types';
import {DateEvent, DateEventHandler} from '@/app/features/events/types/event';
import {observer} from 'mobx-react-lite';
import {
   ColorLabel,
   ColorLabelsContainer,
   DateContainer,
   DateEventCard,
   DateEventCardsList,
   DayCellContainer,
   DeleteEventButton,
   EventsAmount
} from '@/app/features/calendar/components/calendar-tile-content/styles';
import {CalendarCellProps} from '@/app/features/calendar/types/calendar-cell';
import eventLabelsStore from '@/app/features/events/models/event-labels.store';
import {DateService} from '@/app/shared/services/date';
import EventsStore from '@/app/features/calendar/model/events.store';

type Props = CalendarCellProps & TileArgs;
let currentlyDraggedEvent: null | DateEvent = null;

const CalendarTileContent: FC<Props> = ({date, view, onDayDrop, onEventDrop, onEventDelete, onEventClick}) => {
   const dateEventsForCurrentDay = EventsStore.getFilteredEventsForDay(date);
   
   if (view !== 'month') return null;
   
   const handleDateEventClick = (e: MouseEvent, event: DateEvent) => {
      e.stopPropagation();
      onEventClick(event);
   };
   
   const handleDateEventDragStart: DateEventHandler = (eventStartOfDragging) => {
      currentlyDraggedEvent = eventStartOfDragging;
   };
   
   function handleDropOnDateEvent(e: DragEvent, eventOnDropped: DateEvent) {
      e.preventDefault();
      e.stopPropagation();
      if (!currentlyDraggedEvent) return;
      
      onEventDrop?.({eventOnDropped, currentlyDraggedEvent: currentlyDraggedEvent});
   }
   
   const handleDeleteEvent = (e: MouseEvent, event: DateEvent) => {
      e.stopPropagation();
      console.log(event, onEventDelete, 'event');
      onEventDelete?.(event);
   };
   
   const handleDropOnDay: DragEventHandler = (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (!currentlyDraggedEvent) return;
      onDayDrop?.({event: currentlyDraggedEvent!, date});
   };
   
   const preventDefault: EventHandler<any> = (e) => {
      e.preventDefault();
   };
   
   const getPluralString = (length: number)  => length > 1 ? 's' : '';
   
   const isLastOrFirstDay = DateService.isLastDayOfMonth(date) || DateService.isFirstDayOfMonth(date);
   const eventsAmount = dateEventsForCurrentDay.length;
   const localDate = date.toLocaleString('en-US', {month: 'short'})
   
   return (
       <DayCellContainer onDragEnter={preventDefault} onDragLeave={preventDefault} onDragOver={preventDefault} onDrop={handleDropOnDay}>
          <DateContainer>
             {isLastOrFirstDay && <time>{localDate}</time>}
             <time>{date.getDate()}</time>
             {eventsAmount > 0 && <EventsAmount>{eventsAmount} event{getPluralString(eventsAmount)}</EventsAmount>}
          </DateContainer>
          <DateEventCardsList>
             {dateEventsForCurrentDay.map((dateEvent) => (
                 <DateEventCard draggable key={dateEvent.id} onDragStart={_ => handleDateEventDragStart(dateEvent)} onDragOver={preventDefault}
                                onDrop={e => handleDropOnDateEvent(e, dateEvent)} onClick={e => handleDateEventClick(e, dateEvent)}>
                    {onEventDelete && <DeleteEventButton onClick={e => handleDeleteEvent(e, dateEvent)}>&times;</DeleteEventButton>}
                    <ColorLabelsContainer>
                       {dateEvent.labels.map(label => <ColorLabel key={label} style={{backgroundColor: eventLabelsStore.getAll[label].color}}/>)}
                    </ColorLabelsContainer>
                    <span>{dateEvent.name}</span>
                 </DateEventCard>
             ))}
          </DateEventCardsList>
       </DayCellContainer>
   );
};

export default observer(CalendarTileContent);
