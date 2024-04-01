const { Command } = require('commander')
const program = new Command()

/* program
  .argument('<port>', 'port to listen on')

program.parse()
console.log('programs args:', program.args) */

program
  // Este sería para pedir un argumento obligatorio
  .argument('<argument1>', 'Necessary argument')
  // Toma por defecto el 8080, pero podemos cambiarlo pasando el que quisiéramos --> 'node app.js -p 3000'
  .option('-p, --port <port>', 'port to listen on', 8080) // -p --port son alias para <port>
  .requiredOption('-db, --dbLink', 'Mongo Data Base Connection Link', 'https://mongodbconnectionlink.com') // Tira error si no pasamos el -db
  .option('-r, --role <role>', `The user's role`, 'USER')

program.parse()
console.log('programs options:', program.opts())