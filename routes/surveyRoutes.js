const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

// dont require the surveySchema.js file to avoid problems
// with importing surveySchema all over the place
const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
    const {title, subject, body, recipients} = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      // splits emails up and returns an array of objects
      recipients: recipients.split(',').map((email) => ({email: email.trim()})),
      _user: req.user.id,
      dateSent: Date.now()
    });
  });
};
