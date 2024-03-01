const ProductsModel = require('../models/products.model')

class ProductsDbManager {

  //! ADD
  async addProduct(product) {
    try {
      await ProductsModel.create(product);
    } catch (error) {
      throw new Error(error.message)
    }
  }

  //! GET
  async getProducts() {
    try {

      /* 
      // Límite string parseado a number
    const limit = parseInt(req.query.limit);
    // Página string parseado a number
    const page = parseInt(req.query.page);
    // Filtro string
    const query = req.query.query;
    // Orden string (asc o desc)
    const sort = req.query.sort;
    if (limit) {
      products = products.slice(0, limit);
    }
      */

      const products = await ProductsModel.find().lean();
      return products;
    } catch (error) {
      throw new Error(error.message)
    }
  }

  //! GET BY ID
  async getProductById(id) {
    try {
      const product = await ProductsModel.findOne({ _id: id });
      return product;
    } catch (error) {
      throw new Error(error.message)
    }
  }

  //! UPDATE
  async updateProduct(id, newProduct) {
    try {
      await ProductsModel.updateOne({ _id: id }, newProduct);
    } catch (error) {
      throw new Error(error.message)
    }
  }

  //! DELETE
  async deleteProduct(id) {
    try {
      await ProductsModel.deleteOne({ _id: id });
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

module.exports = ProductsDbManager;