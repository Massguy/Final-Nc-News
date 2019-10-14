const {
  getArticles, sendArticles,
  getArticleById, updateVote,
  removeArticle, checkArticleID,
  fetchCommentsByArticleID,
  sendCom, countComments, getArticleCount,
} = require('../model/articleModel');

exports.fetchArticles = (req, res, next) => {
  const {
    author, topic, sort_by, order, limit, p,
  } = req.query;
  // eslint-disable-next-line no-nested-ternary
  const whereConditions = author && topic
    ? { 'article.author': author, 'article.topic': topic }
    // eslint-disable-next-line no-nested-ternary
    : topic
      ? { 'article.topic': topic }
      : author ? { 'article.author': author } : {};
  Promise.all([getArticles(limit, sort_by, p, order, whereConditions),
    getArticleCount(whereConditions),
  ])
    .then(([articles, articleCount]) => {
      res.status(200).send({ articles, articleCount });
    })
    .catch(err => next(err));
};

exports.sendingArticles = (req, res, next) => {
  const article = req.body;
  sendArticles(article)
    .then(([newArticle]) => {
      res.status(201).send({ article: newArticle });
    })
    .catch(next);
};

exports.fetchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  // eslint-disable-next-line consistent-return
  getArticleById(article_id).then(([article]) => {
    if (!article) return Promise.reject({ code: '22001' });
    return res.status(200).send({ article });
  })
    .catch(next);
};

exports.updateById = (req, res, next) => {
  const { article_id } = req.params;
  let { inc_votes = 0 } = req.body;
  if (typeof inc_votes !== 'number') inc_votes = 0;
  updateVote(article_id, inc_votes)
    .then(([article]) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.deleteById = (req, res, next) => {
  const { article_id } = req.params;
  // eslint-disable-next-line consistent-return
  removeArticle(article_id)
    .then((itemsRemoved) => {
      if (itemsRemoved === 1) res.sendStatus(204);
      else res.status(404).send({ status: 404, msg: 'Sorry, article not found...' });
    })
    .catch(next);
};

exports.getCommentById = (req, res, next) => {
  const { article_id } = req.params;
  const {
    sort_by = 'created_at',
    order = 'desc',
    limit = 10,
    p = 1,
  } = req.query;
  const checkArticle = checkArticleID(article_id);
  const commentsPromise = fetchCommentsByArticleID(article_id, sort_by, order, limit, p);
  const commentsCount = countComments();
  return Promise.all([checkArticle, commentsPromise, commentsCount])
    .then(([check, comments, total_comments]) => {
      if (check.length === 0) return Promise.reject({ code: '22001' });
      return res.status(200).send({ comments, total_comments });
    })
    .catch(next);
};
exports.sendComments = (req, res, next) => {
  const newComment = req.body;
  const { article_id } = req.params;
  const formattedComment = {
    author: newComment.username,
    body: newComment.body,
    article_id,
  };
  sendCom(formattedComment).then(([comment]) => {
    res.status(201).send({ comment });
  })
    .catch(err => next(err));
};
