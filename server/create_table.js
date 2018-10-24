const options = {
	client: 'mysql',
	connection: {
		host: '127.0.0.1',
		user: 'root',
		password: 'salome',
		database: 'matcha'
	}
}

const knex = require('knex')(options);

knex.schema.createTable('users', (table) => {
	table.increments('id'),
	table.string('firstname'),
	table.string('lastname'),
	table.string('login'),
	table.string('password'),
	table.string('email')
}).then(() => console.log("table created"))
	.catch((err) => { console.log(err); throw err })
	.finally(() => {
		knex.destroy();
	});