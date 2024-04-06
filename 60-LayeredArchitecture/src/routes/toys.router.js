const { Router } = require('express');
const { getToys, getToyById, createToy, updateToy, deleteToy } = require('../controllers/toys.controller');

const router = Router();


// CRUD
router.get('/', getToys)
router.get('/:id', getToyById);
router.post('/', createToy);
router.put('/:id', updateToy);
router.delete('/:id', deleteToy);

module.exports = {
  toysRouter: router // Alias
}