

// Commander
const { Command } = require('commander');
const program = new Command();

// DotEnv
const dotenv = require('dotenv');

// Express
const express = require('express');

const app = express();

// Options Commander Program
program.option('--mode <mode>')
program.parse();
const options = program.opts();
console.log(options)

// DotEnv
dotenv.config({
  path: `.env.example.${options.mode}`
});

// VARIABLES QUE DEPENDEN DEL CONFIG DEBEN IR DESPUES DEL MISMO
const PORT = process.env.PORT;
const ENVIRONMENT = process.env.ENVIRONMENT;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}, ENVIRONMENT: ${ENVIRONMENT}`);
});

// Esto se puede probar corriendo los siguientes comandos en consola
// node app.js --mode development
// node app.js --mode production

//! A los .env le agrego el .example para que se suban al repo, pero en realidad van sin el .example
