const formattingArticleDateTimeStamp = (unformattedArticles) => {
  const timeStampArticles = unformattedArticles.map(article => ({
    title: article.title,
    body: article.body,
    votes: article.votes || 0,
    topic: article.topic,
    author: article.author,
    created_at: new Date(article.created_at),
    article_id: article.article_id,
  }));
  return timeStampArticles;
};


const createRef = (articles) => {
  {
    const format = {};
    articles.forEach((article) => {
      format[article.title] = article.article_id;
    });
    return format;
  }
};

const formattingComments = (unformattedComments, articleRef) => {
  const commentTest = unformattedComments.map(comment => ({
    author: comment.created_by,
    article_id: articleRef[comment.belongs_to],
    votes: comment.votes || 0,
    created_at: new Date(comment.created_at),
    body: comment.body,
    comment_id: comment.comment_id,
  }));
  return commentTest;
};

module.exports = { formattingArticleDateTimeStamp, formattingComments, createRef };
