const commentsRouter = require('express').Router();
const { updateComment, removeComment } = require('../controllers/commentsController');

commentsRouter.route('/:comment_id').patch(updateComment);
commentsRouter.route('/:comment_id').delete(removeComment);

module.exports = commentsRouter;
