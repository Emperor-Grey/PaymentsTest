import Stripe from 'stripe';

const stripePublishableKey = '';
const stripeSecretKey = '';

export const createPayments = async (req, res) => {
  const { email, currency, amount } = req.body;
  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2024-06-20', // use 2020-08-27 if the latest date doesn't work
  });

  const customer = await stripe.customers.create({ email });

  const params = {
    customer: customer.id,
    amount: parseInt(amount) * 100,
    currency,
    payment_method_options: {
      card: {
        request_three_d_secure: 'automatic',
      },
    },
    payment_method_types: [],
  };

  try {
    const paymentIntent = await stripe.paymentIntents.create(params);
    return res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error(err);
    return res.send({
      error: err.raw.message,
    });
  }
};
