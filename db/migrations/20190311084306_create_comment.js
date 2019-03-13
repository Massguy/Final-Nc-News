
exports.up = function (knex, Promise) {
  return knex.schema.createTable('comment', (commentTable) => {
    commentTable.increments('comment_id').primary();
    commentTable.string('author').references('username').inTable('users');
    commentTable.integer('article_id').references('article_id').inTable('article');
    commentTable.integer('votes' || 0);
    commentTable.dateTime('created_at').defaultTo(knex.fn.now());
    commentTable.text('body');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('comment');
};
