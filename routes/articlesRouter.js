const articlesRouter = require('express').Router();
const { fetchArticles, sendingArticles, fetchArticleById } = require('../controllers/articleController');

articlesRouter.route('/').get(fetchArticles);
articlesRouter.route('/').post(sendingArticles);
articlesRouter.route('/:article_id').get(fetchArticleById);

module.exports = articlesRouter;
