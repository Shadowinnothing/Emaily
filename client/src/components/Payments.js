// stripe wrapper to accept payments from users

import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';

class Payments extends Component {

  /* amount is $ we want user to pay, need to specify USD in pennies
  token expects callback that is called after we connect to the stripe api */
  render() {

    return (
      <StripeCheckout
        amount={500}
        token={(token) => {
          console.log('Token:', token);
        }}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      />
    );
  };
};

export default Payments;
