import styles from "@/styles/App.module.css";
import { useEffect, useState } from "react";
import { formatToWon, formatWithSign } from "./utils/amountFomatter.js";
import { amountType } from "./utils/enums.js";
import { getDataByKey } from "./utils/localStorage.js";

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

function App() {
  const [history, setHistory] = useState([]); // 내역

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

  useEffect(() => {
    const data = getDataByKey("history");
    if (data) setHistory(data);
    else setHistory(defaultData);
  }, []);

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
          <form>
            <input type="text" name="description" required placeholder="내용 입력" />
            <div className={styles.radio}>
              <div>
                <input
                  type="radio"
                  id="income"
                  name="type"
                  value={amountType.INCOME}
                  defaultChecked
                />
                <label for="income">수입</label>
              </div>
              <div>
                <input type="radio" id="expense" name="type" value={amountType.EXPENSE} />
                <label for="expense">지출</label>
              </div>
            </div>
            <input type="number" name="amount" required min={1} placeholder="금액 입력" />
            <button>거래 추가</button>
          </form>
        </section>

        {/* 내역 */}
        <section className={styles.history}>
          <h2>내역</h2>
          <ul>
            {history.map((item) => (
              <li className={item.type === amountType.INCOME ? styles.income : styles.expense}>
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
