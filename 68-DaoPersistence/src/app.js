const express = require('express');
const { PORT, MONGO_URL } = require('./config/config');
const mongoose = require('mongoose');
const { contactsRouter } = require('./routes/contacts.router');
const app = express();

mongoose.connect(MONGO_URL).then(() => {
  console.log("Atlas MongoDB Connected");
});

/* Middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/contacts', contactsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});