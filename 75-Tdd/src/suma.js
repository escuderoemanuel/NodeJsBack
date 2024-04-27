/* const suma = (...nums) => {
  if (nums.length === 0) {
    return 0
  }
  let isValid = true;
  for (let i = 0; i < nums.length; i++) {
    if (typeof nums[i] !== 'number') {
      isValid = false;
    }
  }
  if (!isValid) {
    return null
  }
  let restuls = 0;
  for (let i = 0; i < nums.length; i++) {
    restuls += nums[i]
  }
  return restuls;
}
 */


const suma = (...nums) => {
  if (nums.length === 0) return 0;
  if (!nums.every(n => typeof n === 'number')) return null;
  return nums.reduce((acc, num) => acc + num, 0);
}

module.exports = suma
