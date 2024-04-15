class CartService {
  constructor() {
    this.dao = new CartDao();
    this.productsService = new ProductsService();
  }

  async getAll() {
    return await this.dao.getAll();
  }

  async getById(id) {
    const cart = await this.dao.getById(id);
    if (!cart) {
      throw new Error(`There's no card by id ${id}`)
    };
    return cart;
  }

  async create() {
    const cart = { products: [] }
    return await this.dao.create(cart);
  }

  async update(id, cart) {
    await this.getById(id);
    return await this.dao.update(id, cart);
  }

  async delete(id) {
    await this.getById(id);
    return await this.dao.delete(id);
  }

  async addProduct(id, productId) {
    const cart = await this.getById(id);
    const index = cart.products.findIndex(product => product.id === productId);

    if (index >= 0) {
      cart.products[index].quantity++;
    } else {
      cart.products.push({ id: productId, quantity: 1 });
    }
    await this.update(id, cart);
    return cart;
  }

  async deleteProductById(id, productId) {
    const cart = await this.getById(id);
    await this.productsService.getById(productId);

    const newContent = cart.products.filter(product => product.id !== productId)
    await this.update(id, { products: newContent });
    return this.getById(id);
  }

  async updateCartProduct(cartId, content) {
    await this.getById(cartId);
    await this.update(cartId, { products: content });
    return this.getById(cartId);
  }

  async updateProductQuantity(cartId, productId, quantity) {
    const cart = await this.getById(cartId);
    await this.productsService.getById(productId);
    if (!quantity || isNaN(quantity) || quantity < 0) {
      throw { message: 'Quantity is not valid', status: 400 }
    }

    const index = cart.products.findIndex(product => product.id === productId);

    if (index < 0) {
      throw { message: 'Product not found', status: 404 }
    }
    cart.products[index].quantity = parseInt(quantity);

    await this.update(cartId, cart);
    return this.getById(cartId);
  }

  async deleteAllProducts(id) {
    await this.getById(id);
    await this.update(id, { products: [] });
    return this.getById(id);
  }
}
module.exports = CartService;