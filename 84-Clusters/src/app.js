import cluster from 'cluster';
import { cpus } from 'os';


const numerosDeProcesadores = cpus().length;
// console.log(numerosDeProcesadores)

if (cluster.isPrimary) {
  console.log('Proceso primario, generando proceso trabajador.')
  for (let i = 0; i < numerosDeProcesadores; i++) {
    cluster.fork();
  }
} else {
  console.log('Proceso forkeado. isPrimary es false. Entonces soy un "worker"!')
  console.log(`Soy un proceso worker con el id: ${process.pid}`)

  app.get('/', (req, res) => {
    res.send({ status: 'success', message: 'Petición atendida por un proceso worker...' })
  })

  app.listen(8080, () => {
    'Listening on port 8080'
  })

}

console.log(cluster.isPrimary)
// En proceso