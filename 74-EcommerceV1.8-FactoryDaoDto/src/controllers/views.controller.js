const { productsService } = require('../repositories');

/* const ProductsManager = require('../dao/managers/products.dao')
const productsManager = new ProductsManager();
 */
class ViewsController {

  static async getHome(req, res) {
    const products = await productsService.getAll();
    res.render('home', { products: products });
  }

  static async getRealTimeProducts(req, res) {
    const products = await productsManager.getAll();
    res.render('realTimeProducts', { products });
  }

  static async getLogin(req, res) {
    res.render('login', {});
  }

  static async getRegister(req, res) {
    res.render('register', {});
  }

  static async getResetPassword(req, res) {
    res.render('resetPassword', {});
  }

  static async getProfile(req, res) {
    res.render('profile', { user: req.user });
  }

  static async getPublicRoute(req, res) {
    res.redirect('/login');
  }

}

module.exports = ViewsController;