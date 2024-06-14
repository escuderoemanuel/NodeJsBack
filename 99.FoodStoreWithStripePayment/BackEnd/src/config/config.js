const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  STRIPE: {
    PRIVATE_KEY: process.env.BACK_APP_STRIPE_KEY
  }
}