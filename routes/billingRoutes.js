const keys = require('../config/keys');
const stripe = require('stripe')(
  keys.stripeSecretKey
);

module.exports = (app) => {
  // recieves token for stripe and
  app.post('/api/stripe', (req, res) => {
     
  });
};
