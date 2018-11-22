const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

// dont require the surveySchema.js file to avoid problems
// with importing surveySchema all over the place
const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for your feedback!!!');
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
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

    try {
      // Send email here
      const mailer = new Mailer(survey, surveyTemplate(survey));
      await mailer.send();
      // save survey and user to DB
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch(err) {
      res.send(422).send(err); // <- unable to process
    }

  });

  app.post('/api/surveys/webhooks', (req, res) => {
    console.log(req.body);
    res.send({});
  });
};
