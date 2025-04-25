import { getLocalData, setLocalData } from "@/utils/localStorage.js";
import { generateRandomDigitID } from "@/utils/random.js";
import { useState } from "react";

const DEFAULT_DATA = [
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

function useHistoryManagement() {
  const [history, setHistory] = useState([]);

  const loadHistory = () => {
    const data = getLocalData("history");
    return data ?? DEFAULT_DATA;
  };

  const saveHistoryToLocal = (data) => {
    setHistory(data);
    setLocalData("history", data);
  };

  return { history, setHistory: saveHistoryToLocal, loadHistory };
}

export default useHistoryManagement;
