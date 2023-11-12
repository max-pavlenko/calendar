import {EventLabelSearchOption, EventLabelsMap} from '@/app/features/events/types/event-label';

export type BaseEvent = {
   labels: string[],
   name: string,
}

export type DateEvent = BaseEvent & {
   date: Date,
   id: string,
}

export type SerializedDateEvents = { dateEvents: DateEvent[], eventLabels: EventLabelsMap };

export function isSerializedDateEvents(ctx: unknown): ctx is SerializedDateEvents {
   return !!ctx && typeof ctx === 'object' && 'dateEvents' in ctx && 'eventLabels' in ctx;
}

export interface EventsFilters {
   labelOption: EventLabelSearchOption | null,
   name: string,
}

export type DateEventHandler = (event: DateEvent) => void;
export type DropDateEventOnDayHandler = ({event, date}: { event: DateEvent, date: Date, }) => void;
export type DropDateEventOnDateEventHandler = (events: { eventOnDropped: DateEvent, currentlyDraggedEvent: DateEvent, }) => void;
