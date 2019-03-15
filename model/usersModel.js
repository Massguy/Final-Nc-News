const connection = require('../db/connection');

exports.fetchUsers = () => connection.select('*').from('users');
