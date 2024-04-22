const { Router } = require('express');
const { privateAccess } = require('../middlewares/middlewares');
const CartsController = require('../controllers/carts.controller');

const router = Router();

// Deberá crear un nuevo carrito con id y products[].
router.post('/', privateAccess, CartsController.create)

// Deberá listar todos los carritos (No lo pide el desafío).
router.get('/', privateAccess, CartsController.getAll)

// Deberá listar los productos que pertenezcan al carrito con el cid proporcionado, dando acceso a los datos del cart y de las propiedades de los productos que contenga.
router.get('/:cid', privateAccess, CartsController.getById)

// Deberá agregar el producto al arreglo “products” del carrito seleccionado
router.post('/:cid/product/:pid', privateAccess, CartsController.addProductToCart)

// Deberá eliminar del carrito el producto seleccionado
router.delete('/:cid/product/:pid', privateAccess, CartsController.deleteProductById)

// Deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
router.put('/:cid/products/:pid', privateAccess, CartsController.updateProductQuantityById)

// DELETE: api/carts/:cid deberá eliminar todos los productos del carrito
router.delete('/:cid', privateAccess, CartsController.emptyCartById)

module.exports = router;