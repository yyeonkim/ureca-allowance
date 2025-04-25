const getDataByKey = (key) => {
  return localStorage.getItem(key);
};

const setData = (key, value) => {
  localStorage.setItem(key, value);
};

export { getDataByKey, setData };
