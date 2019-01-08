
exports.up = function(knex, Promise) {
  //spécifie les commandes à exécuter pour modifier la base de données à effectuer
  return knex.schema.createTable('tokens', table => {
    table.increments();
    table.integer('user_id').references('user.id').unsigned().onDelete('cascade');
    table.text('token').notNullable();
    table.datetime('created_at').notNullable();
  });
};

exports.down = function(knex, Promise) {
  //Le but de cette fonction est de faire le contraire de ce que exports.up a fait
  return knex.schema.dropTableIfExists('tokens');
};
