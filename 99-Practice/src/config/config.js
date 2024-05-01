const dotenv = require('dotenv');
const { Command } = require('commander');

dotenv.config();

//**COMMANDER */
const program = new Command();
program
    .option('-p,--persistence <persistence>', 'The selected persistence', 'MEMORY')

const options = program.opts();
program.parse(process.argv);

module.exports = {
    mongoConnectionLink: process.env.MONGO_URL,
    jwtSecret: process.env.JWT_PRIVATE_KEY,
    port: process.env.PORT,
    persistence: options.persistence,
    mailing: {
        service: process.env.GMAIL_SERVICE,
        port: process.env.GMAIL_PORT,
        auth: {
            user: process.env.GMAIL_AUTH_USER,
            pass: process.env.GMAIL_AUTH_KEY
        }
    }
}

