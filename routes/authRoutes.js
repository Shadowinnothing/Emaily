const passport = require('passport');

module.exports = (app) => {
  // starts oauth flow to login user
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account' // <- prompted to select account
  }));

  // after user logs into google, finish oauth and send the user to /surveys
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys')
    }
  );

  // logout user
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/'); // <- redirect back to home page
  });

  // returns user that is currently logged in
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
