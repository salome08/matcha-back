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
    }).returning('*').then(user => {return user[0];});;
  },
  updateEmail: (id, email) => {
    return knex('user').where('id', id).update({
      email: email
    }).returning('*').then(user => {return user[0];});;
  },
  updateFirstname: (id, firstame) => {
    return knex('user').where('id', id).update({
      firstame: firstame
    }).returning('*').then(user => {return user[0];});;
  },
  updateLastname: (id, lastname) => {
    return knex('user').where('id', id).update({
      lastname: lastname
    }).returning('*').then(user => {return user[0];});;
  },
  updateGender: (id, gender) => {
    return knex('user').where('id', id).update({
      gender: gender
    }).returning('*').then(user => {return user[0];});
  },
  updateAffinity: (id, affinity) => {
    return knex('user').where('id', id).update({
      affinity: affinity
    }).returning('*').then(user => {return user[0];});
  },
  updateBio: (id, bio) => {
    return knex('user').where('id', id).update({
      bio: bio
    }).returning('*').then(user => {return user[0];});
  },
  updateName: (id, name) => {
    return knex('user').where('id', id).update({
      firstname: name
    }).returning('*').then(user => {return user[0];});
  },
  activate: (id) => {
    return knex('user').where('id', id).update({
      is_active: 'true'
    });
  }
}
