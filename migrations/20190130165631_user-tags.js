exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_tags', table => {
    table.increments();
    table.integer('user_id').references('user.id').unsigned().onDelete('cascade');
    table.integer('tag_id').references('tags.id').unsigned().onDelete('cascade');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user_tags');
};
