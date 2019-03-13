const connection = require('../db/connection');

exports.getArticles = () => connection
  .select(
    'article.author',
    'article.title',
    'article.article_id',
    'article.topic',
    'article.created_at',
    'article.votes',
  )
  .from('article')
  .groupBy('article.author', 'article.title',
    'article.article_id',
    'article.topic',
    'article.created_at',
    'article.votes')
  .leftJoin('comment', 'article.article_id', 'comment.comment_id')
  .count('comment.comment_id as comment_count');
