//const { describe } = require('yargs')
const myFunction = require('./myFunction.js')

describe('myFunction', () => {
  it('should return the sum of two numbers', () => {
    let result = myFunction(2, 3);
    expect(result).toBe(5);
  })

  it('should return the sum of two numbers', () => {
    let result = myFunction(5, 8);
    expect(result).toBe(13);
  })

  it('should return the sum of two numbers', () => {
    let result = myFunction(10, 20);
    expect(result).toBe(30);
  })
})