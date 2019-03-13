const { getArticles } = require('../model/articleModel');

exports.fetchArticles = (req, res, next) => {
  const {
    author, topic, sort_by, order,
  } = req.query;
  // eslint-disable-next-line no-nested-ternary
  const whereConditions = author
    ? { 'article.author': author }
    : topic
      ? { 'article.topic': topic }
      : {};
  Promise.all([
    getArticles(whereConditions, sort_by, order),
  ])
    .then(([articles]) => {
      res.status(200).send({ articles });
    });
};
