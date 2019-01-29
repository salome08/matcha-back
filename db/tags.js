const knex = require ('./connection');

module.exports = {
  create: (tag) => {
    return knex('tags').insert(
      knex
        .select('tag_name', tag)
        .whereNotExists(knex('tags').where('tag_name', tag))
    )
  },
}
