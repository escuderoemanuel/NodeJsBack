const { faker } = require('@faker-js/faker')
const mongoose = require('mongoose');
const chai = require('chai');
const supertest = require('supertest');
const path = require('path');
const { TESTING_URL, MONGO_URL } = require('../config/environment.config');
const Products = require('../dao/daoManagers/products.dao');

const expect = chai.expect;
const requester = supertest(TESTING_URL);

describe('Testing NodeJsEcommerce', function () {
  this.timeout(10000); // Aumentar el tiempo de espera a 10 segundos

  describe('⚠️ Products Tests "api/products"', function () {

    before(async () => {
      await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
      this.productMock = {
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        thumbnails: [
          faker.image.url(),
          faker.image.url()
        ],
        code: faker.string.alphanumeric(8),
        stock: faker.number.int({ min: 1, max: 10 }),
        category: faker.commerce.department(),
        status: faker.datatype.boolean(1)
      };
    });

    /* beforeEach(async () => {
      const collection = mongoose.connection.collections['products'];
      if (collection) {
        await collection.drop().catch(err => {
          if (err.message !== 'Collection not found') {
            throw err;
          }
        });
      }
    }); */

    it('1. The POST endpoint "api/products" should create a product correctly', async () => {
      const token = await requester.get('/api/testToken').send({ email: 'admin@admin.com', password: '1111' });
      console.log('token', token)
      const response = await requester.post('/api/products').send(this.productMock, token);
      console.log('respose.statusCode', response.statusCode)
    });


  });

});
