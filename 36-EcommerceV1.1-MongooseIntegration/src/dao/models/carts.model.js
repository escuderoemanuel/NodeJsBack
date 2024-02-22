const mongoose = require('mongoose');

const cartsSchema = new mongoose.Schema({
  cid: {
    type: Number,
    required: true,
  },
  pid: {
    type: Number,
    required: true,
  }
})

// collection 'carts' + schema
const cartsModel = mongoose.model('carts', cartsSchema);
module.exports = cartsModel;