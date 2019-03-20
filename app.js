const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());

const apiRouter = require('./routes/apiRouter');

app.use('/api', apiRouter);
const {
  handle400,
  handle404,
  handle422,
  handle500,
} = require('./errorHandler.js');

app.all('/*', (req, res, next) => {
  res.status(404).send({ msg: 'Route not found' });
});

app.use(handle400);
app.use(handle404);
app.use(handle422);
app.use(handle500);
module.exports = app;
