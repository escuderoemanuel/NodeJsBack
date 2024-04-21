const mongoose = require('mongoose');
const { MONGO_URL, PERSISTENCE } = require('../config/environment.config');

let CartsDao;
let ProductsDao;
let UsersDao;
let TicketsDao;

switch (PERSISTENCE) {
  case 'MONGO':
    mongoose.connect(MONGO_URL).then(() => {
      console.log('connected to atlas.')
    })
    CartsDao = require('../dao/managers/carts.dao')
    ProductsDao = require('../dao/managers/products.dao')
    UsersDao = require('../dao/managers/users.dao')
    TicketsDao = require('../dao/managers/tickets.dao')
    break;

  case 'MEMORY':
    console.log('MEMORYYYY')
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