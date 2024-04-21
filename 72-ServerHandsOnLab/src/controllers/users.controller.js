const UsersDAO = require('../dao/classes/users.dao');
const UsersService = new UsersDAO();

class UsersController {

  static async getAll(req, res) {
    try {
      const result = await UsersService.getAll();
      res.send({ status: 'success', payload: result })
    } catch (error) {
      res.status(500).send({ status: 'error', error: error.message })
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const result = await UsersService.getById(id);
      res.send({ status: 'success', payload: result })
    } catch (error) {
      res.status(500).send({ status: 'error', error: error.message })
    }
  }

  static async create(req, res) {
    try {
      const userData = req.body;
      const result = await UsersService.create(userData);
      res.send({ status: 'success', payload: result })
    } catch (error) {
      res.status(500).send({ status: 'error', error: error.message })
    }
  }

  static async update(req, res) {
    try {
      res.send({ status: 'success', payload: 'update' })
    } catch (error) {
      res.status(500).send({ status: 'error', error: error.message })
    }
  }

  static async delete(req, res) {
    try {
      res.send({ status: 'success', payload: 'delete' })
    } catch (error) {
      res.status(500).send({ status: 'error', error: error.message })
    }
  }

}

module.exports = UsersController;