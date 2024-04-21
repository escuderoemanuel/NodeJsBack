const { PERSISTENCE } = require('../config/environment.config');
const { MONGO_URL } = require('../config/environment.config');
const mongoose = require('mongoose');

let CartsDao;
let ProductsDao;
let UsersDao;
let TicketsDao;

switch (PERSISTENCE) {
  case 'MONGO':
    mongoose.connect(MONGO_URL).then(() => {
      console.log('Connected to MongoDB')
    })
    CartsDao = require('../dao/managers/carts.dao')
    ProductsDao = require('../dao/managers/products.dao')
    UsersDao = require('../dao/managers/users.dao')
    TicketsDao = require('../dao/managers/tickets.dao')
    break;

  case 'MEMORY':
    console.log('Conntected to MEMORY')
    CartsDao = require('../dao/memory/carts.memory')
    ProductsDao = require('../dao/memory/products.memory')
    UsersDao = require('../dao/memory/users.memory')
    TicketsDao = require('../dao/memory/tickets.memory')
    break;
}

module.exports = {
  CartsDao,
  ProductsDao,
  UsersDao,
  TicketsDao
};