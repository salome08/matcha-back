const knex = require('./connection');
//to be continued
module.exports = {
  create: function (token, user) {
    return knex('tokens').insert(user, 'user_id').then(ids => {
  		return ids[0];
  	});
    console.log('OK');
    return knex('tokens').insert('token', token);

  },
  getOne: function (id) {
    return knex('tokens').where('id', user).first();
  }
}
