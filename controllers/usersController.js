const { fetchUsers, sendingUser } = require('../model/usersModel');

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
