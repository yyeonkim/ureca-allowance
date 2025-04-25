import styles from "@/styles/History.module.css";
import { formatWithSign } from "@/utils/amountFomatter.js";
import { amountType } from "@/utils/enums.js";

function HistorySection({ history, onDelete }) {
  const handleDelete = (id) => {
    const confirm = window.confirm("삭제하시겠습니까?");
    if (!confirm) return;

    onDelete(id);
  };

  return (
    <section className={styles.history}>
      <h2>내역</h2>
      <ul>
        {history.map((item) => (
          <li
            key={item.id}
            className={item.type === amountType.INCOME ? styles.income : styles.expense}
          >
            <span className="truncate">{item.description}</span>
            <div>
              <span>{formatWithSign(item.type, item.amount)}</span>
              <i className="bi bi-pencil" aria-label="수정" role="button" />
              <i
                className="bi bi-trash3"
                aria-label="삭제"
                role="button"
                onClick={() => handleDelete(item.id)}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default HistorySection;
