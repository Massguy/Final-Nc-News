const usersRouter = require('express').Router();
const { getUsers, sendUser } = require('../controllers/usersController');

usersRouter.route('/').get(getUsers);
usersRouter.route('/').post(sendUser);

module.exports = usersRouter;
