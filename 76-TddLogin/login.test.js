/*
Aplicar bajo el modelo de trabajo de TDD:
Una función de login (con usuarios hardcodeados user = jane@gmail.com , password = 1234)
 */

const login = require('./login')

console.log('\nTest 1: Si se pasa un password vacío, la función debe consologuear (“No se ha proporcionado un password”).')
const resultTest1 = login('jane@gmail.com')
if (resultTest1 === 'No se ha proporcionado un password') {
  console.log('✅ Test 1: SUCCESS\n')
} else {
  console.log('❌ Test 1: ERROR\n')
}
console.log('\nTest 2: Si se pasa un usuario vacío, la función debe consologuear (“No se ha proporcionado un usuario”).')
const resultTest2 = login()
if (resultTest2 === 'No se ha proporcionado un usuario') {
  console.log('✅ Test 2: SUCCESS\n')
} else {
  console.log('❌ Test 2: ERROR\n')
}
console.log('\nTest 3: Si se pasa un password incorrecto, consologuear (“Contraseña incorrecta”).')
const resultTest3 = login('jane@gmail.com', 1111)
if (resultTest3 === 'Contraseña incorrecta') {
  console.log('✅ Test 3: SUCCESS\n')
} else {
  console.log('❌ Test 3: ERROR\n')
}
console.log('\nTest 4:Si se pasa un usuario incorrecto, consologuear (“Credenciales incorrectas”).')
const resultTest4 = login('john@gmail.com', 1234)
if (resultTest4 === 'Credenciales incorrectas') {
  console.log('✅ Test 4: SUCCESS\n')
} else {
  console.log('❌ Test 4: ERROR\n')
}
console.log('\nTest 5: Si  el usuario y contraseña coinciden, consologuear (“logueado”) .')
const resultTest5 = login('jane@gmail.com', 1234)
if (resultTest5 === 'logueado') {
  console.log('✅ Test 5: SUCCESS\n')
} else {
  console.log('❌ Test 5: ERROR\n')
}