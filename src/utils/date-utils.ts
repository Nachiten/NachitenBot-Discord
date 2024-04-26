export const dateToString = (date: Date): string => {
  const year: any = date.getFullYear(); // Get the year (four digits)
  let month: any = date.getMonth() + 1; // Get the month (0-11, add 1 to get 1-12)
  let day: any = date.getDate(); // Get the day of the month (1-31)

  // Ensure month and day are formatted with leading zeros if needed
  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  // Create the formatted date string in "YYYY-MM-DD" format
  return `${year}-${month}-${day}`;
};

export const stringToUnixTimestamp = (dateString: string): string => {
  return dateToUnixTimestamp(stringToDate(dateString));
};

export const dateToUnixTimestamp = (date: Date): string => {
  // time/1000 to convert from milliseconds to seconds
  return (date.getTime() / 1000).toString();
};

export const stringToDate = (dateString: string): Date => {
  // string format is "YYYY-MM-DD"
  const dateParts = dateString.split("-");

  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1; // Subtract 1 to get 0-11
  const day = parseInt(dateParts[2]);

  return new Date(year, month, day);
};

export const userInputToString = (
  userYear?: number,
  userMonth?: number,
  userDay?: number,
): string => {
  const todayDate = new Date();

  const todayYear: any = todayDate.getFullYear();
  let todayMonth: any = todayDate.getMonth() + 1;
  let todayDay: any = todayDate.getDate();

  // Ensure month and day are formatted with leading zeros if needed
  todayMonth = todayMonth < 10 ? `0${todayMonth}` : todayMonth;
  todayDay = todayDay < 10 ? `0${todayDay}` : todayDay;

  const userMonthLeadingCeros = userMonth && userMonth < 10 ? `0${userMonth}` : userMonth;
  const userDayLeadingCeros = userDay && userDay < 10 ? `0${userDay}` : userDay;

  return `${userYear || todayYear}-${userMonthLeadingCeros || todayMonth}-${
    userDayLeadingCeros || todayDay
  }`;
};
