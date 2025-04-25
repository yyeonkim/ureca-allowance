import styles from "@/styles/History.module.css";
import HistoryListItem from "./HistoryListItem.jsx";

function HistorySection({ history, onDelete, onSave }) {
  return (
    <section className={styles.history}>
      <h2>내역</h2>
      <ul>
        {history.map((item) => (
          <HistoryListItem key={item.id} item={item} onDelete={onDelete} onSave={onSave} />
        ))}
      </ul>
    </section>
  );
}

export default HistorySection;
