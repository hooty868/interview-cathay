import styles from "./DateButton.module.scss";

interface DateButtonType {
  children?: React.ReactNode | string | number;
  className?: string;
  isToday?: boolean;
  onClick?: () => void;
  isSelect?: boolean;
  isDisabled?: boolean;
}

const DateButton = ({
  children,
  className = "",
  isToday = false,
  onClick = () => {},
  isSelect = false,
  isDisabled = false,
}: DateButtonType) => {
  return (
    <button
      onClick={onClick}
      className={`${className} ${styles.button} ${
        isToday ? styles.today : ""
      } ${isSelect ? styles["is-select"] : ""} ${
        isDisabled ? styles.disable : ""
      }`}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default DateButton;
