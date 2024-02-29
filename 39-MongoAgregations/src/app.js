require('dotenv').config();
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const mongoose = require('mongoose');
const orderModel = require('./models/order');
const orderData = require('./data/orderData');

const consultDb = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@mongodbcluster.piysuzj.mongodb.net/`).then(() => {
      console.log('DB Connected Succesfully')
    });

    let result;

    // insert
    // result = await orderModel.insertMany(orderData)

    // result = await orderModel.find()

    result = await orderModel.aggregate([
      // Esto sería el primer stage
      {
        //$match: { name: 'Vegan' }
        //$match: { quantity: 10 }
        $match: { size: 'medium' }
        // Necesita ser una instancia de ObjectId
        // $match: { _id: new mongoose.Types.ObjectId('65dfd3c6d0351989aa6b9896') }
      }
      ,
      // Esto sería el segundo stage
      {
        // $group: { _id: '$name', totalQuantity: { $sum: '$quantity' } }
        //$group: { _id: '$size', totalQuantity: { $sum: '$quantity' } }
        $group: { _id: '$name', totalQuantity: { $sum: '$quantity' } }
      },
      {
        $sort: { totalQuantity: -1 }, // Desc
        // $sort: { totalQuantity: 1 }, // Asc
      },
      {
        /* $group: {
          _id: 1, orders: {
            $push: {
              _id: '$_id',
              totalQuantity: '$totalQuantity',
            }
          }
        }, */
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

    ])

    console.log('result', JSON.stringify(result, null, 2))
  }
  catch {
    console.log('DB Connection Failed')
  }
}

consultDb();