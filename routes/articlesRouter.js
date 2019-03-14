const articlesRouter = require('express').Router();
const {
  fetchArticles, sendingArticles, fetchArticleById, updateById,
} = require('../controllers/articleController');

articlesRouter.route('/').get(fetchArticles);
articlesRouter.route('/').post(sendingArticles);
articlesRouter.route('/:article_id').get(fetchArticleById);
articlesRouter.route('/:article_id').patch(updateById);

module.exports = articlesRouter;
