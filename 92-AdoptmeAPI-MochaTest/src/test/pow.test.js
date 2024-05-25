import Assert from 'assert';
import pow from '../utils/pow.js';

describe('Pow Function Tests', () => {

  // Para empezar a escribir un test en concreto
  it('2 to the power of 3 should be 8', function () {
    const result = pow(2, 3);
    Assert.equal(result, 8);
  });

  it('3 to the power of 3 should be 27', function () {
    const result = pow(3, 3);
    Assert.equal(result, 27);
  });

})