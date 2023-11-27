import MouthButton from "component/atoms/button/MouthButton/MouthButton";
import styles from "./MouthSelector.module.scss";

interface DateButtonType {
  className?: string;
  children?: React.ReactNode;
  onPreviousClick?: () => void;
  onNextClick?: () => void;
}

const MouthSelector = ({
  className = "",
  children,
  onPreviousClick = () => {},
  onNextClick = () => {},
}: DateButtonType) => {
  return (
    <div className={`${className} ${styles.container}`}>
      <MouthButton onClick={onPreviousClick}>{"<"}</MouthButton>
      {children}
      <MouthButton onClick={onNextClick}>{">"}</MouthButton>
    </div>
  );
};

export default MouthSelector;
