const { Router } = require('express');
const StudentsModel = require('../models/students');
const router = Router();

const students = [
  {
    "name": "John",
    "lastname": "Doe",
    "age": 20,
    "ssn": "123456789",
    "course": "Mathematics",
    "grade": 8
  },
  {
    "name": "Alice",
    "lastname": "Smith",
    "age": 21,
    "ssn": "234567890",
    "course": "Physics",
    "grade": 9
  },
  {
    "name": "Michael",
    "lastname": "Johnson",
    "age": 19,
    "ssn": "345678901",
    "course": "History",
    "grade": 7
  },
  {
    "name": "Emily",
    "lastname": "Brown",
    "age": 22,
    "ssn": "456789012",
    "course": "Biology",
    "grade": 8
  },
  {
    "name": "David",
    "lastname": "Lee",
    "age": 20,
    "ssn": "567890123",
    "course": "Chemistry",
    "grade": 8
  },
  {
    "name": "Sophia",
    "lastname": "Martinez",
    "age": 21,
    "ssn": "678901234",
    "course": "English",
    "grade": 10
  },
  {
    "name": "William",
    "lastname": "Taylor",
    "age": 19,
    "ssn": "789012345",
    "course": "Art",
    "grade": 7
  },
  {
    "name": "Olivia",
    "lastname": "Garcia",
    "age": 20,
    "ssn": "890123456",
    "course": "Computer Science",
    "grade": 9
  },
  {
    "name": "Ethan",
    "lastname": "Anderson",
    "age": 22,
    "ssn": "901234567",
    "course": "Economics",
    "grade": 8
  },
  {
    "name": "Emma",
    "lastname": "Hernandez",
    "age": 21,
    "ssn": "012345678",
    "course": "Geography",
    "grade": 8
  }
]

router.get('/', async (req, res) => {
  try {
    const students = await StudentsModel.find();
    res.send({ status: 'success', students })
  } catch (error) {
    res.status(500).send({ status: 'error', error: error.message })
  }
})

router.post('/', async (req, res) => {
  try {
    await StudentsModel.create(req.body);
    res.send({ status: 'success' })
  } catch (error) {
    res.status(500).send({ status: 'error', error: error.message })
  }
})

router.put('/:sid', async (req, res) => {
  try {
    const { sid } = req.params;
    const { name, lastname, age, ssn, course, grade } = req.body;
    await StudentsModel.updateOne({ _id: sid }, { name, lastname, age, ssn, course, grade });
    res.send({ status: 'success' })
  } catch (error) {
    res.status(500).send({ status: 'error', error: error.message })
  }
})

router.delete('/:sid', async (req, res) => {
  try {
    const { sid } = req.params;
    await StudentsModel.deleteOne({ _id: sid });
    res.send({ status: 'success' })
  } catch (error) {
    res.status(500).send({ status: 'error', error: error.message })
  }
})

// This 'get method' insert the student array in the collection
router.get('/insertStudents', async (req, res) => {
  try {
    const result = await StudentsModel.insertMany(students);
    res.send({ status: 'success', result })
  } catch (error) {
    res.send({ status: 'error', error: error.message })
  }
})

module.exports = router;



















module.exports = router;