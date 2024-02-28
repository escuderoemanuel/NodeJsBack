require('dotenv').config();
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const mongoose = require('mongoose');
const userModel = require('./models/users');

const searchDocuments = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@mongodbcluster.piysuzj.mongodb.net/indexes`).then(() => {
      console.log('DB Connected Succesfully')
    });

    let result1 = await userModel.find().explain('executionStats');
    console.log(`Consult 1 return ${result1.executionStats.nReturned} elements in ${result1.executionStats.executionTimeMillis} milliseconds`)

    // Without indexing 2 millis. With indexing 0 millis
    let result2 = await userModel.find({ first_name: 'Celia' }).explain('executionStats');
    console.log(`Consult 2 return ${result2.executionStats.nReturned} elements in  ${result2.executionStats.executionTimeMillis} milliseconds`)


    let result3 = await userModel.find({ first_name: 'Celia' }).explain('executionStats');
    console.log(`Consult 3 return ${result3.executionStats.nReturned} elements in ${result3.executionStats.executionTimeMillis} milliseconds`)

  }
  catch (error) {
    console.log(error)
  }

}

searchDocuments();