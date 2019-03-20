const { getTopics, sendTopics } = require('../model/topicModel');

exports.fetchTopics = (req, res, next) => {
  getTopics().then((topics) => {
    res.status(200).send({ topics });
  })
    .catch(next);
};

exports.sendingTopics = (req, res, next) => {
  const newTopic = req.body;
  sendTopics(newTopic).then(([topic]) => {
    res.status(201).send({ topic });
  })
    .catch(next);
};
