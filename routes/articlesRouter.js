const articlesRouter = require('express').Router();
const {
  fetchArticles, sendingArticles,
  fetchArticleById, updateById,
  deleteById, getCommentById, sendComments,
} = require('../controllers/articleController');
const { handle405 } = require('../errorHandler');

articlesRouter.route('/')
  .get(fetchArticles)
  .post(sendingArticles)
  .all(handle405);


articlesRouter.route('/:article_id')
  .get(fetchArticleById)
  .patch(updateById)
  .delete(deleteById)
  .all(handle405);

articlesRouter.route('/:article_id/comments')
  .get(getCommentById)
  .post(sendComments)
  .all(handle405);

module.exports = articlesRouter;
