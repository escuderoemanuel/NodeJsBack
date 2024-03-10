const { Router } = require('express');

const viewsRouter = Router();

viewsRouter.get('/register', (req, res) => {
  res.render('register', {});
})

module.exports = viewsRouter;