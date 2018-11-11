const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// identify user inside of cookie from mongoDB
// user.id is the _id var from mongoDB
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// tells passport to handle the google passport strategy
passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
    // prevents mongo from saving more than 1 instance of a user
    User.findOne({googleId: profile.id})
      .then((existingUser) => {
        if(existingUser){
          // user already exists
          done(null, existingUser);
        } else {
          // save new user to DB
          new User({googleId: profile.id})
            .save()
            .then((user) => done(null, user))
            .catch((err) => console.log('[passport.js] error with mongoDB'));
        }
      })
      .catch((err) => console.log('[passport.js] error with mongoDB'));
  })
);
