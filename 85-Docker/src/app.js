import express from 'express';
const port = 8080;
const app = express();

app.get('/operation/simple', (req, res) => {
  let suma = 0;
  for (let i = 0; i < 1_000_000; i++) {
    suma += i;
  }

  console.log(`${process.pid}: suma: ${suma}`)

  res.send({ status: 'success', payload: suma })
})

app.listen(port, () => {
  console.log(`Running on port ${port} pid ${process.pid}`)
})


