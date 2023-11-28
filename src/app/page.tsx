import DatePicker from "component/Organisms/DatePicker/DatePicker";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <DatePicker />
    </main>
  );
}
