const UserDTO = require('../dao/DTOs/UserDTO');

const { productsService } = require('../repositories');

class ViewsController {

  static async getHome(req, res) {
    res.redirect('/api/products');

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

  static async getChat(req, res) {
    try {
      res.render('chat', { user: req.user })
    } catch (error) {
      res.status(error.status || 500).send({ status: 'error', error: error.message })
    }
  }


  //? CURRENT SESSION
  static async getCurrent(req, res) {

    try {
      const user = req.user;
      console.log('CLG session.controller req.user!!', user) //! undefined
      const userDTO = new UserDTO(user)
      console.log('CLG session.controller userDTO', UserDTO)
      res.send({ payload: userDTO });
    } catch (error) {
      res.status(error.status || 500).send({ status: 'error', message: error.message })
    }
  }


  static async getRealTimeProducts(req, res) {
    try {
      const user = req.user;
      const products = await productsService.getAll();
      res.render('realTimeProducts', { products, user });
    } catch (error) {
      res.status(error.status || 500).send({ status: 'error', message: error.message })
    }
  }
}


module.exports = ViewsController;