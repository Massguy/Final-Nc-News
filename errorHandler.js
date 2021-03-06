exports.handle400 = (err, req, res, next) => {
  if (err.code === '23502' || err.code === '42601' || err.code === '22P02') res.status(400).send({ status: 400, msg: 'Please fill all required fields with correct data' });
  else next(err);
};

exports.handle404 = (err, req, res, next) => {
  if (err.code === '22001' || err.code === 'ENOENT' || err.code === '42703') res.status(404).send({ status: 404, msg: 'Route not found' });
  else next(err);
};

exports.handle405 = (req, res) => res.status(405).send({ status: 405, msg: 'Method Not Allowed!' });

exports.handle422 = (err, req, res, next) => {
  if (err.code === '23505' || err.code === '23503') res.status(422).send({ status: 422, msg: 'Input Incorrect' });
  else next(err);
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send({ status: 500, msg: 'Internal Server Error' });
};
