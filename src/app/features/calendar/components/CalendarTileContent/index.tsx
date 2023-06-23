import {DragEvent, DragEventHandler, FC, MouseEvent, useEffect, useState} from "react";
import {TileArgs} from "react-calendar/src/shared/types";
import {DateEvent} from "@/types/Events";
import {isFirstDayOfMonth, isLastDayOfMonth} from "@/utils/dates";
import {observer} from "mobx-react-lite";
import ColoredLabels from "@/store/ColoredLabels";
import {getPluralString} from "@/utils/getPluralString";
import {
   ColorLabel,
   ColorLabelsContainer,
   DateContainer,
   DateEventCard,
   DateEventCardsList,
   DayCellContainer,
   DeleteEventButton,
   EventsAmount
} from "@/app/features/calendar/components/CalendarTileContent/styles";

type DateEventClickHandler = (event: DateEvent) => void;
export type DropDateEventOnDayHandler = ({event, date}: { event: DateEvent, date: Date, }) => void;
export type DropDateEventOnDateEventHandler = (events: { eventOnDropped: DateEvent, currentlyDraggedEvent: DateEvent, }) => void;

let currentlyDraggedEvent: null | DateEvent = null;

type Props = {
   events: DateEvent[],
   onEventClick?: DateEventClickHandler,
   onEventDrop?: DropDateEventOnDateEventHandler,
   onDayDrop?: DropDateEventOnDayHandler,
   onDeleteEventClick?: DateEventClickHandler
} & TileArgs;

const CalendarTileContent: FC<Props> = ({
                                                      date, view, events,
                                                      onDayDrop = () => {},
                                                      onEventDrop = () => {},
                                                      onDeleteEventClick = () => {},
                                                      onEventClick = () => {},
                                                   }) => {
   const [eventsForCurrentDay, setEventsForCurrentDay] = useState<DateEvent[]>([]);

   useEffect(() => {
      const filteredDateEventsForCurrentDay = events.filter(event => event.date.toDateString() === date.toDateString())
      setEventsForCurrentDay(filteredDateEventsForCurrentDay);
   }, [events]);

   if (view !== "month") return null;

   const handleDateEventClick = (e: MouseEvent, event: DateEvent) => {
      e.stopPropagation();
      onEventClick(event);
   };

   function handleDateEventDragStart(eventStartOfDragging: DateEvent) {
      currentlyDraggedEvent = eventStartOfDragging;
   }

   const handleDragOverDateEvent: DragEventHandler = (e) => {
      e.preventDefault();
   }

   function handleDropOnDateEvent(e: DragEvent, eventOnDropped: DateEvent) {
      e.preventDefault();
      e.stopPropagation();
      if (!currentlyDraggedEvent) return;

      onEventDrop({eventOnDropped, currentlyDraggedEvent})
   }

   const handleDeleteEvent = (e: MouseEvent, event: DateEvent) => {
      e.stopPropagation();
      onDeleteEventClick(event)
   };

   const handleDropOnDay = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onDayDrop({event: currentlyDraggedEvent!, date})
   };

   const handleDragEnterDay: DragEventHandler<HTMLElement> = (e) => {
      e.preventDefault();
   };

   const handleDragLeaveDay: DragEventHandler<HTMLElement> = (e) => {
      e.preventDefault();
   };

   const handleDragOverDay: DragEventHandler<HTMLElement> = (e) => {
      e.preventDefault();
   };

   const isLastOrFirstDay = isLastDayOfMonth(date) || isFirstDayOfMonth(date);
   const eventsAmount = eventsForCurrentDay.length;

   return (
       <DayCellContainer onDragEnter={handleDragEnterDay}
                         onDragLeave={handleDragLeaveDay}
                         onDragOver={handleDragOverDay}
                         onDrop={handleDropOnDay}>
          <DateContainer>
             {isLastOrFirstDay && <time>{date.toLocaleString("en-US", {month: "short"})}</time>}
             <time>{date.getDate()}</time>
             {eventsAmount > 0 && <EventsAmount>{eventsAmount} event{getPluralString(eventsAmount)}</EventsAmount>}
          </DateContainer>
          <DateEventCardsList>
             {eventsForCurrentDay.map((dateEvent) => {
                const {name, labels, id} = dateEvent;

                return (
                    <DateEventCard draggable key={id}
                                   onDragStart={_ => handleDateEventDragStart(dateEvent)}
                                   onDragOver={handleDragOverDateEvent}
                                   onDrop={e => handleDropOnDateEvent(e, dateEvent)}
                                   onClick={e => handleDateEventClick(e, dateEvent)}>
                       <DeleteEventButton onClick={e => handleDeleteEvent(e, dateEvent)}>&times;</DeleteEventButton>
                       <ColorLabelsContainer>
                          {labels.map(label => <ColorLabel key={label} style={{backgroundColor: ColoredLabels.getLabelColors[label].color}}/>)}
                       </ColorLabelsContainer>
                       <span>{name}</span>
                    </DateEventCard>
                );
             })}
          </DateEventCardsList>
       </DayCellContainer>
   );
};

export default observer(CalendarTileContent);
