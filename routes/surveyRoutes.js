const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const _ = require('lodash');
const Path = require('path-parser').default;
const {URL} = require('url');

// dont require the surveySchema.js file to avoid problems
// with importing surveySchema all over the place
const Survey = mongoose.model('surveys');

module.exports = (app) => {
  // app.get('/api/surveys/thanks', (req, res) => {
  //   res.send('Thanks for your feedback!!!');
  // });

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

  // looks at array of events from localtunnel
  app.post('/api/surveys/webhooks', (req, res) => {
    const events = _.map(req.body, ({url, email}) => {
      const pathname = new URL(url).pathname;
      const p = new Path('/api/surveys/:surveyId/:choice');
      const match = p.test(pathname);
      if(match){
        return {email, surveyId: match.surveyId, choice: match.choice};
      }
    });
    // removes 'undefined' and duplicate events
    const compactEvents = _.compact(events);
    const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');

    // tells webhook the email didnt fail so we dont get multiple responses
    res.send({});
  });
};
