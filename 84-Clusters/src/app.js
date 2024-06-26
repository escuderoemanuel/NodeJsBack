import cluster from 'cluster';
import { cpus } from 'os';
import express from 'express';
import exp from 'constants';

const numerosDeProcesadores = cpus().length;
// console.log(numerosDeProcesadores)

if (cluster.isPrimary) {
  console.log('Proceso primario, generando proceso trabajador.')

  for (let i = 0; i < numerosDeProcesadores; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`I've been killed, ${worker.process.pid}`)
    cluster.fork();

  })

} else {
  console.log(`${process.pid} is primary? ${cluster.isPrimary}`)
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

  app.get('/operation/complex', (req, res) => {
    let suma = 0;
    for (let i = 0; i < 50_000_000; i++) {
      suma += i;
    }

    console.log(`${process.pid}: suma: ${suma}`)

    res.send({ status: 'success', payload: suma })
  })

  app.listen(port, () => {
    console.log(`Running on port ${port} pid ${process.pid}`)
  })

}
