
const { endpoints } = require('../endApi.json');


exports.apiInfo = (req, res, next) => {
  res.status(200).json({ endpoints });
};
