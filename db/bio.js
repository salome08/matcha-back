module.exports = {
  create: (bio) => {
    return knex('bio').insert({'bio': bio}).returning('id').then(id => {
      return id[0];
    })
  },
}
