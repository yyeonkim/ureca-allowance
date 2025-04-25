import styles from "@/styles/App.module.css";
import { useEffect, useState } from "react";
import BalanceSection from "./components/BalanceSection.jsx";
import HistorySection from "./components/HistorySection.jsx";
import IncomeExpenseSection from "./components/IncomeExpenseSection.jsx";
import TransactionSection from "./components/TransactionSection.jsx";
import { getLocalData, setLocalData } from "./utils/localStorage.js";
import { generateRandomDigitID } from "./utils/random.js";

const defaultData = [
  {
    id: generateRandomDigitID(),
    description: "용돈",
    amount: 300000,
    type: "income",
    date: "2025-04-25",
  },
  {
    id: generateRandomDigitID(),
    description: "영화 관람",
    amount: 11000,
    type: "expense",
    date: "2025-04-25",
  },
  {
    id: generateRandomDigitID(),
    description: "식비",
    amount: 25000,
    type: "expense",
    date: "2025-04-26",
  },
];

function App() {
  const [history, setHistory] = useState([]); // 내역

  const handleSubmit = (value) => {
    const newData = [...history, value];
    saveHistoryToLocal(newData);
  };

  const handleDelete = (id) => {
    const newData = history.filter((item) => item.id !== id);
    saveHistoryToLocal(newData);
  };

  const handleSave = (value) => {
    const newData = history.map((item) => (item.id === value.id ? value : item));
    saveHistoryToLocal(newData);
  };

  const saveHistoryToLocal = (data) => {
    setHistory(data);
    setLocalData("history", data);
  };

  useEffect(() => {
    const data = getLocalData("history");
    if (data) {
      setHistory(data);
    } else {
      setHistory(defaultData);
      setLocalData("history", defaultData);
    }
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
