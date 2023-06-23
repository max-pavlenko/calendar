export function exportAsJSON(obj: Record<string, any>) {
   const json = JSON.stringify(obj);
   const blob = new Blob([json], { type: 'application/json' });
   const url = URL.createObjectURL(blob);
   const a = document.createElement('a');
   a.href = url;
   a.download = 'events.json';
   a.click();
   URL.revokeObjectURL(url);
}
