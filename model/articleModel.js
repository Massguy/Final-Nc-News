const connection = require('../db/connection');

exports.getArticles = (whereConditions, sort_by = 'article_id', order = 'desc') => connection
  .select(
    'article.article_id',
    'article.created_at',
    'article.title',
    'article.topic',
    'article.votes',
    'article.author',
  )
  .count('comment.article_id as comment_count')
  .from('article')
  .where(whereConditions)
  .leftJoin('comment', 'article.article_id', '=', 'comment.article_id')
  .groupBy('article.article_id')
  .orderBy(sort_by || 'article.created_at', order || 'desc');

exports.sendArticles = formattedArticle => connection('article').insert(formattedArticle).returning('*');


exports.getArticleById = article_id => connection.select('*')
  .from('article')
  .where({ article_id });
