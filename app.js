const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { getEnv } = require('./src/config');
const { usersRouter, trainingsRouter, booksRouter } = require('./src/routes');

const CORS = getEnv().CORS ?? '*';

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(express.json());
app.use(cors({ origin: CORS }));
app.use(morgan(formatsLogger));

// app.use(express.static('static'));

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
  // если вылетает 500 ошибка и вы не знаете где она возникла, то 27 строку комментируете, 30 разкомментируте
  // и будет вам видно весь стек ошибки. Ну или пользуйтесь дебагером или как вам удобно
  // res.status(statusCode).send({ message: err.stack });
});

module.exports = app;
