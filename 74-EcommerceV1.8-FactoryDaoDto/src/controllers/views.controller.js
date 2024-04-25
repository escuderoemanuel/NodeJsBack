const { productsService } = require('../repositories');

class ViewsController {

  static async getHome(req, res) {
    const products = await productsService.getAll();
    res.render('home', { products: products });
  }

  static async getRealTimeProducts(req, res) {

    const products = await productsService.getAll();
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

  static async getChat(req, res){
    try{    
        res.render('chat',{user: req.user})
    } catch (error) {
        res.status(error.status || 500).send({status:'error', error: error.message})
    }
}

}

module.exports = ViewsController;