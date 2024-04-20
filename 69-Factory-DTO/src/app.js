const express = require('express');
const { PORT } = require('./config/config');
const { contactsRouter } = require('./routes/contacts.router');

const app = express();

/* Middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/contacts', contactsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});