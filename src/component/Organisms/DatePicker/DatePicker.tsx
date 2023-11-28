"use client";

import DateButton from "component/Atoms/button/DateButton/DateButton";
import MouthSelector from "component/Molecules/selector/MouthSelector/MouthSelector";
import dayjs from "dayjs";
import useDateArray from "hook/useDateArray";
import useOutsideClick from "hook/useOutsideClick";
import {
  ReactElement,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  initializeDate,
  isDisabled,
  isSelected,
  isToday,
} from "utils/dateUtils";

import styles from "./DatePicker.module.scss";

interface DatePickerProps {
  bodyClassName?: string;
  selectorClassName?: string;
  MouthButtonClassName?: string;
  CustomTopDisplayTime?: (year: number, month: number) => ReactElement;
  CustomDateButton?: (date: string) => ReactElement;
  CustomPreviousButton?: ReactElement;
  CustomNextButton?: ReactElement;
  onDateChange?: (startDate: string | null, endDate: string | null) => void;
  initialStartDate?: string;
  initialEndDate?: string;
}

const DatePicker = ({
  onDateChange,
  initialStartDate,
  initialEndDate,
  bodyClassName = "",
  selectorClassName = "",
  MouthButtonClassName = "",
  CustomTopDisplayTime,
  CustomDateButton,
  CustomPreviousButton,
  CustomNextButton,
}: DatePickerProps) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs().month());
  const [currentYear, setCurrentYear] = useState(dayjs().year());
  const [startDate, setStartDate] = useState<string | null>(
    initializeDate(initialStartDate)
  );
  const [endDate, setEndDate] = useState<string | null>(
    initializeDate(initialEndDate)
  );
  const pickerReference = useRef<HTMLDivElement>(null);

  const dates = useDateArray(currentYear, currentMonth);

  const handleOutsideClick = () => {
    setStartDate(null);
    setEndDate(null);
  };

  useOutsideClick(pickerReference, handleOutsideClick);

  const incrementMonth = useCallback(() => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 11) {
        setCurrentYear((prevYear) => prevYear + 1);
        return 0;
      }
      return prevMonth + 1;
    });
  }, []);

  const decrementMonth = useCallback(() => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 0) {
        setCurrentYear((prevYear) => prevYear - 1);
        return 11;
      }
      return prevMonth - 1;
    });
  }, []);

  const handleDateClick = useCallback(
    (clickedDate: string) => {
      if (!startDate || dayjs(clickedDate).isBefore(dayjs(startDate), "day")) {
        setStartDate(clickedDate);
        setEndDate(null);
        return;
      }

      if (!endDate || dayjs(clickedDate).isAfter(dayjs(startDate), "day")) {
        setEndDate(clickedDate);
      }
    },
    [startDate, endDate]
  );

  useEffect(() => {
    onDateChange?.(startDate, endDate);
  }, [startDate, endDate, onDateChange]);

  return (
    <div
      className={`${bodyClassName} ${styles.Container}`}
      ref={pickerReference}
    >
      <MouthSelector
        className={selectorClassName}
        onPreviousClick={decrementMonth}
        onNextClick={incrementMonth}
        MouthButtonClassName={MouthButtonClassName}
        CustomPreviousButton={CustomPreviousButton}
        CustomNextButton={CustomNextButton}
      >
        {CustomTopDisplayTime ? (
          CustomTopDisplayTime(currentYear, currentMonth)
        ) : (
          <p>{`${currentYear}年${currentMonth + 1}月`}</p>
        )}
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
            {CustomDateButton
              ? CustomDateButton(dayjs(date).format("D"))
              : `${dayjs(date).format("D")}日`}
          </DateButton>
        ))}
      </div>
    </div>
  );
};

export default memo(DatePicker);
