
const { json } = require('../model/apiModel');

exports.apiInfo = (req, res, next) => {
  json((err, data) => {
    if (err) {
      next({ msg: 'Not Found' });
    } else {
      res.status(200).json(JSON.parse(data));
    }
  });
};
