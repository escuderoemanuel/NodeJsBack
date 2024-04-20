const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
  name: String,
  description: String,
  stock: Number
})

const productsModel = mongoose.model('items', productsSchema);
module.exports = productsModel;