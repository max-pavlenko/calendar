import {DateEvent} from "@/types/Events";
import {ColoredLabelRecord} from "@/types/Labels";

export type ExportValues = { events: DateEvent[], coloredLabels: ColoredLabelRecord };

export function importEvents(file: File | Blob, onComplete: (events: ExportValues) => void) {
   const reader = new FileReader();

   reader.addEventListener('load', () => {
      try {
         const json = reader.result as string;
         const data = JSON.parse(json) as ExportValues;
         if (!data.events || !data.coloredLabels) return;

         onComplete({...data, events: data.events.map(event => ({...event, date: new Date(event.date)}))});
      } catch (error) {
         console.error('Error parsing JSON file:', error);
      }
   });

   reader.readAsText(file);
}
