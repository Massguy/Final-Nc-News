const articlesRouter = require('express').Router();
const {
  fetchArticles, sendingArticles,
  fetchArticleById, updateById,
  deleteById, getCommentById, sendComments,
} = require('../controllers/articleController');

articlesRouter.route('/').get(fetchArticles);
articlesRouter.route('/').post(sendingArticles);
articlesRouter.route('/:article_id').get(fetchArticleById);
articlesRouter.route('/:article_id').patch(updateById);
articlesRouter.route('/:article_id').delete(deleteById);
articlesRouter.route('/:article_id/comments').get(getCommentById);
articlesRouter.route('/:article_id/comments').post(sendComments);

module.exports = articlesRouter;
