export class DateService {
   static isLastDayOfMonth(date: Date) {
      const currentMonth = date.getMonth();
      const nextDay = new Date(date.getTime() + 24 * 60 * 60 * 1000);
      const nextMonth = nextDay.getMonth();
      
      return currentMonth !== nextMonth;
   }
   
   static isFirstDayOfMonth(date: Date) {
      return date.getDate() === 1;
   }
}
