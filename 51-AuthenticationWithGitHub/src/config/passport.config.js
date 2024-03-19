// Credentials
require('dotenv').config();
const CLIENT_ID = process.env.CLIENT_ID;
const CALLBACK_URL = process.env.CALLBACK_URL;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

// Imports
const passport = require('passport');
const GithubStrategy = require('passport-github2');
const UserModel = require('../dao/models/user.model');

const initializePassport = () => {

  passport.use('github', new GithubStrategy({
    clientID: CLIENT_ID,
    callbackURL: CALLBACK_URL,
    clientSecret: CLIENT_SECRET,
  }, async (_accessToken, _refreshToken, profile, done) => {
    try {
      //console.log('profile', profile)
      const user = await UserModel.findOne({ email: profile._json.email })

      if (!user) {
        const newUser = await UserModel.create({
          firstName: profile._json.name,
          lastName: '',
          age: 0,
          email: profile._json.email,
          password: ''
        })

        let result = await UserModel.create(newUser);
        return done(null, result)

      } else {
        return done(null, user)
      }
    } catch (error) {
      return done(error)
    }
  }))
}

passport.serializeUser((user, done) => {
  done(null, user._id);
})

passport.deserializeUser(async (userId, done) => {
  let user = await UserModel.findOne({ _id: userId });
  done(null, user);
})

module.exports = initializePassport;