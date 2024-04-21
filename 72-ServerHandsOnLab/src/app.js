const express = require('express');
const { PORT, MONGO_URL } = require('./config/config');
const mongoose = require('mongoose');
const BusinessRouter = require('./routes/business.router');
const UsersRouter = require('./routes/users.router');
const OrderRouter = require('./routes/orders.router')
const cors = require('cors');

const app = express();

mongoose.connect(MONGO_URL).then(() => {
  console.log('Connected to MongoDB')
});

/* Middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/* Routes */
app.use('/api/business', BusinessRouter);
app.use('/api/users', UsersRouter)
app.use('/api/orders', OrderRouter)


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});