/* let contador = () => {
  let counter = 1;
  console.log('Realizando operación')
  let timer = setInterval(() => {
    console.log(counter++);
    if (counter === 4) {
      clearInterval(timer);
    }
  }, 3000)
} */
let contador = () => {
  let counter = 1;
  console.log('Realizando operación')
  let timer = setInterval(() => {
    counter++
    console.log('Mensaje escrito luego de 3000 milisegundos');
    if (counter === 4) {
      clearInterval(timer);
    }
  }, 3000)
}

console.log('Iniciando tarea...')
contador();
console.log('...tarea finalizada')