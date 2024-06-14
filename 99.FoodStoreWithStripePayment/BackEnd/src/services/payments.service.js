
const Stripe = require('stripe');
const { STRIPE } = require('../config/config');

class PaymentService {

  constructor() {
    this.stripe = new Stripe(STRIPE.PRIVATE_KEY);
  }

  async createPaymentIntent(paymentInfo) {
    const paymentIntent = this.stripe.paymentIntents.create(paymentInfo);
    return paymentIntent;
  }
}


module.exports = PaymentService; 