import styles from "@/styles/Transaction.module.css";
import { amountType } from "@/utils/enums.js";
import { generateRandomDigitID } from "@/utils/random.js";
import { useState } from "react";
import ErrorMessage from "./ErrorMessage.jsx";

const initialInput = { type: "income" };

function TransactionSection({ onSubmit }) {
  const [input, setInput] = useState(initialInput); // 새로운 거래
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setInput((prev) => {
      const { name, value, type } = e.target;
      return { ...prev, [name]: type === "number" ? Number(value) : value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 유효성 검사
    if (input.description.trim().length === 0) {
      setErrorMessage("내용을 입력해주세요.");
      return;
    }

    // 저장
    setErrorMessage(null);
    onSubmit({ ...input, id: generateRandomDigitID() });
    setInput(initialInput);
  };

  return (
    <section className={styles.transaction}>
      <h2>새로운 거래 추가</h2>
      <form onSubmit={handleSubmit}>
        {/* 내용 */}
        <div>
          <input
            className={styles.notify}
            type="text"
            name="description"
            required
            placeholder="내용 입력"
            maxLength={100}
            value={input.description ?? ""}
            onChange={handleChange}
          />
          <ErrorMessage message={errorMessage} />
        </div>
        {/* 수입/지출 */}
        <fieldset className={styles.radio}>
          <div>
            <input
              type="radio"
              id="income"
              name="type"
              value={amountType.INCOME}
              checked={input.type === amountType.INCOME}
              onChange={handleChange}
            />
            <label htmlFor="income">수입</label>
          </div>
          <div>
            <input
              type="radio"
              id="expense"
              name="type"
              value={amountType.EXPENSE}
              checked={input.type === amountType.EXPENSE}
              autoComplete="off"
              onChange={handleChange}
            />
            <label htmlFor="expense">지출</label>
          </div>
        </fieldset>
        {/* 금액 */}
        <input
          type="number"
          name="amount"
          required
          min={1}
          placeholder="금액 입력"
          value={input.amount ?? ""}
          onChange={handleChange}
        />
        <button>거래 추가</button>
      </form>
    </section>
  );
}

export default TransactionSection;
