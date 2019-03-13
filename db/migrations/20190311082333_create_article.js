

exports.up = function (knex, Promise) {
  return knex.schema.createTable('article', (articleTable) => {
    articleTable.increments('article_id').primary();
    articleTable.string('title').notNullable();
    articleTable.text('body').notNullable();
    articleTable.integer('votes' || 0);
    articleTable
      .string('topic')
      .references('slug')
      .inTable('topics');
    articleTable
      .string('author')
      .references('username')
      .inTable('users');
    articleTable.dateTime('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('article');
};
