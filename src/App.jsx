import styles from "@/styles/App.module.css";
import { formatToWon } from "./utils/amountFomatter.js";

function App() {
  return (
    <main className={styles.main}>
      <h1>용돈기입장</h1>

      <div className="mw">
        {/* 잔액 */}
        <section className={styles.balance}>
          <h2>잔액</h2>
          <span>{formatToWon(20000)}</span>
        </section>

        {/* 수입/지출 */}
        <section className={styles.incomeExpense}>
          <div>
            <h2>수입</h2>
            <span className={styles.income}>{formatToWon(20000)}</span>
          </div>
          <div>
            <h2>지출</h2>
            <span className={styles.expense}>{formatToWon(20000)}</span>
          </div>
        </section>

        {/* 새로운 거래 추가 */}
        <section className={styles.newTransaction}>
          <h2>새로운 거래 추가</h2>
          <form>
            <input type="text" name="description" required placeholder="내용 입력" />
            <div className={styles.radio}>
              <div>
                <input type="radio" id="income" name="type" value="income" defaultChecked />
                <label for="income">수입</label>
              </div>
              <div>
                <input type="radio" id="expense" name="type" value="expense" />
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
            <li className={styles.income}>
              <span>4월 용돈</span>
              <span>{formatToWon(20000)}</span>
            </li>
            <li className={styles.income}>
              <span>4월 용돈</span>
              <span>{formatToWon(20000)}</span>
            </li>
            <li className={styles.expense}>
              <span>4월 용돈</span>
              <span>{formatToWon(20000)}</span>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}

export default App;
