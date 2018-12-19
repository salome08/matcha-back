
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', table => {
    table.increments();
    table.text('firstname').notNullable();
    table.text('lastname').notNullable();
    table.text('login').unique().notNullable();
    table.text('password').notNullable();
    table.text('email').unique().notNullable();
    table.datetime('date').notNullable();
    table.boolean('is_active').notNullable().defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user');
};
