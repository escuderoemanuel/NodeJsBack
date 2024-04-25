const { Router } = require('express');

const ProductsDbManager = require('../dao/dbManager/ProductsDbManager');
const HomeViewController = require('../controllers/home.controller');
const { verifyToken } = require('../middlewares/verifyToken.middleware');


// Manager
const manager = new ProductsDbManager();
const router = Router();

// Ruta para la página de inicio
router.get('/', HomeViewController.getHome);

// Ruta para el chat
router.get('/chat', verifyToken, HomeViewController.getChat)

module.exports = router;
