const keys = require('../config/keys');
const stripe = require('stripe')(
  keys.stripeSecretKey
);

module.exports = (app) => {
  // recieves token for stripe and create a charge
  app.post('/api/stripe', async (req, res) => {
     const charge = await stripe.charges.create({
       amount: 500, // <- charge in pennies
       currency: 'usd',
       description: '$5 for 5 credits',
       source: req.body.id
     });

     console.log(charge);
  });
};
