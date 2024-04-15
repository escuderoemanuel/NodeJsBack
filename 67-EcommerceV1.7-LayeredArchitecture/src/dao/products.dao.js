const ProductsModel = require('./models/products.model');

class ProductsDao {

  async getAll(filter, options) {
    try {
      if (filter && options) {
        return await ProductsModel.paginate(filter, options);
      }
      return await ProductsModel.find().lean();
    } catch (error) {
      throw new Error('Error fetching products from database');
    }
  }

  async getById(id) {
    try {
      return await ProductsModel.findOne({ _id: id }).lean();
    } catch (error) {
      throw new Error('Error fetching product by ID from database');
    }
  }

  async create(product) {
    try {
      return await ProductsModel.create(product);
    } catch (error) {
      throw new Error('Error creating product in database');
    }
  }


  async update(id, newProduct) {
    try {
      return await ProductsModel.updateOne({ _id: id }, newProduct);
    } catch (error) {
      throw new Error('Error updating product in database');
    }
  }

  async delete(id) {
    try {
      return await ProductsModel.deleteOne({ _id: id });
    } catch (error) {
      throw new Error('Error deleting product from database');
    }
  }

}

module.exports = ProductsDao;