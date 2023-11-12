import html2canvas from 'html2canvas';

export class WindowService {
   static captureScreenshot(element: HTMLElement, filename: string) {
      html2canvas(element).then(canvas => {
         const dataURL = canvas.toDataURL('image/png');
         
         const downloadLink = document.createElement('a');
         downloadLink.href = dataURL;
         downloadLink.download = filename;
         
         downloadLink.click();
         downloadLink.remove();
      });
   }
}
