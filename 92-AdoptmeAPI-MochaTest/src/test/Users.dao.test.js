import mongoose from 'mongoose';
import { Assert as assert } from 'assert';
import MONGO_URL from '../config/environment.config.js';
import Users from '../dao/users.dao.js';

mongoose.connect(MONGO_URL).then(() => {
  console.log('Connected to MongoDB');
})

describe('Users Dao Test', () => {
  // Antes de empezar los test, crear un nuevo DAO de usuarios
  before(() => {
    this.usersDao = new Users();
  })

  it('Should get all users in array type', async () => {
    const result = await this.usersDao.ge
    assert.equal(users.length, 3);
  })

});