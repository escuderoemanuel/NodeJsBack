require('dotenv').config();
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const mongoose = require('mongoose');
const orderModel = require('./models/order');
const studentModel = require('./models/student');
const orderData = require('./data/orderData');
const studentData = require('./data/studentsData');


const consultDb = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@mongodbcluster.piysuzj.mongodb.net/`).then(() => {
      console.log('DB Connected Succesfully')
    });

    let result;

    //! ORDERS!!!
    /* 
    // insert
    result = await orderModel.insertMany(orderData)
    result = await orderModel.find()

    result = await orderModel.aggregate([
      // Esto sería el primer stage
      {
        $match: { name: 'Vegan' },
        $match: { quantity: 10 },
        $match: { size: 'medium' },
        // Necesita ser una instancia de ObjectId
        $match: { _id: new mongoose.Types.ObjectId('65dfd3c6d0351989aa6b9896') }
      },
      // Esto sería el segundo stage
      {
        $group: { _id: '$name', totalQuantity: { $sum: '$quantity' } },
        $group: { _id: '$size', totalQuantity: { $sum: '$quantity' } },
        $group: { _id: '$name', totalQuantity: { $sum: '$quantity' } }
      },
      {
        $sort: { totalQuantity: -1 }, // Desc
        $sort: { totalQuantity: 1 }, // Asc
      },
      {
        $group: { _id: 1, orders: { $push: { _id: '$_id',totalQuantity: '$totalQuantity', } }  },
        $group: {
          _id: 1, orders: {
            $push: '$$ROOT' // ROOT toma todas las propiedades que tenga
          }
        }
      },
      {
        $project: {
          _id: 0,
          orders: '$orders'
        }
      }
    ]) */

    //! STUDENTS!!!

    // result = await studentModel.insertMany(studentData)

    // result = await studentModel.find().count()

    //! Agregations
    //? 1. Agrupar por nota, en orden del mejor al peor
    /* result = await studentModel.aggregate([
      {
        $group: {
          _id: '$grade',
          students: {
            $push: '$$ROOT' // ROOT toma todas las propiedades que tenga
          }
        }
      },
      {
        $sort: {
          _id: -1,
        }
      }
    ])
    console.log('result', JSON.stringify(result, null, 2))
     */

    //? 2. Obtener a los estudiantes agrupados por grupo.
    /* result = await studentModel.aggregate([
      {
        $group: {
          _id: '$group',
        }
      }
    ])
    console.log('result', JSON.stringify(result, null, 2)) */


    //? 3. Obtener el promedio de los estudiantes del grupo 1B
    /* result = await studentModel.aggregate([
      {
        $match: { group: '1B' } // Filtrar por grupo 1B
      },
      {
        $group: {
          _id: '1B', average: { $avg: '$grade' }
        }
      }
    ])
    console.log('result', JSON.stringify(result, null, 2)) */

    //? 4. Obtener el promedio de los estudiantes del grupo 1A
    /* result = await studentModel.aggregate([
      {
        $match: { group: '1A' } // Filtrar por grupo 1B
      },
      {
        $group: {
          _id: '1A', average: { $avg: '$grade' }
        }
      }
    ])
    console.log('result', JSON.stringify(result, null, 2)) */
    //? 5. Obtener el promedio general de los estudiantes.
    /* result = await studentModel.aggregate([
      {
        $group: {
          _id: 'General Average', average: { $avg: '$grade' }
        }
      }
    ])
    console.log('result', JSON.stringify(result, null, 2)) */
    //? 6. Obtener el promedio de calificación de los hombres.
    /* result = await studentModel.aggregate([
      {
        $match: { gender: 'Male' } // Filtrar por grupo 1B  
      },
      {
        $group: {
          _id: 'Male', average: { $avg: '$grade' }
        }
      }
    ])
    console.log('result', JSON.stringify(result, null, 2)) */
    //? 7. Obtener el promedio de calificación de las mujeres.
    /* result = await studentModel.aggregate([
      {
        $match: { gender: 'Female' } // Filtrar por grupo 1B  
      },
      {
        $group: {
          _id: 'Female', average: { $avg: '$grade' }
        }
      }
    ])
    console.log('result', JSON.stringify(result, null, 2)) */


  }
  catch {
    console.log('DB Connection Failed')
  }
}

consultDb();