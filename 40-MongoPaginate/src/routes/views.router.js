const { Router } = require('express');
const studentModel = require('../models/student');

const viewsRouter = Router();

viewsRouter.get('/students', async (req, res) => {

  let page = req.query.page || 1
  let limit = req.query.limit || 5
  let opt = {}

  if (req.query.query) {
    // opt = {
    //     //description : req.query.query
    //     $or: [{description:req.query.query }, {categoria: req.query.query} ]
    // }
    //opt = JSON.parse(req.qurey.query)
  }

  let result = await studentModel.paginate({}, { limit: limit, page: page, lean: true })
  // console.log(result)
  // Result tiene: docs, limit,totalDocs, totalPages, page, pageCounter, hasPrevPage, hasNextPage, prevPage, nextPage
  let students = result.docs


  let nextLink = result.hasNextPage ? `/students?page=${result.nextPage}` : null
  let prevLink = result.hasPrevPage ? `/students?page=${result.prevPage}` : null

  res.render('students', { students, ...result, nextLink, prevLink })

})


module.exports = viewsRouter; 