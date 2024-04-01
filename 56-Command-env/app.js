const express = require('express');
const { PORT, ENVIRONMENT, MONGO_URL } = require('./config');


const app = express();


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
