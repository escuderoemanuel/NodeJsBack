const { PORT } = require('./config/environments')
const express = require('express')

const app = express()


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))