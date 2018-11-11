const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

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
        } else {
          // save new user to DB
          new User({googleId: profile.id}).save(); // <- save modal instance to DB
        }
      });
    //done(); // <- not sure if needed yet...
  })
);
