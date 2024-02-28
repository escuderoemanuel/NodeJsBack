require('dotenv').config();
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const mongoose = require('mongoose');
const userModel = require('./models/users');
const studentModel = require('./models/students');
const courseModel = require('./models/courses');

const searchDocuments = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@mongodbcluster.piysuzj.mongodb.net/indexes`).then(() => {
      console.log('DB Connected Succesfully')
    });

    //let result1 = await userModel.find().explain('executionStats');
    //console.log(`Consult 1 return ${result1.executionStats.nReturned} elements in ${result1.executionStats.executionTimeMillis} milliseconds`)

    // Without indexing 2 millis. With indexing 0 millis
    //let result2 = await userModel.find({ first_name: 'Celia' }).explain('executionStats');
    //console.log(`Consult 2 return ${result2.executionStats.nReturned} elements in  ${result2.executionStats.executionTimeMillis} milliseconds`)

    /* await studentModel.create({
      first_name: 'Emanuel',
      last_name: 'Escudero',
      email: 'em@gmail.com',
      gender: 'male',
    })
 */
    // CourseID: 65dfb109b81120d6d8f944d5
    /* let resultCourse = await courseModel.create({
      title: 'Backend Programming',
      description: 'Learn to code',
      difficulty: 7,
      topics: ['Express', 'NodeJs', 'MongoDB'],
      teacher: 'Jane Doe',
    }) */

    /*  const students = await studentModel.find({ _id: '65dfb1bf9f65443f6c276d64' })
     students[0].courses.push({ course: '65dfb109b81120d6d8f944d5' })
     let studentResult = await studentModel.updateOne({ _id: '65dfb1bf9f65443f6c276d64' }, students[0])
     console.log(studentResult) */

    const result = await studentModel.find({ _id: '65dfb1bf9f65443f6c276d64' })
    console.log(JSON.stringify(result, null, 2))

  }

  catch (error) {
    console.log(error)
  }

}

searchDocuments();