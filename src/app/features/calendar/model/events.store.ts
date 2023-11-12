import {DateEvent, EventsFilters} from '@/app/features/events/types/event';
import {makeAutoObservable} from 'mobx';

class EventsStore {
   dateEvents: DateEvent[] = [];
   filters: EventsFilters = {
      labelOption: null,
      name: '',
   };
   
   constructor() {
      makeAutoObservable(this);
   }
   
   patchFilters(filters: Partial<EventsFilters>) {
      this.filters = {...this.filters, ...filters};
   }
   
   setDateEvents(dateEvents: DateEvent[]) {
      this.dateEvents = dateEvents;
   }
   
   removeEvent(id: string) {
      this.dateEvents = this.dateEvents.filter((event) => event.id !== id);
   }
   
   patchEvent(event: Partial<DateEvent>) {
      const eventIndex = this.dateEvents.findIndex((e) => e.id === event.id);
      this.dateEvents[eventIndex] = {...this.dateEvents[eventIndex], ...event};
   }
   
   addEvent(event: DateEvent) {
      this.dateEvents.push(event);
   }
   
   changeEventDatePosition(event: DateEvent, id: DateEvent['id']) {
      const currentEventIdx = this.dateEvents.findIndex(ev => ev.id === event.id);
      const anotherEventIdx = this.dateEvents.findIndex(event => event.id === id);
      const idxToInsert = anotherEventIdx + (anotherEventIdx >= currentEventIdx ? 1 : 0);
      
      this.dateEvents.splice(currentEventIdx, 1);
      this.dateEvents.splice(idxToInsert, 0, event);
   }
   
   getFilteredEventsForDay(date: Date) {
      const {name, labelOption} = this.filters;
      return this.dateEvents.filter(event => {
         const filteredByTitle = event.name.toLowerCase().includes(name.toLowerCase());
         const filterByLabels = !labelOption?.value || event.labels.some(label => label === labelOption?.value);
         return filteredByTitle && filterByLabels && +event.date === +date;
      })
   }
}

export default new EventsStore();
