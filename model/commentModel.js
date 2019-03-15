const connection = require('../db/connection');

exports.changeComment = (comment_id, inc_votes) => connection
  .select('*')
  .from('comment')
  .increment('votes', inc_votes)
  .where({ comment_id })
  .returning('*');

exports.deleteComment = comment_id => connection.from('comment')
  .where({ comment_id })
  .del();
