const nodemailer = require('nodemailer');
const { GMAIL_SERVICE, GMAIL_PORT, GMAIL_AUTH_USER, GMAIL_AUTH_KEY } = require('../config/environment.config');

const transporter = nodemailer.createTransport({
  service: GMAIL_SERVICE,
  port: GMAIL_PORT,
  auth: {
    user: GMAIL_AUTH_USER,
    pass: GMAIL_AUTH_KEY
  }
});

class MailingsService {

  async sendRegisterEmail(destinationEmail) {
    const info = await transporter.sendMail({
      from: authUser,
      // from: GMAIL_AUTH_USER ,
      to: destinationEmail,
      subject: 'Registration Email',
      html: `
        <h1>Welcome to the app 👋</h1>
        <p>🥳 You have successfully registered! 👌</p>
      `
    });
    return info;
  }

  async sendPurchaseEmail(destinationEmail, purchaseInfo) {
    const info = await transporter.sendMail({
      from: GMAIL_AUTH_USER,
      to: destinationEmail,
      subject: 'Purchase Email',
      html: `
        <h1>Thanks for your purchase 👋</h1>
        <p>🥳 You have successfully purchased the following products: 👌</p>
        <br/>
        <p>${ticketCode}</p>
        <ul>
          ${purchaseInfo.map(product => `
          <li>${product.title}</li>
          <li>Price: ${product.price}</li>
          <li>Quantity: ${product.quantity}</li>
          <li>Total: ${product.quantity * product.price}</li>
          <br/>
          `).join('')}
        </ul>`
    })
  }
}

module.exports = MailingsService;