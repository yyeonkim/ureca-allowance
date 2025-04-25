import styles from "@/styles/IncomeExpense.module.css";
import { formatToWon } from "@/utils/amountFomatter.js";
import { amountType } from "@/utils/enums.js";

function IncomeExpenseSection({ history }) {
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

  return (
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
  );
}

export default IncomeExpenseSection;
