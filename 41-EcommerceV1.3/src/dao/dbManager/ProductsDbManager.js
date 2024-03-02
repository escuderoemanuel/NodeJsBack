const ProductsModel = require('../models/products.model')

class ProductsDbManager {

  //! ADD
  async addProduct(product) {
    try {
      await ProductsModel.create(product);
    } catch (error) {
      throw new Error(error.message)
    }
  }

  //! GET
  async getProducts(req, res) {
    // console.log('req.query', req.query)
    try {
      let { limit, page, filter, sort } = req.query
      let options = {}

      // Límite string parseado a number
      limit = parseInt(req.query.limit);

      // Filtro 'page' parseado a number
      page = parseInt(req.query.page);
      page ? page = page : page = 1;

      // Filtro 'sort' string (asc o desc)
      sort;
      if (req.query.sort === 'asc') {
        sort = 1;
      } else if (req.query.sort === 'desc') {
        sort = -1;
      }

      // Filtro 'filter' string (title o category)
      filter = {};
      if (req.query.filter) {
        // $option: 'i' para que no distinga mayúsculas de minúsculas
        filter = {
          $or: [{ title: { $regex: req.query.filter, $options: 'i' } }, { category: { $regex: req.query.filter, $options: 'i' } }]
        }
      }

      console.log('limit', limit)
      console.log('page', page)
      console.log('sort', sort)
      console.log('filter', req.query.filter)

      options = {
        limit: limit || 10,
        page: page || 1,
        lean: true,
      };

      // Si hay un sort, lo agrego a 'options'
      if (req.query.sort) {
        options.sort = { price: sort }
      }



      console.log('options', options)

      let products = await ProductsModel.paginate(filter, options);

      let queryParameters = {};
      if (filter) queryParameters.query = filter
      if (sort) queryParameters.sort = sort
      if (limit) queryParameters.limit = limit

      let paginateData = {
        status: 'success',
        payload: products.docs,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        /* prevLink: products.hasPrevPage ? `/api/products?page=${products.prevPage}` : null,
        nextLink: products.hasNextPage ? `/api/products?page=${products.nextPage}` : null */
        prevLink: products.hasPrevPage ? `/api/products?page=${products.prevPage}&${new URLSearchParams(queryParameters)}` : null,
        nextLink: products.hasNextPage ? `/api/products?page=${products.nextPage}&${new URLSearchParams(queryParameters)}` : null
      }
      console.log('paginateData:', paginateData)
      //res.render(products, ...rest);
      return { paginateData, products: paginateData.payload };
    } catch (error) {
      console.log('ERROR', error)
      // res.status(400).send({ error: error.message });
      throw new Error(error.message)
    }
  }

  //! GET BY ID
  async getProductById(id) {
    try {
      const product = await ProductsModel.findOne({ _id: id });
      return product;
    } catch (error) {
      throw new Error(error.message)
    }
  }

  //! UPDATE
  async updateProduct(id, newProduct) {
    try {
      await ProductsModel.updateOne({ _id: id }, newProduct);
    } catch (error) {
      throw new Error(error.message)
    }
  }

  //! DELETE
  async deleteProduct(id) {
    try {
      await ProductsModel.deleteOne({ _id: id });
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

module.exports = ProductsDbManager;