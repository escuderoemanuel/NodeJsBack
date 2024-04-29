const express = require('express');
const { compressionRouter } = require('./routes/compression.router');
const compression = require('express-compression');
const { usersRouter } = require('./routes/users.router');
const errorHandler = require('./middlewares/errorHandler');

const port = 8080
const app = express();
app.use(compressionRouter);

/* Middleware */
// app.use(compression())
app.use(compression({
  threshold: 5000000, // bytes
  brotli: { enable: true, zlib: {} }
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/compression', compressionRouter)
app.use('/api/users', usersRouter)




app.listen(port, () => console.log(`Listening on port ${port}`));


// El custom error debe ir siempre al final!
app.use(errorHandler)