const connection = require('../db/connection');

exports.getTopics = () => connection.select('*').from('topics');

exports.sendTopics = newTopic => connection('topics').insert(newTopic).returning('*');
