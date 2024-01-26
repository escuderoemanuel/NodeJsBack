import express from 'express';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import usersRouter from './routes/users.router.js';
import __dirname from './utils.js';


// Server
const app = express();
const port = 8080;
const serverMessage = `Server running on port ${port}`;

// Express
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');


app.use('/', viewsRouter)
app.use('/api/users', usersRouter)


app.listen(port, () => console.log(serverMessage));
