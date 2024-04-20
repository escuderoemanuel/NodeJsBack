const express = require('express');
const { PORT } = require('./config/config');
const { contactsRouter } = require('./routes/contacts.router');
const { productsRouter } = require('./routes/products.router');

const app = express();

/* Middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/contacts', contactsRouter);
app.use('/api/products', productsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});