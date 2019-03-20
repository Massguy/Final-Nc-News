const usersRouter = require('express').Router();
const { getUsers, sendUser, getByUsername } = require('../controllers/usersController');
const { handle405 } = require('../errorHandler');

usersRouter.route('/')
  .get(getUsers)
  .post(sendUser)
  .all(handle405);

usersRouter.route('/:username')
  .get(getByUsername)
  .all(handle405);


module.exports = usersRouter;
