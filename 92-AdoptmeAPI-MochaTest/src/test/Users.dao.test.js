const mongoose = require('mongoose');
const { MONGO_URL } = require('../config/config');
const Assert = require('assert');
const Users = require('../dao/Users.dao');

const assert = Assert.strict; // Aquí seteo el assert a strictEqual

// Conectar a la base de datos antes de empezar los tests
mongoose.connect(MONGO_URL).then(() => {
  console.log('Connected to MongoDB')
});

// Aquí uso function para poder setear el this.timeout, luego puedo seguir la sintaxis de arrow function
describe('Users Dao Tests', function () {

  this.timeout(10000); // Aumentar el tiempo de espera a 10 segundos

  //! Crea una instancia de Users(), para utilizarla en todos los test
  before(() => {
    this.usersDao = new Users();
  });

  //! Desde aquí van los tests
  it('should return an array', async () => {
    const result = await this.usersDao.get();
    assert.equal(Array.isArray(result), true);
  });

  it('should return an empty array in the first .get', async () => {
    const result = await this.usersDao.get();
    assert.equal(Array.isArray(result), true);
    assert.equal(result.length, 0);
    // Assert.equal(result, []) // Esto da false porque no es el mismo objeto
    // Assert.equal(JSON.stringify(result), JSON.stringify([])) // Esto da true porque compara el contenido
    // Assert.equal('2', 2) // Esto da true porque compara el contenido pero no el tipo de dato
    // Assert.strictEqual('2', 2) // Esto da false porque compara el contenido y el tipo de dato
    //! Para evitar errores, es aconsejable utilizar strictEqual, el cual podemos setear al momento de declarar el assert
  });
});
