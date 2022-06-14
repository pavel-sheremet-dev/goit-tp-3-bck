const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { getEnv } = require('./src/config');
const { usersRouter, trainingsRouter, booksRouter } = require('./src/routes');


const mongoose = require("mongoose");

const CORS = getEnv().CORS ?? '*';

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(express.json());
app.use(cors({ origin: CORS }));
app.use(morgan(formatsLogger));


app.use('/api/users', usersRouter);
app.use('/api/books', booksRouter);
app.use('/api/trainings', trainingsRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).send({ message: 'Page Not found' });
});

app.use((err, req, res, next) => {
  const statusCode = err.status ?? 500;
  res.status(statusCode).send({ message: err.message });
});



const { DB_HOST } = process.env; 




mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connection successful"))
  .catch((error) => console.log(error.message));
module.exports = app;
