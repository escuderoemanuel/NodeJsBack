const OrdersModel = require('../models/orders.models');

class OrdersDAO {

  async getAll() {
    return await OrdersModel.find({});
  }

  async getById(id) {
    const order = await OrdersModel.findById(id);
    if (!order) {
      throw { status: 400, message: 'Order not found' };
    }
    return order;
    // return await OrdersModel.findOne({_id:id});
  }

  async create(user) {
    return await OrdersModel.create(user);
  }

  async update(id, user) {
    await this.getById(id);
    return await OrdersModel.updateOne({ _id: id }, user);
  }

  async delete(id) {
    return await OrdersModel.deleteOne({ _id: id });
  }
}

module.exports = OrdersDAO;