const express = require('express');
const PORT = 8080;
const serverMessage = `Server running on port ${PORT}`
const cookieParser = require('cookie-parser');

const app = express();

// Seteo como middleware
app.use(cookieParser('topSecret'));


//! Cookies
// Crear una cookie
app.get('/setCookie', (req, res) => {
  // Nombre de la cookie, valor en string , opciones (Tiempo de vida de la cookie)
  res.cookie('myCookie', 'myCookieValue', { maxAge: 120 * 1000, signed: true });
  res.send('Cookie has been set');
})

// Leer una cookie
app.get('/getCookie', (req, res) => {
  const cookie = req.signedCookies;
  res.send(cookie);
})

// Eliminar una cookie
app.get('/deleteCookie', (req, res) => {
  res.clearCookie('myCookie');
  res.send('Cookie has been deleted');
})

// Para verificar que la cookie desaparece luego del tiempo de vida establecido
app.get('/*', (req, res) => {
  res.send('Other Content')
})



const server = app.listen(PORT, () => {
  console.log(serverMessage)
})