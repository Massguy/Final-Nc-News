const { fetchUsers, sendingUser, gatherUser } = require('../model/usersModel');

exports.getUsers = (req, res, next) => {
  fetchUsers().then((users) => {
    res.status(200).send({ users });
  })
    .catch(next);
};

exports.sendUser = (req, res, next) => {
  const newUser = req.body;
  sendingUser(newUser).then(([users]) => {
    res.status(201).send({ users });
  });
};

exports.getByUsername = (req, res, next) => {
  const { username } = req.params;
  // eslint-disable-next-line consistent-return
  gatherUser(username).then(([user]) => {
    if (user) res.send({ user });
    else return Promise.reject({ status: 404, msg: 'server error' });
  })
    .catch(err => next(err));
};
