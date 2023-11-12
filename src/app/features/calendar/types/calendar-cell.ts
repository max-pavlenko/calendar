import {DateEventHandler, DropDateEventOnDateEventHandler, DropDateEventOnDayHandler} from '@/app/features/events/types/event';

export type CalendarCellProps = {
   onEventClick: DateEventHandler,
   onEventDrop?: DropDateEventOnDateEventHandler,
   onDayDrop?: DropDateEventOnDayHandler,
   onEventDelete?: DateEventHandler
}
