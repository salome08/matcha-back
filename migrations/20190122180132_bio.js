
exports.up = function(knex, Promise) {
  return knex.schema.createTable('bio', table => {
    table.increments();
    table.text('bio').notNullable();
    table.boolean('valided').notNullable().defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('bio');
};
