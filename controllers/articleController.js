const { getArticles } = require('../model/articleModel');

exports.fetchArticles = (req, res, next) => {
  getArticles().then((article) => {
    res.status(200).send({ article });
  });
};
