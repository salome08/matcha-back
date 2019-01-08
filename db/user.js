const knex = require('./connection');

module.exports = {
  getAll: function () {
    return knex('user');
  },
  getOne: function (id) {
    return knex('user').where('id', id).first();
  },
  getOneByLogin: function (login) {
    return knex('user').where('login', login).first();
  },
  getOneByEmail: function (email) {
  	return knex('user').where('email', email).first();
  },
  create: function (user) {
  	return knex('user').insert(user, 'id').then(ids => {
  		return ids[0];
  	});
  },
  deleteOne: function (id) {
    return knex('user').where('id', id).del();
  }
}