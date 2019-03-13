const articlesRouter = require('express').Router();
const { fetchArticles } = require('../controllers/articleController');

articlesRouter.route('/').get(fetchArticles);

module.exports = articlesRouter;
