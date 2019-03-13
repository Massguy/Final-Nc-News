const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());

const apiRouter = require('./routes/apiRouter');

app.use('/api', apiRouter);

// app.all('/*', (req, res, next) => {
//   res.status(404).send({ msg: 'Route not found' });
// });

// app.use((err, req, res, next) => {
//   // eslint-disable-next-line no-console
//   console.log('err');
//   res.status(500).send({ msg: 'Internal server error' });
// });
module.exports = app;
