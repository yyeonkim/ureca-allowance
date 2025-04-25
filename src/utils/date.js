export const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  // getMonth()는 0부터 시작하므로 1을 더하고, 10보다 작으면 앞에 0 추가
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
