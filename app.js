const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());

const apiRouter = require('./routes/apiRouter');

app.use('/api', apiRouter);

// app.all('/*', (req, res, next) => {
//   res.status(404).send({ msg: 'Route not found' });
// });
module.exports = app;
