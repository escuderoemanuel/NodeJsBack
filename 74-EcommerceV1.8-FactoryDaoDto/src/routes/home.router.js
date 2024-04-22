const { Router } = require('express');

const ProductsDbManager = require('../dao/dbManager/ProductsDbManager');
const { privateAccess } = require('../middlewares/middlewares');
const HomeViewController = require('../controllers/home.controller');


// Manager
const manager = new ProductsDbManager();
const router = Router();

// Ruta para la página de inicio
router.get('/', privateAccess, HomeViewController.getHome);

// Ruta para el chat
router.get('/chat', privateAccess, HomeViewController.getChat)

module.exports = router;
