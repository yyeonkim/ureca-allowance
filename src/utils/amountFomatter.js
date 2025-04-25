import { amountType } from "./enums.js";

const formatToWon = (amount) => {
  return `₩ ${amount.toLocaleString()}`;
};

const formatWithSign = (type, amount) => {
  const sign = type === amountType.INCOME ? "+" : "-";
  return `${sign} ${formatToWon(amount)}`;
};

export { formatToWon, formatWithSign };
