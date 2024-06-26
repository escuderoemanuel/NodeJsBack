const PaymentService = require("../services/payments.service")

const mockCart = [
  { id: 1, name: "papas", price: 1000 },
  { id: 2, name: "queso", price: 500 },
  { id: 3, name: "hamburguesa", price: 1500 },
  { id: 4, name: "soda", price: 1000 },
  { id: 5, name: "golosinas", price: 800 }
]

const paymentService = new PaymentService();

class PaymentsController {
  static async makePaymentIntent(req, res) {
    const requestedProduct = mockCart.find(product => product.id === parseInt(req.query.id))
    if (!requestedProduct) res.status(404).send({ status: 'error', error: 'product not found' })

    /** METADATOS */
    const metadata = {
      userId: 'autogenerated by mongodb',
      orderDetails: JSON.stringify({ [requestedProduct.name]: 1 }, null, '\t'),
      adress: JSON.stringify({
        street: 'fake street',
        postalCode: 123123,
        phoneNumber: '123123213'
      }, null, '\t')
    }

    const paymentInfo = {
      amount: requestedProduct.price,
      currency: 'USD',
      metadata
    }

    let result = await paymentService.createPaymentIntent(paymentInfo)
    console.log(result)
    res.send({ status: 'success', payload: result })
  }
}

module.exports = PaymentsController; 