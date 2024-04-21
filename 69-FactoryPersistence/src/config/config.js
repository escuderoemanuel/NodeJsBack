const dotenv = require('dotenv');
dotenv.config();

//**COMMANDER */
const { Command } = require('commander');
const program = new Command();
program
  .option('-p,--PERSISTENCE <PERSISTENCE>', 'The selected persistence', 'MEMORY')

const options = program.opts();
program.parse(process.argv);

module.exports = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  PERSISTENCE: options.PERSISTENCE
  //PERSISTENCE: process.env.PERSISTENCE
};