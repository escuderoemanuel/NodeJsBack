const { faker } = require('@faker-js/faker')

const generateProduct = () => {
  return {
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    stock: faker.number.int({ min: 10, max: 100 }),
    image: faker.image.url(),
    id: faker.database.mongodbObjectId(),
    code: faker.string.alphanumeric(10),
    description: faker.lorem.paragraph()
  }
}


module.exports = {
  generateProduct
}