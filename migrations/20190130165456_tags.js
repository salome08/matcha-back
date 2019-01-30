
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', table => {
    table.increments();
    table.text('tag_name').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('tags');
};
