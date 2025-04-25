import styles from "@/styles/HistoryListItem.module.css";
import { formatWithSign } from "@/utils/amountFomatter.js";
import { amountType } from "@/utils/enums.js";
import { useState } from "react";
import ErrorMessage from "./ErrorMessage.jsx";

function HistoryListItem({ item, onDelete, onSave }) {
  const [isEdit, setIsEdit] = useState(false);
  const [input, setInput] = useState(item);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setInput((prev) => {
      const { name, value, type } = e.target;
      return { ...prev, [name]: type === "number" ? Number(value) : value };
    });
  };

  const handleDelete = (id) => {
    const confirm = window.confirm("삭제하시겠습니까?");
    if (!confirm) return;
    onDelete(id);
  };

  const handleSave = () => {
    if (!isValid()) return;
    onSave(input);
    setIsEdit(false);
    setErrorMessage(null);
  };

  const isValid = () => {
    if (input.description.trim().length === 0) {
      setErrorMessage("내용을 입력해주세요.");
      return false;
    }

    if (input.amount < 1) {
      setErrorMessage("금액은 1 이상이어야 합니다.");
      return false;
    }

    return true;
  };

  return (
    <>
      <li
        key={item.id}
        className={`${item.type === amountType.INCOME ? styles.income : styles.expense} ${
          styles.list
        }`}
      >
        {/* 내용 */}
        {isEdit ? (
          <input
            type="text"
            name="description"
            placeholder="내용 입력"
            maxLength={100}
            value={input.description}
            onChange={handleChange}
          />
        ) : (
          <span className="truncate">{item.description}</span>
        )}
        <div>
          {/* 금액 */}
          {isEdit ? (
            <input
              className={styles.amount}
              type="number"
              name="amount"
              min={1}
              placeholder="금액 입력"
              value={input.amount}
              onChange={handleChange}
            />
          ) : (
            <span>{formatWithSign(item.type, item.amount)}</span>
          )}

          {isEdit ? (
            <i
              className={`bi bi-check-lg ${styles.check}`}
              aria-label="저장"
              role="button"
              onClick={handleSave}
            />
          ) : (
            <>
              <i
                className="bi bi-pencil"
                aria-label="수정"
                role="button"
                onClick={() => setIsEdit(true)}
              />
              <i
                className={`bi bi-trash3 ${styles.trash}`}
                aria-label="삭제"
                role="button"
                onClick={() => handleDelete(item.id)}
              />
            </>
          )}
        </div>
      </li>
      <ErrorMessage message={errorMessage} />
    </>
  );
}

export default HistoryListItem;
