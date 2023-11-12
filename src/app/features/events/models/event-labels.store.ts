import {makeAutoObservable} from 'mobx';
import {EventLabel, EventLabelsMap} from '@/app/features/events/types/event-label';
import {DefaultEventLabels} from '@/app/shared/constants/defaults';

class EventLabelsStore {
   eventLabels: EventLabelsMap = {};

   constructor() {
      makeAutoObservable(this);
      this.initializeEventLabels();
   }

   initializeEventLabels() {
      this.eventLabels = Object.entries(DefaultEventLabels).reduce((prev, [key, value]) => {
         return { ...prev, [crypto.randomUUID()]: { color: value, label: key } };
      }, {});
   }

   addOne(eventLabel: EventLabel) {
      const id = crypto.randomUUID();
      this.eventLabels[id] = eventLabel;
   }

   removeOne(id: string) {
      delete this.eventLabels[id];
   }

   patchOne(id: string, eventLabel: Partial<EventLabel>) {
      const labelToEdit = this.eventLabels[id];
      this.eventLabels[id] = { ...labelToEdit, ...eventLabel };
   }

   get getAll() {
      return this.eventLabels;
   }

   set setEventLabels(newValues: typeof this.eventLabels) {
      this.eventLabels = newValues;
   }
}

export default new EventLabelsStore();
