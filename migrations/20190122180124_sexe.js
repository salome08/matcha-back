
exports.up = function(knex, Promise) {
  return knex.schema.createTable('sexe', table => {
    table.increments();
    table.integer('gender').nullable();
    table.integer('affinity').nullable();
    table.boolean('valided').notNullable().defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('sexe');
};
