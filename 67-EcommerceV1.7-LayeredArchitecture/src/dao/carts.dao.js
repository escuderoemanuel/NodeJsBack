const CartsModel = require('../dao/models/carts.model');
//  const ProductsService = require('../services/products.service');

class CartDao {

  async create() {
    try {
      const cart = { products: [] }
      await CartsModel.create(cart);
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getAll() {
    try {
      const carts = await CartsModel.find().lean();
      return carts;
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getById(id) {
    try {
      const cart = await CartsModel.findOne({ _id: id }).lean()
      return cart;
    } catch (error) {
      throw new Error(`Error searching for cart with id: ${id}`)
    }
  }
  async update(id, cart) {
    try {
      await CartsModel.updateOne({ _id: id }, cart);
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async delete(id) {
    try {
      const result = await CartsModel.deleteOne({ _id: id });
      if (result.deletedCount === 0) {
        throw new Error(`Cart with id ${id} not found`);
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

// Exportación para utilizar en el app.js
module.exports = CartDao;