const ToysService = require("../services/toys.service")

const toysService = new ToysService();


const getToys = (req, res) => {
  const payload = toysService.getAll()
  res.send({ status: 'success', message: 'Getting all toys', payload })
}

const getToyById = (req, res) => {
  const id = parseInt(req.params.id)
  const payload = toysService.getById(id)
  res.send({ status: 'success', message: 'Getting a toy', payload })
}

const createToy = (req, res) => {
  const payload = toysService.create(req.body)
  res.status(201).send({ status: 'success', message: 'Creating a toy', payload })
}

const updateToy = (req, res) => {
  const id = parseInt(req.params.id)
  const payload = toysService.update(id, req.body)
  res.send({ status: 'success', message: 'Updating a toy', payload })
}

const deleteToy = (req, res) => {
  const id = parseInt(req.params.id)
  const payload = toysService.delete(id)
  res.send({ status: 'success', message: 'Removed toy', payload })
}

module.exports = {
  getToys,
  getToyById,
  createToy,
  updateToy,
  deleteToy
}