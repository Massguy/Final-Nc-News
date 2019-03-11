
exports.up = function (knex, Promise) {
  return knex.schema.createTable('topics', (topicTable) => {
    topicTable.increments('slug').primary();
    topicTable.string('description').notNullable();
  });
};


exports.down = function (knex, Promise) {
  return knex.schema.dropTable('topics');
};
