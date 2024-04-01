const dotenv = require('dotenv');


const environment = 'DEVELOPMENT'

// dotenv.config(); // Busca por default el .env

dotenv.config({
  path: environment === 'PRODUCTION' ? `${__dirname}/.env.production` : `${__dirname}/.env.development`
});

// console.log('port:', process.env.PORT);
const { PORT, ENVIRONMENT, MONGO_URL } = process.env;

module.exports = {
  PORT,
  ENVIRONMENT,
  MONGO_URL
};