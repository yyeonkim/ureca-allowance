import styles from "@/styles/App.module.css";
import { useEffect, useState } from "react";
import { formatToWon, formatWithSign } from "./utils/amountFomatter.js";
import { amountType } from "./utils/enums.js";
import { getDataByKey, setData } from "./utils/localStorage.js";

const defaultData = [
  {
    id: 1,
    description: "용돈",
    amount: 300000,
    type: "income",
    date: "2025-04-25",
  },
  {
    id: 2,
    description: "영화 관람",
    amount: 11000,
    type: "expense",
    date: "2025-04-25",
  },
  {
    id: 3,
    description: "식비",
    amount: 25000,
    type: "expense",
    date: "2025-04-26",
  },
];

const defaultInput = { type: "income" };

function App() {
  const [history, setHistory] = useState([]); // 내역
  const [input, setInput] = useState(defaultInput); // 새로운 거래

  const calculateBalance = () => {
    const balance = history.reduce((acc, curr) => {
      if (curr.type === amountType.INCOME) {
        return acc + curr.amount;
      }
      return acc - curr.amount;
    }, 0);
    return balance;
  };

  const calculateIncome = () => {
    const income = history.reduce((acc, curr) => {
      if (curr.type === amountType.INCOME) {
        return acc + curr.amount;
      }
      return acc;
    }, 0);
    return income;
  };

  const calculateExpense = () => {
    const expense = history.reduce((acc, curr) => {
      if (curr.type === amountType.EXPENSE) {
        return acc + curr.amount;
      }
      return acc;
    }, 0);
    return expense;
  };

  const handleChange = (e) => {
    setInput((prev) => {
      const { name, value, type } = e.target;
      return { ...prev, [name]: type === "number" ? Number(value) : value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 유효성 검사
    if (input.description.trim().length === 0) return;

    // 저장
    const newData = [...history, input];
    setHistory(newData);
    setData("history", newData);
    setInput(defaultInput);
  };

  useEffect(() => {
    const data = getDataByKey("history");
    if (data) {
      setHistory(data);
    } else {
      setHistory(defaultData);
      setData("history", defaultData);
    }
  }, []);

  console.log(input);

  return (
    <main className={styles.main}>
      <h1>용돈기입장</h1>

      <div className="mw">
        {/* 잔액 */}
        <section className={styles.balance}>
          <h2>잔액</h2>
          <span>{formatToWon(calculateBalance())}</span>
        </section>

        {/* 수입/지출 */}
        <section className={styles.incomeExpense}>
          <div>
            <h2>수입</h2>
            <span className={styles.income}>{formatToWon(calculateIncome())}</span>
          </div>
          <div>
            <h2>지출</h2>
            <span className={styles.expense}>{formatToWon(calculateExpense())}</span>
          </div>
        </section>

        {/* 새로운 거래 추가 */}
        <section className={styles.newTransaction}>
          <h2>새로운 거래 추가</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="description"
              required
              placeholder="내용 입력"
              value={input.description ?? ""}
              onChange={handleChange}
            />
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
                  autocomplete="off"
                  onChange={handleChange}
                />
                <label htmlFor="expense">지출</label>
              </div>
            </fieldset>
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

        {/* 내역 */}
        <section className={styles.history}>
          <h2>내역</h2>
          <ul>
            {history.map((item) => (
              <li
                key={item.id}
                className={item.type === amountType.INCOME ? styles.income : styles.expense}
              >
                <span>{item.description}</span>
                <span>{formatWithSign(item.type, item.amount)}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

export default App;
