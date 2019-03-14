const { getArticles, sendArticles, getArticleById } = require('../model/articleModel');

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

exports.sendingArticles = (req, res, next) => {
  const newArticle = req.body;
  const formattedArticle = {
    title: newArticle.title,
    body: newArticle.body,
    topic: newArticle.topic,
    author: newArticle.username,
  };
  sendArticles(formattedArticle).then(([article]) => {
    res.status(201).send({ article });
  });
};

exports.fetchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  // eslint-disable-next-line consistent-return
  getArticleById(article_id).then(([article]) => {
    if (article) res.send({ article });
    else return Promise.reject({ status: 404, msg: 'server error' });
  });
};
