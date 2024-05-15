import express from 'express';
import userRouter from './routes/user.router.js';
import config from './config/config.js';
import dbConnection from './config/db.connection.js';

const PORT = config.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRouter);

app.get('/', (req, res) => {
  res.send(`
  <h1>Welcome to our page!</h1>
  `);
});

dbConnection().then(() => { })

const server = app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost${PORT}`);
});

server.on('error', (error) => {
  console.log('error:', error);
});