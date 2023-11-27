"use client";

import { memo, useCallback, useMemo, useRef, useState } from "react";
import dayjs from "dayjs";

import DateButton from "component/atoms/button/DateButton/DateButton";
import MouthSelector from "component/Molecules/selector/MouthSelector/MouthSelector";
import useOutsideClick from "hook/useOutsideClick";
import useDateArray from "hook/useDateArray";
import { isToday, isSelected, isDisabled } from "utils/dateUtils";

import styles from "./DatePicker.module.scss";

const DatePicker = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs().month());
  const [currentYear, setCurrentYear] = useState(dayjs().year());
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const pickerReference = useRef<HTMLDivElement>(null);

  const handleOutsideClick = () => {
    setStartDate(null);
    setEndDate(null);
  };

  useOutsideClick(pickerReference, handleOutsideClick);

  const incrementMonth = useCallback(() => {
    setCurrentMonth((prevMonth) => (prevMonth + 1) % 12);
    if (currentMonth === 11) {
      setCurrentYear((prevYear) => prevYear + 1);
    }
  }, [currentMonth]);

  const decrementMonth = useCallback(() => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prevYear) => prevYear - 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth - 1);
    }
  }, [currentMonth]);

  const dates = useDateArray(currentYear, currentMonth);

  const handleDateClick = useCallback(
    (clickedDate: string) => {
      if (
        !startDate ||
        (startDate && dayjs(clickedDate).isBefore(dayjs(startDate), "day"))
      ) {
        setStartDate(clickedDate);
        setEndDate(null);
      } else if (
        !endDate ||
        (endDate && dayjs(clickedDate).isAfter(dayjs(startDate), "day"))
      ) {
        setEndDate(clickedDate);
      }
    },
    [startDate, endDate]
  );

  return (
    <div className={styles.Container} ref={pickerReference}>
      <MouthSelector
        onPreviousClick={decrementMonth}
        onNextClick={incrementMonth}
      >
        <p>{`${currentYear}年${currentMonth + 1}月`}</p>
      </MouthSelector>
      <div className={styles["date-range"]}>
        {dates.map((date, index) => (
          <DateButton
            key={`${date}-${index}`}
            isToday={isToday(date)}
            isSelect={isSelected(date, startDate, endDate)}
            onClick={() => handleDateClick(date)}
            isDisabled={isDisabled(date)}
          >
            {`${dayjs(date).format("D")}日`}
          </DateButton>
        ))}
      </div>
    </div>
  );
};

export default memo(DatePicker);
