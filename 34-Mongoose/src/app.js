require('dotenv').config();
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;

const express = require('express');
const userRouter = require('../routes/users.router');
const port = 8080;
const serverMessage = `Server started on port ${port}`
const mongoose = require('mongoose');



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@mongodbcluster.piysuzj.mongodb.net/`,)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.log(err))



app.use('/api/users', userRouter)


app.listen(port, () => {
  console.log(serverMessage);
})
