import MouthButton from "component/Atoms/button/MouthButton/MouthButton";
import styles from "./MouthSelector.module.scss";
import { ReactElement } from "react";

interface DateButtonType {
  className?: string;
  children?: React.ReactNode;
  onPreviousClick?: () => void;
  onNextClick?: () => void;
  CustomPreviousButton?: ReactElement;
  CustomNextButton?: ReactElement;
  MouthButtonClassName?: string;
}

const MouthSelector = ({
  className = "",
  children,
  onPreviousClick = () => {},
  onNextClick = () => {},
  CustomPreviousButton,
  CustomNextButton,
  MouthButtonClassName = "",
}: DateButtonType) => {
  return (
    <div className={`${className} ${styles.container}`}>
      <MouthButton onClick={onPreviousClick} className={MouthButtonClassName}>
        {CustomPreviousButton ?? "<"}
      </MouthButton>
      {children}
      <MouthButton onClick={onNextClick} className={MouthButtonClassName}>
        {CustomNextButton ?? ">"}
      </MouthButton>
    </div>
  );
};

export default MouthSelector;
