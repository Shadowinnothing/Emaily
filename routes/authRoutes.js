const passport = require('passport');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send({hi: 'this is just a test'});
  });

  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  app.get('/auth/google/callback', passport.authenticate('google'));

  // logout user
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });

  // returns user that is currently logged in
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
