const { userData } = require('../data/development-data');

exports.seed = function (knex, Promise) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex('users')
      .insert(userData)
      .returning('*'));
};
