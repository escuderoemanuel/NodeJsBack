const suma = (sumando1, sumando2) => {
  return new Promise((resolve, reject) => {
    if (sumando1 === 0 || sumando2 === 0) {
      reject('Operación Innecesaria')
    }
    const resultado = sumando1 + sumando2;
    if (resultado < 0) {
      reject('La calculadora sólo debe devolver valores positivos')
    }
    resolve(resultado);
  })
}

const resta = (minuendo, sustraendo) => {
  return new Promise((resolve, reject) => {
    if (minuendo === 0 || sustraendo === 0) {
      reject('Operación Inválida')
    }
    const resultado = minuendo - sustraendo;
    if (resultado < 0) {
      reject('La calculadora sólo debe devolver valores positivos')
    }
    resolve(resultado);
  })
}
const multiplicacion = (multiplicando, multiplicador) => {
  return new Promise((resolve, reject) => {
    let producto = multiplicando * multiplicador;
    if (producto < 0) {
      reject('La calculadora sólo debe devolver valores positivos')
    }
    resolve(producto);
  })

}


async function calcular() {
  try {

    let sumaResultado = await suma(5, 11);
    console.log(`El resultado de la suma es: ${sumaResultado}`);

    let restaResultado = await resta(7, 3);
    console.log(`El resultado de la resta es: ${restaResultado}`);

    let multiplicacionResultado = await multiplicacion(2, 3);
    console.log(`El resultado de la multiplicación es: ${multiplicacionResultado}`);

    let divisionResultado = await multiplicacion(2, 0);
    console.log(`El resultado de la división es: ${divisionResultado}`);

  } catch (error) {
    console.log('Error: ' + error);
  }
}

console.log('Inicio')
calcular()
console.log('Final')