import styles from "@/styles/Balance.module.css";
import { formatToWon } from "@/utils/amountFomatter.js";
import { amountType } from "@/utils/enums.js";

function BalanceSection({ history }) {
  const calculateBalance = () => {
    const balance = history.reduce((acc, curr) => {
      if (curr.type === amountType.INCOME) {
        return acc + curr.amount;
      }
      return acc - curr.amount;
    }, 0);
    return balance;
  };

  return (
    <section className={styles.balance}>
      <h2>잔액</h2>
      <span>{formatToWon(calculateBalance())}</span>
    </section>
  );
}

export default BalanceSection;
