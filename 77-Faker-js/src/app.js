const express = require('express');
const { PORT } = require('./config/environment.config');
const { usersRouter } = require('./routes/users.router');

const app = express();


app.use('/api/users', usersRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})