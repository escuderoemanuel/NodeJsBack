const { Router } = require('express');
const CartsController = require('../controllers/carts.controller');
const { verifyToken } = require('../middlewares/verifyToken.middleware');
const getRole = require('../middlewares/getRole.middleware');

const router = Router();

// Deberá listar todos los carritos.
router.get('/', verifyToken, CartsController.getAll)

// Deberá crear un nuevo carrito con id y products[].
router.post('/', verifyToken, CartsController.create)

// Deberá listar los productos que pertenezcan al carrito con el cid proporcionado, dando acceso a los datos del cart y de las propiedades de los productos que contenga.
router.get('/:cid', verifyToken, CartsController.getById)

// DELETE: api/carts/:cid deberá eliminar todos los productos del carrito
router.delete('/:cid', verifyToken, CartsController.emptyCartById)

// Crear un ticket
router.get('/:cid/purchase', verifyToken, CartsController.purchase)

// Deberá agregar el producto al arreglo “products” del carrito seleccionado
router.post('/:cid/product/:pid', verifyToken, getRole(['user', 'premium']), CartsController.addProductToCart)

// Deberá eliminar del carrito el producto seleccionado
router.delete('/:cid/product/:pid', CartsController.deleteProductById)

// Deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
router.put('/:cid/product/:pid', verifyToken, CartsController.updateProductQuantityById)

module.exports = router;