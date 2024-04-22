const { productsService } = require('../repositories');

/* // Manager
const ProductsDbManager = require('../dao/dbManager/ProductsDbManager');
const manager = new ProductsDbManager();
 */
class RealTimeProductsController {
  static async getAll(req, res) {
    try {
      //let paginateData = await manager.getProducts(req, res); //! No llega a este punto
      let paginateData = await productsService.getAll(req, res);
      console.log('paginateData', paginateData); //! No llega a este punto
      res.render('realtimeproducts',
        paginateData
      );
    } catch (error) {
      res.status(400).send({ status: 'error', error: error.message });
    }
  }
}

module.exports = RealTimeProductsController;