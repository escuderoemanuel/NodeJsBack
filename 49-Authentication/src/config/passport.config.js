// Credentials
require('dotenv').config();
const CLIENT_ID = process.env.CLIENT_ID;
CALLBACK_URL = process.env.CALLBACK_URL;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

// Imports
const passport = require('passport');
const GithubStrategy = require('passport-github2');
const userModel = require('../models/user');

const initializePassport = () => {

  passport.use('github', new GithubStrategy({
    clientID: CLIENT_ID,
    callbackURL: CALLBACK_URL,
    clientSecret: CLIENT_SECRET,
  }, async (_accessToken, _refreshToken, profile, done) => {
    try {
      console.log('profile', profile)
      done(null, false)
    } catch (error) {
      return done(error)
    }
  }))
}

passport.serializeUser((user, done) => {
  done(null, user._id);
})

passport.deserializeUser(async (userId, done) => {
  let user = await userModel.findOne({ _id: userId });
  done(null, user);
})

module.exports = initializePassport;