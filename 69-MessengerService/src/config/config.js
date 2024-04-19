const dotenv = require('dotenv')

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  GMAIL_SERVICE: process.env.GMAIL_SERVICE,
  GMAIL_PORT: process.env.GMAIL_PORT,
  GMAIL_AUTH_USER: process.env.GMAIL_AUTH_USER,
  GMAIL_AUTH_KEY: process.env.GMAIL_AUTH_KEY,

  TWILIO_KEY: process.env.TWILIO_KEY,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,

}