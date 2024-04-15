const CartDao = require('../dao/carts.dao');
const ProductsService = require('./products.service');

class CartService {
  constructor() {
    this.dao = new CartDao();
    this.productsService = new ProductsService();
  }

  async getAll() {
    return await this.dao.getAll();
  }

  async getById(cid) {
    const cart = await this.dao.getById(cid);
    if (!cart) {
      throw new Error(`There's no card by id ${cid}`)
    };
    return cart;
  }

  async create() {
    const cart = { products: [] }
    return await this.dao.create(cart);
  }

  async update(cid, cart) {
    await this.getById(cid);
    return await this.dao.update(cid, cart);
  }

  async delete(cid) {
    await this.getById(cid);
    return await this.dao.delete(cid);
  }

  async addProduct(cid, productId) {
    const cart = await this.getById(cid);
    const productIndex = cart.products.findIndex(product => product._id === productId);

    if (productIndex >= 0) {
      cart.products[productIndex].quantity++;
    } else {
      cart.products.push({ id: productId, quantity: 1 });
    }
    await this.update(cid, cart);
    return cart;
  }

  async deleteProductById(cid, productId) {
    const cart = await this.getById(cid);
    await this.productsService.getById(productId);

    const newContent = cart.products.filter(product => product.id !== productId)
    await this.update(cid, { products: newContent });
    return this.getById(cid);
  }

  async updateProductQuantity(cid, pid, quantity) {
    const cart = await this.getById(cid);
    console.log('cart en cartService', cart)
    const product = await this.productsService.getById(pid);
    console.log('product en cartService', product)

    if (!quantity || isNaN(quantity) || quantity < 0) {
      throw { message: 'Quantity is not valid', status: 400 }
    }

    const productIndex = cart.products.findIndex(product => product.id === pid);

    if (productIndex < 0) {
      throw { message: 'Product not found', status: 404 }
    }
    cart.products[productIndex].quantity = parseInt(quantity);

    await this.update(cid, cart);
    return this.getById(cid);
  }

  async deleteAllProducts(cid) {
    await this.getById(cid);
    await this.update(cid, { products: [] });
    return this.getById(cid);
  }
}
module.exports = CartService;