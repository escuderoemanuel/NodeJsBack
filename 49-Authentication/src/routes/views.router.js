const { Router } = require('express');

const viewsRouter = Router();

//! Middleware
// Se ejecuta entre el request y el response
// Se ejecuta antes de la ruta
// Se ejecuta siempre
// Controla que no se pueda acceder a las rutas si no está autenticado
/* const publicAuthentication = (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/');
  }
  next();
}

const privateAuthentication = (req, res, next) => {
  if (!req.session.user) {
    console.log('Not logged in')
    return res.redirect('/login');
  }
  next();
}
 */
//! Views
/* viewsRouter.get('/register', publicAuthentication, (req, res) => {
  res.render('register', {});
}) */

viewsRouter.get('/login', (req, res) => {
  res.render('login', {});
})

viewsRouter.get('/home', (req, res) => {
  res.render('home', {});
})

/* viewsRouter.get('/', privateAuthentication, (req, res) => {
  res.render('profile', { user: req.session.user });
}) */
module.exports = viewsRouter;