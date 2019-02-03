const knex = require ('./connection');

module.exports = {
  create: (tag) => {
    return knex('tags').insert({'tag_name': tag}).returning('id').then(id => {
      return id[0];
    })
  },
  getOneByTagName:  (tag) => {
    // console.log('in getByTagName');
    // return knex('tags').where('tag_name', tag).first();
    return knex('tags').select().where('tag_name', tag)
  },
}
