const { PORT } = require('./config/environment')
const express = require('express')
const { toysRouter } = require('./routes/toys.router')
const { usersRouter } = require('./routes/users.router')

const app = express()

/* MIDDLEWARES */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
console.log('port', PORT)

/* ROUTES */
app.use('/api/toys', toysRouter)
app.use('/api/users', usersRouter)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`)) 