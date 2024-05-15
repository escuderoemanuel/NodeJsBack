// db.connection.js
import mongoose from 'mongoose';
import config from './config.js';

const dbConnection = async () => {
  try {
    await mongoose.connect(config.MONGO_URL);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default dbConnection; // Exporta la función dbConnection
