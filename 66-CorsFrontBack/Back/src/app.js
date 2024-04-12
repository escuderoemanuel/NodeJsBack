const express = require('express');
const port = 3000;
const cors = require('cors');

const app = express();
// Luego de instalar cors, se puede usar
// app.use(cors()); //? Se puede usar para todas las rutas
app.use(cors({ origin: ['http://127.0.0.1:5501'] })); //? Se puede usar solamente para la ruta especificada

// Esto sin instalar CORS, da error de CORS porque se consulta una dirección diferente
app.get('/test', (req, res) => {
  res.send({ status: "success" })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
