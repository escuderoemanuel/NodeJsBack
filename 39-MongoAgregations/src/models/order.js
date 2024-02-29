const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  name: String,
  size: String,
  price: Number,
  quantity: Number,
  date: Date
})

const orderModel = mongoose.model('orders', orderSchema);

module.exports = orderModel;