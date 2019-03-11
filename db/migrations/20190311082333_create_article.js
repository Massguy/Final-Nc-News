
exports.up = function (knex, Promise) {
  return knex.schema.createTable('article', (articleTable) => {
    articleTable.increments('article_id').primary();
    articleTable.string('title').notNullable();
    articleTable.string('body').notNullable();
    articleTable.integer('votes' || 0);
    articleTable.string('topic').notNullable();
    articleTable.string('author').notNullable();
    articleTable.dateTime('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('article');
};
