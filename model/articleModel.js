const connection = require('../db/connection');

exports.getArticles = (limit = 10, sort_by = 'created_at', p, order = 'desc', whereConditions) => connection
  .select(
    'article.article_id',
    'article.created_at',
    'article.title',
    'article.topic',
    'article.votes',
    'article.author',
    'article.body',
  )
  .count('comment.article_id as comment_count')
  .from('article')
  .where(whereConditions)
  .leftJoin('comment', 'article.article_id', '=', 'comment.article_id')
  .groupBy('article.article_id')
  .orderBy(sort_by || 'article.created_at', order || 'desc')
  .limit(limit, p)
  .offset((p - 1) * limit)
  .orderBy(sort_by, order);

exports.getArticleCount = conditions => connection('article')
  .where(conditions)
  .count('article_id')
  .then(([{ count }]) => +count);

exports.sendArticles = article => connection('article').insert(article).returning('*');


exports.getArticleById = article_id => connection.select('*')
  .from('article')
  .where({ article_id });

exports.updateVote = (article_id, inc_votes) => connection.from('article')
  .increment('votes', inc_votes)
  .where({ 'article.article_id': article_id })
  .returning('*');

exports.removeArticle = article_id => connection.from('article')
  .where({ 'article.article_id': article_id })
  .del();

exports.checkArticleID = id => connection('article')
  .select('article_id')
  .where('article_id', id)
  .returning('*');

exports.fetchCommentsByArticleID = (id, sort_by, order, limit, p) => connection('comment')
  .select('comment_id', 'votes', 'created_at', 'author', 'body')
  .where('article_id', id)
  .offset((p - 1) * limit)
  .orderBy(sort_by, order)
  .limit(limit);

exports.countComments = () => connection('comment')
  .count('comment_id')
  .then(([{ count }]) => +count);

exports.sendCom = formattedComment => connection('comment').insert(formattedComment).returning('*');
