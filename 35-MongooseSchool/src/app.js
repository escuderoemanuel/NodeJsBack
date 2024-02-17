require('dotenv').config();
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;

const express = require('express');
const studentsRouter = require('../routes/students.router');
const mongoose = require('mongoose');
const PORT = 8080;
const serverMessage = `Server is running on port ${PORT}`;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Replace with your MongoDB Atlas connection data
mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@mongodbcluster.piysuzj.mongodb.net/`)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.log(err))

// Endpoint
app.use('/api/students', studentsRouter);

app.listen(PORT, () => {
  console.log(serverMessage)
}) 