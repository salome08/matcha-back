
exports.up = function(knex, Promise) {
    return knex.schema.table('user', function(t) {
        t.integer('gender').notNull().defaultTo(0);
        t.integer('affinity').notNull().defaultTo(0);
        t.text('bio').notNull().defaultTo(0);
        t.integer('image_id').notNull().defaultTo(0);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('user', function(t) {
        t.dropColumn('gender');
        t.dropColumn('affinity');
        t.dropColumn('bio');
        t.dropColumn('image_id');
    });
};
