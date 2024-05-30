const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
const chai = require('chai');
const supertest = require('supertest');
const path = require('path');
const { TESTING_URL, MONGO_URL } = require('../config/environment.config');
const expect = chai.expect;
const requester = supertest(TESTING_URL);
const cartsModel = require('../dao/models/carts.model');

mongoose.connect(MONGO_URL)

describe('▼ CARTS ROUTER TESTS', function () {
  this.timeout(10000); // Aumentar el tiempo de espera a 10 segundos

  before(async () => {
    //! Create a new user with faker
    this.cartMock = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      age: faker.number.int({ min: 18, max: 90 }),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    this.cookie;
  });

  it('1. The GET endpoint "/api/carts" should ...', async () => {
    //! 
    //! Tests
  })
  it('2. The POST endpoint "/api/carts" should ...', async () => {
    //! 
    //! Tests
  })
  it('3. The GET endpoint "/api/carts/{cid}" should ...', async () => {
    //! 
    //! Tests
  })
  it('4. The DELETE endpoint "/api/carts/{cid}" should ...', async () => {
    //! 
    //! Tests
  })
  it('5. The GET endpoint "/api/carts/{cid}/purchase" should ...', async () => {
    //! 
    //! Tests
  })
  it('6. The POST endpoint "/api/carts/{cid}/product/{pid}" should ...', async () => {
    //! 
    //! Tests
  })
  it('7. The PUT endpoint "/api/carts/{cid}/product/{pid}" should ...', async () => {
    //! 
    //! Tests
  })
  it('6. The DELETE endpoint "/api/carts/{cid}/product/{pid}" should ...', async () => {
    //! 
    //! Tests
  })
});

