const { ProductsDao } = require('../dao/managers/products.dao');
const { CartDao } = require('../dao/managers/carts.dao');
const { UsersDao } = require('../dao/managers/users.dao');
const CartService = require('../services/carts.service');
const ProductsService = require('../services/products.service');
const UsersService = require('../services/users.service');

const productsService = new ProductsService(new ProductsDao());
const cartService = new CartService(new CartDao(), productsService);
const usersService = new UsersService(new UsersDao());