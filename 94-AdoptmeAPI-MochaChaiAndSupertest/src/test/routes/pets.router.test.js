const mongoose = require('mongoose');
const chai = require('chai');
const supertest = require('supertest');
const { TESTING_URL, MONGO_URL } = require('../../config/config');
const Pets = require('../../dao/Pets.dao');

const expect = chai.expect;
const requester = supertest(TESTING_URL);

describe('Testing AdoptmeAPI', function () {
  this.timeout(10000); // Aumentar el tiempo de espera a 10 segundos

  describe('Pet Tests', function () {

    before(async () => {
      await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
      this.petMock = {
        name: 'Coco',
        specie: 'Dog',
        birthDate: '10-10-2020'
      };
    });

    beforeEach(async () => {
      const collection = mongoose.connection.collections['pets'];
      if (collection) {
        await collection.drop().catch(err => {
          if (err.message !== 'ns not found') {
            throw err;
          }
        });
      }
    });

    it('The POST endpoint "/api/pets" should create a pet correctly', async () => {
      const { statusCode, _body } = await requester.post('/api/pets').send(this.petMock);
      expect(_body).to.exist;
      expect(statusCode).to.be.equal(200);
      expect(_body.payload).to.have.property('_id');
    });

    it('Al crear una mascota sólo con los datos elementales. Se debe corroborar que la mascota creada cuente con una propiedad adopted : false', async () => {
      const { _body } = await requester.post('/api/pets').send(this.petMock);
      expect(_body.payload).to.have.property('adopted')
      expect(_body.payload.adopted).to.be.equal(false)
      // expect(_body.payload).to.have.property('adopted', false); // Esto resume los dos anteriores
    });

    it('Si se desea crear una mascota sin el campo nombre, el módulo debe responder con un status 400', async () => {
      const response = await requester.post('/api/pets').send({ specie: 'Dog', birthDate: '10-10-2020' });
      expect(response.statusCode).to.be.equal(400);
    });

    it('Al obtener a las mascotas con el método GET, la respuesta debe tener los campos status y payload. Además, payload debe ser de tipo arreglo', async () => {
      const newPet = await requester.post('/api/pets').send(this.petMock);
      const response = await requester.get('/api/pets');
      expect(response._body).to.have.property('status');
      expect(response._body).to.have.property('payload')
      // expect(response._body.payload).to.be.an('array');
      expect(Array.isArray(response._body.payload)).to.be.true;
      // expect(response._body).to.have.property('payload').that.is.an('array'); // Puede ser una alternativa
    });

    it('El método PUT debe poder actualizar correctamente a una mascota determinada (esto se puede testear comparando el valor previo con el nuevo valor de la base de datos)', async () => {
      const pet = await requester.post('/api/pets').send(this.petMock);
      const pid = pet._body.payload._id;
      // console.log('pid', pid)
      const putPet = await requester.put(`/api/pets/${pid}`).send({ name: 'Updated Coco', specie: 'Dog', birthDate: '10-10-2020' });
      // const updatedPet = await requester.get(`/api/pets/${pid}`);
      console.log('ok')
      // expect(response._body.payload.name).to.be.equal('Updated Coco');
    })

  });
});
