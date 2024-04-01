const dotenv = require('dotenv');

dotenv.config();

// console.log('port:', process.env.PORT);
const { PORT, ENVIRONMENT, MONGO_URL } = process.env;

module.exports = {
  PORT,
  ENVIRONMENT,
  MONGO_URL
};