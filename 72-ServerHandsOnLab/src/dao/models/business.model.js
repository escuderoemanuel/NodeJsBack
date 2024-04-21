const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema({
  name: String,
  products: [],
})

const BusinessModel = mongoose.model('business', BusinessSchema);

module.exports = BusinessModel;