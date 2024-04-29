const express = require('express');
const CustomError = require('../utils/errorsHandler/CustomError');
const getUserErrorInfo = require('../utils/errorsHandler/info');
const ErrorTypes = require('../utils/errorsHandler/ErrorTypes');
const router = express.Router();

const users = []
let id = 0;


router.post('/login', (req, res) => {
  const { firstName, lastName, email } = req.body;
  if (!firstName || !lastName || !email) {
    throw new CustomError({
      name: 'User creation error',
      cause: getUserErrorInfo({ firstName, lastName, email }),
      message: 'Error creating user',
      code: ErrorTypes.INVALID_TYPE_ERROR
    })
  }
  const user = {
    id: ++id,
    firstName,
    lastName,
    email
  }
  users.push(user);

  res.send({ status: 'success', payload: user })
})

router.post('/loginAsync', async (req, res, next) => {
  try {
    const { firstName, lastName, email } = req.body;
    if (!firstName || !lastName || !email) {
      throw new CustomError({
        name: 'User creation error',
        cause: getUserErrorInfo({ firstName, lastName, email }),
        message: 'Error creating user',
        code: ErrorTypes.INVALID_TYPE_ERROR
      })
    }
    const user = {
      id: ++id,
      firstName,
      lastName,
      email
    }
    users.push(user);

    res.send({ status: 'success', payload: user })
  } catch (error) {
    next(error)
  }
})


module.exports = {
  usersRouter: router
}