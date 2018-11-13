const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// identify user inside of cookie to mongoDB
// user.id is the _id var from mongoDB
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// turns token id into user from cookie sent from mongoDB
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    });
});

// tells passport to handle the google passport strategy
passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true // <- tells google to trust the proxy, stops the redirect_uri_mismatch error in runtime
  }, async (accessToken, refreshToken, profile, done) => {
      // prevents mongo from saving more than 1 instance of a user
      const existingUser = await User.findOne({googleId: profile.id})
      if(existingUser){
        // user already exists, dont save new user to mongoDB
        return done(null, existingUser);
      }
      // user doesnt exist, save new user to DB
      const user = await new User({googleId: profile.id}).save();
      done(null, user);
  })
);
