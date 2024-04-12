const { Router } = require('express');
const { publicAuthentication, privateAuthentication } = require('../middlewares/middlewares');
const { verifyToken } = require('../utils');
const ProductsController = require('../controllers/products.controller');

// Manager
const router = Router();

// Deberá traer todos los productos de la base de datos, incluyendo opcionalmente limit, page, sort, filter (Example: http://localhost:8080/api/products?limit=2&page=1&sort=desc&filter=iphone)
router.get('/', verifyToken, ProductsController.getAll)

// Deberá traer sólo el producto con el id proporcionado
router.get('/:pid', privateAuthentication, ProductsController.getById)

// Deberá agregar un nuevo producto
router.post('/', privateAuthentication, ProductsController.create);

// Deberá actualizar un producto existente con el id proporcionado.
router.put('/:pid', privateAuthentication, ProductsController.update)

// Deberá eliminar un producto existente con el id proporcionado.
router.delete('/:pid', privateAuthentication, ProductsController.delete)

module.exports = router;