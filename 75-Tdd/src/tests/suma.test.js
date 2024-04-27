/* 
Algunos escenarios a plantear podrían ser:
*/

const suma = require('../suma')

console.log('\nTest 1: La función debe devolver 0 si no se pasó ningún parámetro.')
const resultTest1 = suma('a', 'b')
if (resultTest1 === null) {
  console.log('✅ Test 1: SUCCESS\n')
} else {
  console.log('❌ Test 1: ERROR\n')
}

console.log('\nTest 2: La función debe devolver null si algún parámetro no es numérico.')
const resultTest2 = suma()
if (resultTest2 === 0) {
  console.log('✅ Test 2: SUCCESS\n')
} else {
  console.log('❌ Test 2: ERROR\n')
}

console.log('\nTest 3: La función debe poder realizar la suma correctamente.')
const resultTest3 = suma(2 + 9)
if (resultTest3 === 11) {
  console.log('✅ Test 3: SUCCESS\n')
} else {
  console.log('❌ Test 3: ERROR\n')
}

console.log('\nTest 4: La función debe poder hacer la suma con cualquier cantidad de números.')
const resultTest4 = suma(2 + 9 + 7)
if (resultTest4 === 18) {
  console.log('✅ Test 4: SUCCESS\n')
} else {
  console.log('❌ Test 4: ERROR\n')
}