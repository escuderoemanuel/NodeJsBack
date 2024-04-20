const express = require('express');
const { PORT } = require('./config/config');
const BusinessRouter = require('./routes/business.router');
const UsersRouter = require('./routes/users.router');
const OrderRouter = require('./routes/orders.router')

const app = express();

/* Middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Routes */
app.use('/api/business', BusinessRouter);
app.use('/api/users', UsersRouter)
app.use('/api/orders', OrderRouter)


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});