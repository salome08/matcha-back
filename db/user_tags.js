const knex = require ('./connection');

module.exports = {
  create: (user_id, tag_id) => {
    console.log('ici');
    return knex('user_tags').insert({'user_id': user_id, 'tag_id': tag_id}).returning('id').then(id => {
      return id[0];
    })
  },
  getOneByMatchUserTag: (user_id, tag_id) => {
    // console.log('in getByTagName');
    console.log('la');
    // return knex('tags').where('tag_name', tag).first();
    return knex('user_tags').select().where({'user_id': user_id, 'tag_id': tag_id})
  },
}
