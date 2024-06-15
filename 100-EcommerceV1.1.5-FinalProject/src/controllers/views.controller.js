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
    try {
      res.render('resetPassword', { user: {} })
    } catch (error) {
      res.status(error.status || 500).send({ status: 'error', error: error.message })
    }
  }

  static async getChangePassword(req, res) {
    try {
      res.render('changePassword', { user: {} })
    } catch (error) {
      res.status(error.status || 500).send({ status: 'error', error: error.message })
    }
  }

  static async getProfile(req, res) {

    try {
      const user = req.user;
      const userDTO = new UserDTO(user)

      // Verificar el encabezado 'Accept'para que si la consulta es desde el FRONT, haga un res.render pero sino, haga un res.json
      const acceptHeader = req.headers['accept'] || '';
      if (acceptHeader.includes('text/html')) {
        res.render('profile', { user: userDTO, currentPath: req.path })
      } else {
        res.send({ payload: userDTO });
      }

    } catch (error) {
      res.status(error.status || 500).send({ status: 'error', message: error.message })
    }
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
      const userDTO = new UserDTO(user)

      // Verificar el encabezado 'Accept'para que si la consulta es desde el FRONT, haga un res.render pero sino, haga un res.json
      const acceptHeader = req.headers['accept'] || '';
      if (acceptHeader.includes('text/html')) {
        res.render('profile', userDTO);
      } else {
        res.send({ payload: userDTO });
      }

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