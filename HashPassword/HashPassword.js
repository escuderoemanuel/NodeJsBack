const crypto = require('crypto');

const secret = 'abcdefg';
const password = '123456';

const hashedPassword = crypto.createHmac('sha256', secret).update(password).digest('hex');

console.log(password, hashedPassword)