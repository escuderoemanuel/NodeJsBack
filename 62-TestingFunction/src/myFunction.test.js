const myFunction = require('./myFunction.js')

describe('Testing myFunction', () => {
  it('Should return the sum of two numbers', () => {
    let result = myFunction(2, 3);
    expect(result).toBe(5);
  })

  it('Should return the sum of two numbers', () => {
    let result = myFunction(5, 8);
    expect(result).toBe(13);
  })

})