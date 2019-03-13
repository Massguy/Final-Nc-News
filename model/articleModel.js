const connection = require('../db/connection');

exports.getArticles = () => connection.select('article.title', 'article.article_id', 'article.topic', 'article.created_at', 'article.votes').from('article');
