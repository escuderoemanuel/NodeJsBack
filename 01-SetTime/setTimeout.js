const temporizador = (callback) => {
  setTimeout(() => {
    callback()
  }, 5000)
}

// Podría ir sin llaves si solo tiene un parámetro
let operacion = () => { console.log('Realizando Operación') }

console.log('Iniciando tarea...')
temporizador(operacion);
console.log('... tarea finalizada')