const express = require('express')
const { PORT, GMAIL_SERVICE, GMAIL_PORT, GMAIL_AUTH_USER, GMAIL_AUTH_KEY, mailin: mailing } = require('./config/config')
const nodemailer = require('nodemailer')

const app = express();

const transporter = nodemailer.createTransport({
  service: GMAIL_SERVICE,
  port: GMAIL_PORT,
  auth: {
    user: GMAIL_AUTH_USER,
    pass: GMAIL_AUTH_KEY
  }
})

//console.log(transporter.options)
/* MAILING */
app.get('/email', async (req, res) => {
  const destination = req.query.destination
  console.log('HEREEE')
  try {
    await transporter.sendMail({
      from: `Test by ${mailing.GMAIL_AUTH_USER}`,
      to: destination,
      subject: 'Test',
      html: `OTRO`,
      attachments: [{
        filename: 'image.jpg',
        path: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrkT-wFRDdAXu76PHoEcZtGAmTUpkzenFGnH4AbELYG8NhXE--UD5GYbvob33RhSxEaz8`,
      }]
    })
    res.send('Email sent successfully')
  } catch (error) {
    res.status(500).send({ status: 'error', message: error.message })
  }
})

app.get('/emailWithImage', async (req, res) => {
  const destination = req.query.destination
  try {
    await transporter.sendMail({
      from: `Test by ${mailing.GMAIL_AUTH_USER}`,
      to: destination,
      subject: 'Test',
      html: `OTRO`,
      attachments: [{
        filename: 'image.jpg',
        path: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrkT-wFRDdAXu76PHoEcZtGAmTUpkzenFGnH4AbELYG8NhXE--UD5GYbvob33RhSxEaz8`,
      }]
    })
    res.send('Email with image sent successfully')
  } catch (error) {
    res.status(500).send({ status: 'error', message: error.message })
  }
})

app.get('/emailFromFile', async (req, res) => {
  const destination = req.query.destination
  try {
    await transporter.sendMail({
      from: `Test by ${mailing.GMAIL_AUTH_USER}`,
      to: destination,
      subject: 'Test',
      html: `OTRO`,
      attachments: [{
        filename: 'image.jpg',
        path: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrkT-wFRDdAXu76PHoEcZtGAmTUpkzenFGnH4AbELYG8NhXE--UD5GYbvob33RhSxEaz8`,
      }]
    })
    res.send('Email with image sent successfully')
  } catch (error) {
    res.status(500).send({ status: 'error', message: error.message })
  }
})



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
