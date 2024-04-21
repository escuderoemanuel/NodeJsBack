const BusinessDAO = require('../dao/classes/business.dao')

const BusinessService = new BusinessDAO();

class BusinessController {
  static async getAll(req, res) {
    try {
      const result = await BusinessService.getAll();
      res.send({ status: 'success', payload: result })
    } catch (error) {
      res.status(500).send({ status: 'error', error: error.message })
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const result = await BusinessService.getById(id);
      res.send({ status: 'success', payload: result })
    } catch (error) {
      res.status(500).send({ status: 'error', error: error.message })
    }
  }

  static async create(req, res) {
    try {
      const businessData = req.body;
      const result = await BusinessService.create(businessData);
      res.send({ status: 'success', payload: result })
    } catch (error) {
      res.status(500).send({ status: 'error', error: error.message })
    }
  }

  static async addProduct(req, res) {
    try {
      const { id } = req.params;
      const product = req.body;
      const business = await BusinessService.getById(id);
      business.products.push(product);
      await BusinessService.update(id, business);
      res.send({ status: 'success', payload: business })
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

module.exports = BusinessController;