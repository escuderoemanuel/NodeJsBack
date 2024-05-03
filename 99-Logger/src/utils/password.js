const bcrypt = require('bcrypt')

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
const isValidPassword = (user, password) => {
    console.log(`Datos a validar: user-password: ${user.password}, password: ${password}`);
    return bcrypt.compareSync(password, user.password);
}

module.exports = {
    createHash,
    isValidPassword
}