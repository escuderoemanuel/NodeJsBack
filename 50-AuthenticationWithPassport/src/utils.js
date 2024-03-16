const bcrypt = require('bcrypt');

const createHash = (password) => {
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  return hashedPassword;
}

const isValidPassword = (password, user) => {
  const isValid = bcrypt.compareSync(password, user.password);
  return isValid;
}

module.exports = {
  createHash,
  isValidPassword
}