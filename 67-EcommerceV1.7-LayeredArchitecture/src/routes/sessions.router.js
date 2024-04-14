const { Router } = require('express');
const UserModel = require('../dao/models/user.model');
const { createHash, isValidPassword } = require('../utils');
const passport = require('passport');
const { generateToken, verifyToken } = require('../utils');
const SessionsController = require('../controllers/sessions.controller');
const sessionRouter = Router();

//? Register
sessionRouter.post('/register', SessionsController.createRegister);

sessionRouter.get('/registrationFailed', SessionsController.getRegisterError)

//? Login
sessionRouter.post('/login', SessionsController.createLogin)

sessionRouter.get('/loginFailed', SessionsController.getLoginError)

//? Logout
sessionRouter.get('/logout', SessionsController.getLogout)


//? Reset Password
sessionRouter.post('/resetPassword', SessionsController.createResetPass)

//? GITHUB
sessionRouter.get('/github', SessionsController.getGithubAccount)

sessionRouter.get('/githubcallback', SessionsController.getGithubAccountCallback);

//? Current
sessionRouter.get('/current', verifyToken, SessionsController.getCurrentSession)

module.exports = sessionRouter;
