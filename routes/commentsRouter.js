const commentsRouter = require('express').Router();
const { updateComment, removeComment } = require('../controllers/commentsController');

const { handle405 } = require('../errorHandler');

commentsRouter.route('/:comment_id')
  .patch(updateComment)
  .delete(removeComment)
  .all(handle405);

module.exports = commentsRouter;
