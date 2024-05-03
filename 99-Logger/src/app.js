const express = require('express');
const addLogger = require('./middlewares/addLogger.middleware');
const {loggerTestsRouter} = require('./routes/loggerTest.router');
const { performanceRouter } = require('./routes/performance.router');
const { sessionsRouter } = require('./routes/sessions.router');
const { usersRouter } = require('./routes/users.router');
const port = 8080;
const mongoose = require('mongoose');
const { mongoUrl } = require('./config/config');

mongoose.connect(mongoUrl).then(()=>{
    console.log('connected to db')
})
const app = express();
app.use(addLogger)
app.use(express.json())
app.use(express.urlencoded({extended:true}))


/** ROUTES */
app.use('/api/logger', loggerTestsRouter)
app.use('/api/performance', performanceRouter)

app.use("/api/sessions", sessionsRouter);
app.use("/api/users", usersRouter);



app.listen(port, ()=>console.log(`Up and running on port ${port}`))