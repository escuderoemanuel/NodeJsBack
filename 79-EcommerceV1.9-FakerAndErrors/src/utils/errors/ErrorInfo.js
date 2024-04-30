const getCreateProductErrorInfo = (product) => {
  return `
  One or more required properties were incomplete or not valid.
  List of required properties:
  - title: expected 'String', received ${product.title},
  - description: expected 'String', received ${product.description},
  - price: expected 'String', received ${product.price},
  - thumbnails: expected 'String', received ${product.thumbnails},
  - code: expected 'String', received ${product.code},
  - stock: expected 'String', received ${product.stock},
  - category: expected 'String', received ${product.category},
  - status: expected 'String', received ${product.status}
  `
}

module.exports = { getCreateProductErrorInfo }