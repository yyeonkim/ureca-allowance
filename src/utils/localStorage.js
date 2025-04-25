const getDataByKey = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

const setData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export { getDataByKey, setData };
