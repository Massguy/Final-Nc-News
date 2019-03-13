const topicsRouter = require('express').Router();

const { fetchTopics, sendingTopics } = require('../controllers/topicController');

topicsRouter.route('/').get(fetchTopics);
topicsRouter.route('/').post(sendingTopics);

module.exports = topicsRouter;
