const dotenv = require('dotenv')
dotenv.config()

//**COMMANDER */
const { Command } = require('commander');
const program = new Command();
program
  .option('-p,--PERSISTENCE <PERSISTENCE>', 'The selected persistence', 'MEMORY')

const options = program.opts();
program.parse(process.argv);

module.exports = options.PERSISTENCE; // Solo exporta la opción de persistencia
