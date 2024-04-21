
class BusinessController {
  static async getAll(req, res) {
    try {
      res.send({ status: 'success', payload: 'getAll' })
    } catch (error) {
      res.status(500).send({ status: 'error', error: error.message })
    }
  }

  static async getById(req, res) {
    try {
      res.send({ status: 'success', payload: 'getById' })
    } catch (error) {
      res.status(500).send({ status: 'error', error: error.message })
    }
  }

  static async create(req, res) {
    try {
      res.send({ status: 'success', payload: 'create' })
    } catch (error) {
      res.status(500).send({ status: 'error', error: error.message })
    }
  }

  static async addItem(req, res) {
    try {
      res.send({ status: 'success', payload: 'addItem' })
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