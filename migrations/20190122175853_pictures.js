
exports.up = function(knex, Promise) {
  return knex.schema.createTable('pictures', table => {
    table.increments();
    table.string('img_path_01', 512).notNullable();
    table.string('img_path_02', 512).nullable();
    table.string('img_path_03', 512).nullable();
    table.string('img_path_04', 512).nullable();
    table.string('img_path_05', 512).nullable();
    table.boolean('valided').notNullable().defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('pictures');
};
