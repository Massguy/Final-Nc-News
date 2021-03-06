
exports.up = function (knex) {
  return knex.schema.createTable('comment', (commentTable) => {
    commentTable.increments('comment_id').primary();
    commentTable.string('author').references('username').inTable('users');
    commentTable.integer('article_id').references('article_id').inTable('article').notNullable();
    commentTable.integer('votes').defaultTo(0);
    commentTable.dateTime('created_at').defaultTo(knex.fn.now());
    commentTable.text('body').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('comment');
};
