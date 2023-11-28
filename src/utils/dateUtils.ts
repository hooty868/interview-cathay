import dayjs from "dayjs";

export const initializeDate = (date: string | undefined) => {
  if (date && dayjs(date).isValid()) {
    return dayjs(date).format("YYYY-MM-DD");
  }
  return null;
};

export const isToday = (date: string): boolean =>
  dayjs(date).format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD");

export const isSelected = (
  date: string,
  startDate?: string | null,
  endDate?: string | null
): boolean => {
  const day = dayjs(date);
  const start = dayjs(startDate);
  const end = endDate ? dayjs(endDate) : null;

  if (startDate && !endDate) {
    return day.isSame(start, "day");
  }

  const isAfterStart = startDate
    ? day.isSame(start, "day") || day.isAfter(start, "day")
    : false;
  const isBeforeEnd = end
    ? day.isSame(end, "day") || day.isBefore(end, "day")
    : true;

  return isAfterStart && isBeforeEnd;
};

export const isDisabled = (date: string): boolean =>
  dayjs(date).isBefore(dayjs().subtract(1, "day"));
