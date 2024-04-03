function operation() {
  let result = 0;
  for (let i = 0; i < 5e9; i++) { // 5e9 = 5 * 10^9 = 5 billion
    result += i;
  }
  return result;
}

module.exports = {
  operation: operation,
};