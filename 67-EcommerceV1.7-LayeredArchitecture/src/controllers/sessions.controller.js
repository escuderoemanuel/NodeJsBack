const { Router } = require('express');
const UserModel = require('../dao/models/user.model');
const { createHash, isValidPassword } = require('../utils');
const passport = require('passport');
const { generateToken, verifyToken } = require('../utils');


class SessionsController {

  static async createRegister(req, res) {
    passport.authenticate('register', {
      failureRedirect: '/api/sessions/registrationFailed',
      session: false
    }), async (req, res) => {
      res.send({ status: 'success', message: 'Successfully registered user.' });
    }
  }

  static async getRegisterError(req, res) {
    res.status(401).send({ status: 'error', error: 'Registration failed.' });
  }

  static async createLogin(req, res) {
    passport.authenticate('login', {
      failureRedirect: '/api/sessions/loginFailed',
      session: false
    }), async (req, res) => {
      const { _id, firstName, lastName, email, age, role, password, cart } = req.user;
      const serializableUser = {
        id: _id,
        firstName,
        lastName,
        email,
        age,
        role,
        password,
        cart
      }

      const accessToken = generateToken(serializableUser);
      res.cookie('accessToken', accessToken);
      res.send({ status: 'success', message: 'Successfully logged in', payload: accessToken })
    }
  }

  static async getLoginError(req, res) {
    res.status(401).send({ status: 'error', error: 'Login failed' });
  }

  static async getLogout(req, res) {
    res.clearCookie('accessToken');
    res.redirect('/login');
  }

  static async createResetPass(req, res) {
    const { email, password, passwordConfirm } = req.body;
    try {
      if (!email || !password || !passwordConfirm) {
        return res.status(400).send({ error: 'Missing data' });
      }
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }
      // Aquí podría enviar un correo electrónico para resetear la contraseña
      const hashedPassword = createHash(password);
      const result = await UserModel.updateOne(
        { _id: user._id }, {
        $set: { password: hashedPassword }
      });
      res.send({ status: 'success', message: 'Password reset', details: result });
    } catch (error) {
      res.status(500).send({ error: 'Internal server error' });
    }
  }

  static async getGithubAccount(req, res) {
    passport.authenticate('github', { scope: ['user:email'], session: false }), async (req, res) => { }
  }

  static async getGithubAccountCallback(req, res) {
    passport.authenticate('github', { failureRedirect: '/login', session: false }), async (req, res) => {

      const { _id, firstName, lastName, email, age, role, password, cart } = req.user;

      const serializableUser = {
        id: _id,
        firstName,
        lastName,
        email,
        age,
        role,
        password,
        cart
      }
      const accessToken = generateToken(serializableUser);
      res.cookie('accessToken', accessToken);
      res.redirect('/api/products')
    }
  }

  static async getCurrentSession(req, res) {
    const user = req.tokenUser;
    res.send({ payload: user });
  }




}

module.exports = SessionsController;