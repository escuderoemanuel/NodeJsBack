const mongoose = require('mongoose');

const OrdersSchema = new mongoose.Schema({
  number: Number,
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'business'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  products: [],
  totalPrice: Number
})

const OrdersModel = mongoose.model('orders', OrdersSchema);

module.exports = OrdersModel;