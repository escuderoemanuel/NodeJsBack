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
  async getProducts(req) {
    console.log('req.query', req.query)
    try {
      let products = await ProductsModel.find().lean();

      // Límite string parseado a number
      let limit = parseInt(req.query.limit);
      if (limit) {
        products = products.slice(0, limit);
      } else {
        limit = 10;
      }

      // Filtro 'page' parseado a number
      let page = parseInt(req.query.page);
      page ? page = page : page = 1;

      // Filtro 'sort' string (asc o desc)
      let sort;
      if (req.query.sort === 'asc') {
        sort = 1;
      } else if (req.query.sort === 'desc') {
        sort = -1;
      }

      // Filtro 'filter' string (title o category)
      let filter = {};
      if (req.query.filter) {
        // $option: 'i' para que no distinga mayúsculas de minúsculas
        filter = {
          $or: [{ title: { $regex: req.query.title, $options: 'i' } }, { category: { $regex: req.query.category, $options: 'i' } }]
        }
      }

      console.log('limit', limit)
      console.log('page', page)
      console.log('sort', sort)
      console.log('filter', req.query.filter)

      const options = {
        sort: { price: sort || null },
        page: page || 1,
        limit: limit || 10,
        lean: true,
      };


      return products;
    } catch (error) {
      console.log('ERROR', error)
      // throw new Error(error.message)
    }
  }
  /*  async getProducts(req) {
     console.log('req', req)
     try {
       // Filtro 'limit' string parseado a number
       const limit = parseInt(req.query.limit);
       limit ? limit = limit : limit = 10;
 
       // Filtro 'page' parseado a number
       const page = parseInt(req.query.page);
       page ? page = page : page = 1;
 
       // Filtro 'sort' string (asc o desc)
       let sort;
       if (req.query.sort === 'asc') {
         sort = 1;
       } else if (req.query.sort === 'desc') {
         sort = -1;
       } else {
         sort = null;
       }
 
       // Filtro 'filter' string (title o category)
       const filter = {};
       if (req.query.filter) {
         // $option: 'i' para que no distinga mayúsculas de minúsculas
         filter.$or = [{ title: { $regex: req.query.filter, $options: 'i' } }, { category: { $regex: req.query.filter, $options: 'i' } }];
       }
 
       const options = {
         sort: { price: sort || null },
         page: page || 1,
         limit: limit || 10,
         lean: true,
       };
 
       const products = await ProductsModel.paginate(filter, options);
       return products;
     } catch (error) {
       console.error(error)
       //throw new Error('Error', error.message)
     }
   } */

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