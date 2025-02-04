export function getWeekNumber(date: Date) {
  const tempDate = new Date(date);
  tempDate.setHours(0, 0, 0, 0);
  tempDate.setDate(tempDate.getDate() + 3 - ((tempDate.getDay() + 6) % 7));

  const yearStart = new Date(tempDate.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(
    ((tempDate.getTime() - yearStart.getTime()) / 86400000 + 1) / 7
  );

  return weekNumber;
}

export function daysLeftUntilEndOfYear(date: Date) {
  const today = date;
  const endOfYear = new Date(today.getFullYear(), 11, 31);

  const diffInMilliseconds = endOfYear.getTime() - today.getTime();

  const daysLeft = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));

  return daysLeft + 1;
}

export function isDateInThePast(
  dateToCheck: Date | string,
  referenceDate: Date
) {
  const inputDate = new Date(dateToCheck);
  return inputDate < referenceDate;
}

export function isToday(date: Date | string, referenceDate = date) {
  const today = new Date(referenceDate);
  return new Date(date).toDateString() === today.toDateString();
}

export function generateCalendar(
  startDate: string | number | Date,
  numWeeks: number
) {
  const calendar: Record<string, Record<string, string>> = {};
  const daysOfWeek = ["l", "m", "mer", "j", "v", "s", "d"];

  const currentDate = new Date(startDate);
  const startDayIndex = currentDate.getDay();

  // Ajuster pour que lundi soit le premier jour
  const adjustedStartIndex = startDayIndex === 0 ? 6 : startDayIndex - 1;

  for (let week = 1; week <= numWeeks; week++) {
    const weekKey = week.toString();
    calendar[weekKey] = {};

    daysOfWeek.forEach((day, index) => {
      if (week === 1 && index < adjustedStartIndex) {
        // Ajouter des jours vides avant la première date valide
        calendar[weekKey][day] = "";
      } else {
        calendar[weekKey][day] = currentDate.toISOString();
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
  }

  return calendar;
}
