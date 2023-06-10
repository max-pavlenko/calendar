import React, {DragEvent, DragEventHandler, FC, MouseEvent, useEffect, useState} from "react";
import {TileArgs} from "react-calendar/src/shared/types";
import {DateEvent} from "@/types/Event";
import {isFirstDayOfMonth, isLastDayOfMonth} from "../../dates";
import styled from "styled-components";
import {observer} from "mobx-react-lite";
import ColoredLabels from "@/store/ColoredLabels";

type DateEventFn = (event: DateEvent) => void;
export type DayDropHandler = ({event, date}: { event: DateEvent, date: Date, }) => void;
export type EventDropHandler = (events: { eventOnDropped: DateEvent, currentlyDraggedEvent: DateEvent, }) => void;

const EventCard = styled.li`
  background-color: #fff;
  position: relative;
  padding: 7px;
  border-radius: 6px;
  text-align: start;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.3);

  &:hover a {
    opacity: 1;
  }
`;

const EventCardsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ColorLabelsContainer = styled.ul`
  display: flex;
  gap: 2px;
  margin-bottom: 4px;
`;

const ColorLabel = styled.li`
  height: 5px;
  border-radius: 10px;
  width: 35px;
`;

const DeleteEvent = styled.a`
  opacity: 0;
  position: absolute;
  top: 5px;
  right: 3px;
  background-color: transparent;
  width: 15px;
  height: 15px;
  color: red;
  border-radius: 7px;
  display: grid;
  place-content: center;
  font-size: 16px;
`

const DayContainer = styled.div`
  display: flex;
  padding: 7px;
  height: 100%;
  justify-content: flex-start;
  gap: 4px;
  flex-direction: column;
  width: 100%;
`

const EventsAmount = styled.span`
   font-size: 11px;
  font-weight: 400;
`

let currentlyDraggedEvent: null | DateEvent = null;

type Props = {
   events: DateEvent[],
   onEventClick?: DateEventFn,
   onEventDrop?: EventDropHandler,
   onDayDrop?: DayDropHandler,
   onDeleteEventClick?: DateEventFn
}

const TileContent: FC<TileArgs & Props> = ({
                                              date, view, events,
                                              onDayDrop = () => {},
                                              onEventDrop = () => {},
                                              onDeleteEventClick = () => {},
                                              onEventClick = () => {},
                                           }) => {
   if (view !== "month") return null;

   const [eventsForCurrentDay, setEventsForCurrentDay] = useState<DateEvent[]>([]);

   useEffect(() => {
      const filteredEventsForCurrentDay = events.filter(event => event.date.toDateString() === date.toDateString())
      setEventsForCurrentDay(filteredEventsForCurrentDay);
   }, [events]);

   const handleEventClick = (e: MouseEvent, event: DateEvent) => {
      e.stopPropagation();
      onEventClick(event);
   };

   function handleDragStart(eventStartOfDragging: DateEvent) {
      currentlyDraggedEvent = eventStartOfDragging;
   }

   const handleDragOver: DragEventHandler = (e) => {
      e.preventDefault();
   };

   function handleDropOnEvent(e: DragEvent, eventOnDropped: DateEvent) {
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
       <DayContainer onDragEnter={handleDragEnterDay}
                     onDragLeave={handleDragLeaveDay}
                     onDragOver={handleDragOverDay}
                     onDrop={handleDropOnDay}>
          <DateContainer>
             {isLastOrFirstDay && <time>{date.toLocaleString("en-US", {month: "short"})}</time>}
             <span>{date.getDate()}</span>
             {eventsAmount > 0 && <EventsAmount>{eventsAmount} event{eventsAmount > 1 ? 's' : ''}</EventsAmount>}
          </DateContainer>
          <EventCardsList>
             {eventsForCurrentDay.map((event) => {
                const {name, labels, id} = event;

                return (
                    <EventCard draggable key={id}
                               onDragStart={_ => handleDragStart(event)}
                               onDragOver={handleDragOver}
                               onDrop={e => handleDropOnEvent(e, event)}
                               onClick={e => handleEventClick(e, event)}>
                       <DeleteEvent onClick={e => handleDeleteEvent(e, event)}>&times;</DeleteEvent>
                       <ColorLabelsContainer>
                          {labels.map(label => <ColorLabel key={label} style={{backgroundColor: ColoredLabels.getLabelColors[label].color}}/>)}
                       </ColorLabelsContainer>
                       <span>{name}</span>
                    </EventCard>
                );
             })}
          </EventCardsList>
       </DayContainer>
   );
};

export default observer(TileContent);
