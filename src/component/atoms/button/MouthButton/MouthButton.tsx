import styles from "./MouthButton.module.scss";

interface DateButtonType {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const MouthButton = ({
  children,
  className = "",
  onClick = () => {},
}: DateButtonType) => {
  return (
    <button onClick={onClick} className={`${className} ${styles.button}`}>
      {children}
    </button>
  );
};

export default MouthButton;
