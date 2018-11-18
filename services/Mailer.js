const sendgrid = require('sendgrid');
const helper = sendgrid.mail; // format email to work correctly
const keys = require('../config/keys');

class Mailer extends helper.Mail {

  // const mailer = new Mailer(survey, surveyTemplate(survey));
  constructor({subject, recipients}, content) {
    super();

    // sendgrid setup
    this.from_email = new helper.Email('no-reply@emaily.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    this.addContent(this.body); // <- addContent() is from helper.Mail
    this.addClickTracking();
    this.addRecipients();
  };

  // format the array of objects into working emails
  formatAddresses(recipients) {
    return recipients.map(({email}) => {
      return new helper.Email(email);
    });
  };

  // helps sendgrid identify each unique user
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  };

  // takes and processes recipients
  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach((recipient) => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  };

};

module.exports = Mailer;
