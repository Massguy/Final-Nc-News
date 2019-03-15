const connection = require('../db/connection');

exports.fetchUsers = () => connection.select('*').from('users');

exports.sendingUser = newUser => connection('users').insert(newUser).returning('*');

exports.gatherUser = username => connection.select('*')
  .from('users')
  .where({ username });
