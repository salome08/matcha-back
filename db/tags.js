const knex = require ('./connection');

module.exports = {
  create: (tag) => {
    console.log('tamerre')

    return knex('tags')
    .insert({'tag_name': tag}).then((value) => console.log(value))
  },
  getOneByTagName:  (tag) => {
    // console.log('in getByTagName');
    console.log(tag)
    // return knex('tags').where('tag_name', tag).first();
    return knex('tags').select().where('tag_name', tag)
  },
}
