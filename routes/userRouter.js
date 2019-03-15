const usersRouter = require('express').Router();
const { getUsers, sendUser, getByUsername } = require('../controllers/usersController');

usersRouter.route('/').get(getUsers);
usersRouter.route('/').post(sendUser);
usersRouter.route('/:username').get(getByUsername);

module.exports = usersRouter;
