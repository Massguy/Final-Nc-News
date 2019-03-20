const topicsRouter = require('express').Router();

const { fetchTopics, sendingTopics } = require('../controllers/topicController');
const { handle405 } = require('../errorHandler');

topicsRouter.route('/')
  .get(fetchTopics)
  .post(sendingTopics)
  .all(handle405);

module.exports = topicsRouter;
