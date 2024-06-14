const express = require('express');
const { PORT } = require('./config/config.js');
const cors = require('cors');
const { paymentsRouter } = require('./routes/payments.router.js');

const app = express();

app.use(cors());

app.use('/api/payments', paymentsRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});