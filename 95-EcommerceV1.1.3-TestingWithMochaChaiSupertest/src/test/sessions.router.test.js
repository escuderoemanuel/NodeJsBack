const mongoose = require('mongoose');
const chai = require('chai');
const supertest = require('supertest');
const path = require('path');
const { TESTING_URL, MONGO_URL } = require('../config/environment.config');
const Users = require('../dao/daoManagers/users.dao');

const expect = chai.expect;
const requester = supertest(TESTING_URL);

describe('Testing NodeJsEcommerce', function () {
  this.timeout(10000); // Aumentar el tiempo de espera a 10 segundos

  describe('⚠️ Sessions Tests', function () {

    before(async () => {
      await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
      this.userMock = {
        // name: 'Coco',
        // specie: 'Dog',
        // birthDate: '10-10-2020'
      };
    });

    /*  beforeEach(async () => {
       const collection = mongoose.connection.collections['sessions'];
       if (collection) {
         await collection.drop().catch(err => {
           if (err.message !== 'ns not found') {
             throw err;
           }
         });
       }
     });
  */
    it('1. The POST endpoint "XXXXXXX" should create a session correctly', async () => {

    });


  });

});
