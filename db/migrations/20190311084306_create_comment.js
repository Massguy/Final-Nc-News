
exports.up = function (knex, Promise) {
  return knex.schema.createTable('comment', (commentTable) => {
    commentTable.increments('comment_id').primary();
    commentTable.string('author').notNullable();
    commentTable.string('article_id').notNullable();
    commentTable.integer('votes' || 0);
    commentTable.dateTime('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('comment');
};
