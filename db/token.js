const knex = require('./connection');
//to be continued
module.exports = {
  create: (token) => {
    return knex('tokens').insert(token).then(ids => {
      return ids[0];
  	});
  },
  getOne: (token) => {
    return knex('tokens').where('token', token).first();
  }
}
