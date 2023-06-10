export function isLastDayOfMonth(date: Date) {
   const currentMonth = date.getMonth();
   const nextDay = new Date(date.getTime() + 24 * 60 * 60 * 1000);
   const nextMonth = nextDay.getMonth();

   return currentMonth !== nextMonth;
}

export function isFirstDayOfMonth(date: Date) {
   return date.getDate() === 1;
}
