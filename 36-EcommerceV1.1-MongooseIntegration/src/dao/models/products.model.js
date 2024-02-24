const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
  /*  _id: {
     type: String,
   },
   id: {
     type: String,
   }, */
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  thumbnails: {
    type: Array,
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
    required: true
  }
})

// collection 'products' + schema
const productsModel = mongoose.model('products', productsSchema);
module.exports = productsModel;