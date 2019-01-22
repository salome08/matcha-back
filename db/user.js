const knex = require('./connection');

module.exports = {
  getAll:  () => {
    return knex('user');
  },
  getOne:  (id) => {
    return knex('user').where('id', id).first();
  },
  getOneByLogin:  (login) => {
    return knex('user').where('login', login).first();
  },
  getOneByEmail:  (email) => {
  	return knex('user').where('email', email).first();
  },
  create:  (user) => {
  	return knex('user').insert(user, 'id').then(ids => {
  		return ids[0];
  	});
  },
  deleteOne:  (id) => {
    return knex('user').where('id', id).del();
  },
  updatePassword: (id, password) => {
    return knex('user').where('id', id).update({
      password: password
    });
  },
  activate: (id) => {
    return knex('user').where('id', id).update({
      is_active: 'true'
    });
  }
}
