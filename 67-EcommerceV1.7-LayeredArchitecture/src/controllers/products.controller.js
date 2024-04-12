const ProductsDbManager = require('../dao/dbManager/ProductsDbManager');
const manager = new ProductsDbManager();

class ProductsController {
  static async getAll(req, res) {
    try {
      let paginateData = await manager.getProducts(req, res);
      // console.log('paginateData', paginateData)

      const userData = req.tokenUser.serializableUser;
      // console.log('userData', userData)

      // Combinar los datos del usuario y los datos de paginación en un solo objeto porque handlebars no deja pasar más de 1
      const renderData = { ...paginateData, user: userData };

      res.render('products', renderData);
      //res.render('products', { user: userData });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const pid = req.params.pid;
      const product = await manager.getProductById(pid);
      res.send({ status: 'success', payload: product });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  static async create(req, res) {
    try {
      await manager.addProduct(req.body);
      const products = await manager.getProducts(req, res);
      res.send({ status: 'success', products });
    } catch (error) {
      console.log(error);
      res.status(400).send({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const id = req.params.pid;
      // console.log('PUT ID', id)
      const updatedFields = req.body;
      const updatedProduct = await manager.updateProduct(id, updatedFields);
      res.send({ status: 'success', payload: updatedProduct });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const id = req.params.pid;
      const productToDelete = await manager.getProductById(id);
      await manager.deleteProduct(id);
      const products = await manager.getProducts(req, res);
      res.send({ status: 'success', payload: { productToDelete, products } });
    } catch (error) {
      res.status(400).send({ status: 'error', message: error.message });
    }
  }



}

module.exports = ProductsController;