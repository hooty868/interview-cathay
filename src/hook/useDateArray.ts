import { useMemo } from "react";
import dayjs from "dayjs";

const useDateArray = (currentYear: number, currentMonth: number) => {
  const dates = useMemo(() => {
    const firstDayOfMonth = dayjs(new Date(currentYear, currentMonth, 1));
    const lastDayOfMonth = dayjs(new Date(currentYear, currentMonth + 1, 0));

    let startDay = firstDayOfMonth.startOf("week");
    const endDay = lastDayOfMonth.endOf("week");
    const datesArray = [];

    while (startDay.isBefore(endDay) || startDay.isSame(endDay, "day")) {
      datesArray.push(startDay.format("YYYY-MM-DD"));
      startDay = startDay.add(1, "day");
    }

    return datesArray;
  }, [currentYear, currentMonth]);

  return dates;
};

export default useDateArray;
