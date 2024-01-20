//! Age Calculator

//? Debe contar con una variable que almacene la fecha actual (utilizar moment())
//? Debe contar con una variable que almacene sólo la fecha de tu nacimiento (utilizar moment).
//? Validar con un if que la variable contenga una fecha válida (utilizar el método isValid());
//? Finalmente, mostrar por consola cuántos días han pasado desde que naciste hasta el día de hoy. (utilizar el método diff()
//? Extra: Cambia tu moment a la versión 1.6.0, al no ser la misma versión mayor, nota el cambio al correr el programa.

const moment = require('moment');

const today = moment();
const birth = moment('1986-06-20');
if (birth.isValid()) {
  const daysLived = today.diff(born, 'days');
  console.log(`It's been '${daysLived}' since you were born!`);
} else {
  console.log(`Invalid date`)
};