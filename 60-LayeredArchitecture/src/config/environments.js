const dotenv = require('dotenv');

dotenv.config()

// console.log('port:', process.env.PORT);
const { PORT } = process.env;

module.exports = {
  PORT
};