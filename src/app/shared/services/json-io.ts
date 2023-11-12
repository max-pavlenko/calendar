export class JsonIOService {
   static export<T extends Record<string, unknown>>(obj: T, fileName = 'events') {
      const json = JSON.stringify(obj);
      const blob = new Blob([json], {type: 'application/json'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}.json`;
      a.click();
      URL.revokeObjectURL(url);
   }
   
   static import<T>(file: File | Blob) {
      const reader = new FileReader();
      
      return new Promise<T>((resolve, reject) => {
         reader.addEventListener('load', () => {
            try {
               const json = reader.result as string;
               const data = JSON.parse(json);
               resolve(data);
            } catch (error) {
               reject(error);
            }
         });
         
         reader.readAsText(file);
      });
   }
}
