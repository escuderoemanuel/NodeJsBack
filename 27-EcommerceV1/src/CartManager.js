const fs = require('fs');

const encoding = 'utf8';

class CartManager {

  constructor(path) {
    this.path = path;
    this.products = [];
  }

  async addCart() {
    try {
      if (!fs.existsSync(this.path)) {
        await fs.promises.writeFile(this.path, '[]', encoding);
      }

      const carts = await fs.promises.readFile(this.path, encoding);
      const parsedCarts = JSON.parse(carts);

      const id = parsedCarts.length > 0 ? parsedCarts[parsedCarts.length - 1].id + 1 : 1;
      // Add new cart to the Carts
      const newCart = { id, products: [] };

      parsedCarts.push(newCart);

      await fs.promises.writeFile(this.path, JSON.stringify(parsedCarts, null, 2), encoding);
      return newCart;
    } catch (error) {
      throw new Error(error.message)
    }
  }



  async addProductToCart() {
    try {


    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getCarts() {
    try {

    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getCartById() {
    try {

    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateCartById() {
    try {

    } catch (error) {
      throw new Error(error.message)
    }
  }

  async deleteCartById() {
    try {

    } catch (error) {
      throw new Error(error.message)
    }
  }


}

module.exports = CartManager;
