const commentsRouter = require('express').Router();
const { updateComment } = require('../controllers/commentsController');

commentsRouter.route('/:comment_id').patch(updateComment);

module.exports = commentsRouter;
