const mongoose = require('mongoose');

const cartsSchema = new mongoose.Schema({
  items: {
    type: [{
      item: String,
      quantity: Number,
    }],
    default: []
  }

})

// collection 'carts' + schema
const CartsModel = mongoose.model('carts', cartsSchema);
module.exports = CartsModel;