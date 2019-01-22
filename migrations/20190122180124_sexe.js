
exports.up = function(knex, Promise) {
  return knex.schema.createTable('sexe', table => {
    table.increments();
    table.integer('gender').notNullable();
    table.integer('affinity').notNullable();
    table.boolean('valided').notNullable().defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('sexe');
};
