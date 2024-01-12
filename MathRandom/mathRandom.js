
//! ========Consigna========
//? Crear un proyecto de node que genere 10000 números aleatorios en un rango de 1 a 20.
//? Crear un objeto cuyas claves sean los números salidos y el valor asociado a cada clave será la cantidad de veces que salió dicho número. Representar por consola los resultados.
//! =========================


let object = {}

for (let i = 0; i < 10000; i++) {
  let aleatoryNumber = Math.floor(Math.random() * 20 + 1)
  if (!object[aleatoryNumber]) {
    object[aleatoryNumber] = 1
  } else {
    object[aleatoryNumber]++
  }
}

console.log(object)



/* 
let numero = [];
for(let i = 0; i < 10000; i++){
numero[i] = Math.floor(Math.random()*20)+1);
} */


/* 
const n = []
const obj = {}

for( let i = 0 ; i < 1000 ; i ++ ) {
    n.push(Math.floor(Math.random() * 20 + 1))
}
n.forEach(number => {
    if ( !obj.hasOwnProperty(number) ) {
        obj[number] = 1
    } else {
        obj[number] += 1
    }
});
*/