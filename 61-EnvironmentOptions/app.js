const dotenv = require('dotenv');
const { Command } = require('commander');
const mongoose = require('mongoose')

const program = new Command();

program
  .option('--env <env>', 'the environment')

program.parse();
console.log("ENVIRONMENT", program.opts().env)

const path = `${__dirname}/.env.example.${program.opts().env}`;
dotenv.config({ path })

mongoose.connect(process.env.MONGO_CONNECTION_LINK).then(() => {
  console.log(`connected to ${process.env.MONGO_CONNECTION_LINK}`)
}).catch(() => {
  console.log('error')
})