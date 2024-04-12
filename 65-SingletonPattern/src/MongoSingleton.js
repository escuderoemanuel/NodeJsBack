const mongoose = require('mongoose');

class MongoSingleton {
  static #instance;  // Static and Private (#)

  constructor() {
    mongoose.connect('mongodb://localhost:27017/example').then(() => {
      console.log('Connected successfuly')
    }).catch((error) => {
      console.log('There was an error', error)
    })
  }

  static getInstance() {
    if (this.#instance) {
      console.log('Already connected')
      return this.#instance;
    }

    console.log('Getting new connection')
    this.#instance = new MongoSingleton();

    return this.#instance;
  }
}

module.exports = MongoSingleton;   