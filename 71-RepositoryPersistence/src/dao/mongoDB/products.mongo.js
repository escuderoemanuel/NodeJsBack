const productsModel = require('./models/products.model');

class Products {

  async getAll() {
    return await productsModel.find({});
  }

}

module.exports = Products;