const mongoose = require('mongoose');

const cartsSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'products'
        },
        quantity: Number
      }
    ],
    default: []
  }
})

// Populate
// Cuando se use cartsSchema y haya un 'findOne' o 'find' lo que sigue será el populate
cartsSchema.pre('findOne', function (next) {
  this.populate('products.product');
  next();
})
cartsSchema.pre('find', function (next) {
  this.populate('products.product');
  next();
})

// collection 'carts' + schema
const CartsModel = mongoose.model('carts', cartsSchema);
module.exports = CartsModel;