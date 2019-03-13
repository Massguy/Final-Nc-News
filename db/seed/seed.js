const {
  userData, topicData, articleData, commentData,
} = require('../data');

const { formattingArticleDateTimeStamp, formattingComments, createRef } = require('../utils');

exports.seed = function (knex, Promise) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex('topics')
      .insert(topicData)
      .returning('*'))
    .then(() => knex('users')
      .insert(userData)
      .returning('*'))
    .then(() => knex('article')
      .insert(formattingArticleDateTimeStamp(articleData))
      .returning('*'))
    .then(((articleRows) => {
      const articleRef = createRef(articleRows, 'article_id');
      const formattedComment = formattingComments(commentData, articleRef);
      const commentInsertions = knex('comment')
        .insert(formattedComment)
        .returning('*');
      return Promise.all([articleRows, commentInsertions]);
    }));
};
