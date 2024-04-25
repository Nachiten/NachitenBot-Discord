export const dateToString = (date: Date): string => {
  // Extract year, month, and day from the Date object
  const year: any = date.getFullYear(); // Get the year (four digits)
  let month: any = date.getMonth() + 1; // Get the month (0-11, add 1 to get 1-12)
  let day: any = date.getDate(); // Get the day of the month (1-31)

  // Ensure month and day are formatted with leading zeros if needed
  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  // Create the formatted date string in "YYYY-MM-DD" format
  return `${year}-${month}-${day}`;
};

export const stringToDate = (dateString: string): Date => {
  return new Date(dateString);
};

export const fromUserInputToString = (year?: number, month?: number, day?: number): string => {
  const todayDate = new Date();

  const todayYear: any = todayDate.getFullYear();
  let todayMonth: any = todayDate.getMonth() + 1;
  let todayDay: any = todayDate.getDate();

  // Ensure month and day are formatted with leading zeros if needed
  todayMonth = todayMonth < 10 ? `0${todayMonth}` : todayMonth;
  todayDay = todayDay < 10 ? `0${todayDay}` : todayDay;

  return `${year || todayYear}-${month || todayMonth}-${day || todayDay}`;
};
