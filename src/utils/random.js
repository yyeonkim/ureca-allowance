const generateRandomDigitID = (length = 8) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10); // Generates a random digit (0-9)
  }
  return parseInt(result, 10); // Convert the string to a number
};

export { generateRandomDigitID };
