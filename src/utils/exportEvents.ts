import {DateEvent} from "@/types/Event";
import {ColoredLabelRecord} from "@/types/Label";

export function exportEvents(events: DateEvent[], coloredLabels: ColoredLabelRecord) {
   const json = JSON.stringify({events, coloredLabels});
   const blob = new Blob([json], { type: 'application/json' });
   const url = URL.createObjectURL(blob);
   const a = document.createElement('a');
   a.href = url;
   a.download = 'events.json';
   a.click();
   URL.revokeObjectURL(url);
}
