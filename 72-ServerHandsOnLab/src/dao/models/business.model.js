const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema({
  name: String,
  products: [],
})

const BusinessModel = mongoose.model('Business', BusinessSchema);

module.exports = BusinessModel;