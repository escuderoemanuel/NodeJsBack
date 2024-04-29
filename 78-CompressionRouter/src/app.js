const express = require('express');
const { compressionRouter } = require('./routes/compression.router');
const compression = require('express-compression');

const port = 8080
const app = express();
app.use(compressionRouter);

/* Middleware */
// app.use(compression())
app.use(compression({
  threshold: 5000000, // bytes
  brotli: { enable: true, zlib: {} }
}))

app.use('/api/compression', compressionRouter)




app.listen(port, () => console.log(`Listening on port ${port}`));

