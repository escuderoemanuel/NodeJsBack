//! NPM
//? Una vez generado nuestro package.json, con el comando npm install nombre_del_modulo podremos hacer la instalación del módulo que necesitemos. En este ejemplo instalamos moment el cual sirve para manejar fechas y horas de manera eficiente.
//? Una vez instalado, se generará una carpeta node_modules (donde vivirá moment), y se agregará la dependencia de moment a mi package.json

const moment = require('moment');

const today = moment()
const birthday = moment('2024-06-20')

const daysToMyBirthday = birthday.diff(today, 'days')
const message = `My birthday is ${daysToMyBirthday} days away...!`

console.log(message);
//console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));