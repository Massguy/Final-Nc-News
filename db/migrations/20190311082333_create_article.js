

exports.up = function (knex) {
  return knex.schema.createTable('article', (articleTable) => {
    articleTable.increments('article_id').primary().notNullable();
    articleTable.string('title').notNullable();
    articleTable.text('body').notNullable();
    articleTable.integer('votes').defaultTo(0);
    articleTable
      .string('topic')
      .references('slug')
      .inTable('topics')
      .notNullable()
      .onDelete('CASCADE');
    articleTable
      .string('author')
      .references('username')
      .inTable('users')
      .notNullable()
      .onDelete('CASCADE');
    articleTable.dateTime('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('article');
};
