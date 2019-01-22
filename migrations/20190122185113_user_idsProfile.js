
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_IdsDescription', table => {
    table.increments();
    table.integer('user_id').references('user.id').unsigned().onDelete('cascade');
    table.integer('bio_id').references('bio.id').unsigned().onDelete('cascade');
    table.integer('sexe_id').references('sexe.id').unsigned().onDelete('cascade');
    table.integer('pictures_id').references('pictures.id').unsigned().onDelete('cascade');
    table.boolean('valided').notNullable().defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('user_IdsDescription');
};
