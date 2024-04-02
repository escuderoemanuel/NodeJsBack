/* 
Algunos de los códigos importantes son:
0 : proceso finalizado normalmente.
1 : proceso finalizado por excepción fatal
5 : Error fatal del motor V8. 
9 : Para argumentos inválidos al momento de la ejecución.
*/

process.on('exit', (code) => {
  console.log(`Process ended wih code ${code}`)
  if (code === -4) {
    console.log('Proceso finalizado por argumentación inválida en una función')
  }
})

const listNumbers = (...numbers) => {

  console.log('numbers: ', numbers)
  const types = numbers.map(n => typeof n)
  const isValid = types.every(t => t !== 'number')

  if (!isValid) {
    process.exit(-4)
  }
  //console.log('types: ', types)
  //console.log('isValid: ', isValid)
}

listNumbers(1, 2, 3, '0')