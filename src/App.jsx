import styles from "@/styles/App.module.css";
import { useEffect } from "react";
import BalanceSection from "./components/BalanceSection.jsx";
import HistorySection from "./components/HistorySection.jsx";
import IncomeExpenseSection from "./components/IncomeExpenseSection.jsx";
import TransactionSection from "./components/TransactionSection.jsx";
import useHistoryManagement from "./hooks/useHistoryManagement.js";

function App() {
  const { history, setHistory, loadHistory } = useHistoryManagement(); // 내역

  const handleSubmit = (value) => {
    setHistory([...history, value]);
  };

  const handleDelete = (id) => {
    const data = history.filter((item) => item.id !== id);
    setHistory(data);
  };

  const handleSave = (value) => {
    const data = history.map((item) => (item.id === value.id ? value : item));
    setHistory(data);
  };

  useEffect(() => {
    const data = loadHistory();
    setHistory(data);
  }, []);

  return (
    <main className={styles.main}>
      <h1>용돈기입장</h1>

      <div className="mw">
        {/* 잔액 */}
        <BalanceSection history={history} />
        {/* 수입/지출 */}
        <IncomeExpenseSection history={history} />
        {/* 새로운 거래 추가 */}
        <TransactionSection onSubmit={handleSubmit} />
        {/* 내역 */}
        <HistorySection history={history} onDelete={handleDelete} onSave={handleSave} />
      </div>
    </main>
  );
}

export default App;
