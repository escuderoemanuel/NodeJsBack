const OrdersModel = require('../models/users.models');

class OrdersDAO {

  async getAll() {
    return await OrdersModel.find({});
  }

  async getById(id) {
    return await OrdersModel.findById(id);
    // return await OrdersModel.findOne({_id:id});
  }

  async create(user) {
    return await OrdersModel.create(user);
  }

  async update(id, user) {
    return await OrdersModel.updateOne({ _id: id }, user);
  }

  async delete(id) {
    return await OrdersModel.deleteOne({ _id: id });
  }
}

module.exports = OrdersDAO;