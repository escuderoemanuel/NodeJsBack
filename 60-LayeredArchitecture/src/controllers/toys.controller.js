const getToys = (req, res) => {
  res.send({ status: 'success', message: 'Getting all toys' })
}
const getToyById = (req, res) => {
  res.send({ status: 'success', message: 'Getting a toy' })
}
const createToy = (req, res) => {
  res.send({ status: 'success', message: 'Creating a toy' })
}
const updateToy = (req, res) => {
  res.send({ status: 'success', message: 'Updating a toy' })
}
const deleteToy = (req, res) => {
  res.send({ status: 'success', message: 'deleting a toy' })
}

module.exports = {
  getToys,
  getToyById,
  createToy,
  updateToy,
  deleteToy
}