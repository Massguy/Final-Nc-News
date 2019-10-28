const apiRouter = require('express').Router();

const topicsRouter = require('../routes/topicsRouter');
const articlesRouter = require('../routes/articlesRouter');
const commentsRouter = require('../routes/commentsRouter');

const usersRouter = require('../routes/userRouter');

const { handle405 } = require('../errorHandler');

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/comments', commentsRouter);
apiRouter.use('/users', usersRouter);

apiRouter.route('/')
  .get(articlesRouter)
  .all(handle405);
module.exports = apiRouter;
