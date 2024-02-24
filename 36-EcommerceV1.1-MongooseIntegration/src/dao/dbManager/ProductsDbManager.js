const ProductsModel = require('../models/products.model')

class ProductsDbManager {
  constructor() {
    this.products = [];
  }

  //! ADD
  async addProduct(product) {
    try {
      await ProductsModel.create(product)
    } catch (error) {
      throw new Error(error.message)
    }
  }

  //! GET
  async getProducts() {
    try {
      const products = await ProductsModel.find().lean();
      return products;
    } catch (error) {
      throw new Error(error.message)
    }
  }

  //! GET BY ID
  async getProductById(id) {
    try {
      const product = await ProductsModel.findOne({ _id: id }).lean();
      console.log('product', product)
      console.log('id', id)
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

  /* async getProducts() {
    try {
      const products = await ProductsModel.find().lean();
      return products;
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async addProduct(title, description, price, thumbnails, code, stock, status, category) {

    try {

      const products = await this.getProducts();

      // Verify if all the fields are filled.
      if (!title || !description || !price || !code || !stock || !category || !status) {
        throw new Error('All fields are required');
      }

      // Verify if the product code already exists.
      if (products.find(prod => prod.code === code)) {
        throw new Error('The product code already exists.');
      } else {
        // If the product code does not exist, create the new product
        const product = await ProductsModel.create({
          title,
          description,
          price,
          thumbnails,
          code,
          stock,
          status,
          category,
        });

        // Add the new product to the products array.
        products.push(product);
        return products;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getProductById(id) {
    try {
      const products = await ProductsModel.findOne({ _id: id }).lean();

      // Find the product with the specified id.
      const product = products.find(product => product._id === id);

      if (product) {
        return product;
      } else {
        throw new Error(`Product with id ${id} not found.`);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateProduct(id, field) {
    try {
      // Array of fields that can be modified. (Without this validation you could add new fields)
      const validFields = ['title', 'description', 'price', 'thumbnails', 'code', 'stock', 'status', 'category'];

      // Verify if the field is valid
      if (typeof field !== 'object' || Object.keys(field).length === 0 || !Object.keys(field).every(key => validFields.includes(key))) {
        throw new Error('The product cannot be modified. Invalid field.');
      }

      const products = await ProductsModel.find().lean();

      // Find the index position of the product to update
      const productIndex = products.findIndex(product => product._id === id);

      // If product index id valid
      if (productIndex !== -1) {
        // Itarates in search of the index of the field to update
        for (const key in field) {
          if (validFields.includes(key)) {
            products[productIndex][key] = field[key]
          }
        }

        return products[productIndex]
      } else {
        throw new Error(`Product with id '${id}' not found.`)
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteProduct(id) {
    try {
      const products = await ProductsModel.findOne({ _id: id }).lean();

      // Find the index position of the product to delete. If the product is not found, it will return -1.
      const productIndex = products.findIndex(product => product._id === id);

      if (productIndex !== -1) {
        // Delete 1 product, from the specified productIndex
        products.splice(productIndex, 1);
        return products;
      } else {
        throw new Error(`Product to delete with id '${id}' not found!`)
      }
    } catch (error) {
      throw new Error(error.message);
    }
  } */
}
// Exportación para utilizar en el app.js
module.exports = ProductsDbManager;
