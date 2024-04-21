const OrdersDAO = require('../dao/classes/orders.dao');
const UsersDAO = require('../dao/classes/users.dao');
const BusinessDAO = require('../dao/classes/business.dao');
const OrdersServices = new OrdersDAO();
const UsersServices = new UsersDAO();
const BusinessServices = new BusinessDAO();

class OrdersController {
  static async getAll(req, res) {
    try {
      const result = await OrdersServices.getAll();
      res.send({ status: 'success', payload: result })
    } catch (error) {
      res.status(500).send({ status: 'error', error: error.message })
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const result = await OrdersServices.getById(id);
      res.send({ status: 'success', payload: result })
    } catch (error) {
      res.status(500).send({ status: 'error', error: error.message })
    }
  }

  static async create(req, res) {
    try {
      const { userId, businessId, products } = req.body;
      // Find documents
      const foundUser = await UsersServices.getById(userId);
      const foundBusiness = await BusinessServices.getById(businessId);
      // Mapping products to order
      const orderProducts = products.map(pid => foundBusiness.products.find(businessProduct => businessProduct.id == pid))
      // Calculate total price
      const totalPrice = orderProducts.reduce((acc, product) => {
        return acc + product.price
      }, 0);
      // Create order
      const orderNumber = `${Date.now()}${Math.floor(Math.random() * 1000 + 1)}`;
      const orderData = {
        number: orderNumber,
        user: userId,
        business: businessId,
        state: 'pending',
        products: orderProducts,
        totalPrice
      }
      // Save order
      const result = await OrdersServices.create(orderData);
      // Update user
      foundUser.orders.push(result._id);
      await UsersServices.update(userId, foundUser);
      // Send 
      res.send({ status: 'success', payload: result })
    } catch (error) {
      res.status(500).send({ status: 'error', error: error.message })
    }
  }

  static async updateState(req, res) {
    try {
      const { id } = req.params;
      const { state } = req.body;
      await OrdersServices.getById(id);
      const result = await OrdersServices.updateState(id, { $set: { state: state } });
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

module.exports = OrdersController;