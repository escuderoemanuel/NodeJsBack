import cluster from 'cluster';
import { cpus } from 'os';
import express from 'express';

const numerosDeProcesadores = cpus().length;
// console.log(numerosDeProcesadores)

if (cluster.isPrimary) {
  console.log('Proceso primario, generando proceso trabajador.')
  for (let i = 0; i < numerosDeProcesadores; i++) {
    cluster.fork();
  }

  /* cluster.on('message', (worker, message) => {
    console.log('first', worker.process.pid, message)
  }) */

} else {
  const port = 8080;
  app.get('/', (req, res) => {
    res.send({ status: 'success', message: 'Petición atendida por un proceso worker...' })
  })

  app.listen(port, () => {
    `Running on port ${port} pid ${process.pid}`
  })

}

// console.log(cluster.isPrimary)
// En proceso
// Ver clase pendiente