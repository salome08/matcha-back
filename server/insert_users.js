const options = {
	client: 'mysql',
	connection: {
		host: '127.0.0.1',
		user: 'root',
		password: 'salome',
		database: 'matcha'
	}
}

// const options = {
//     client: 'mysql',
//     connection: "mysql://root:salome@localhost:3306/matcha"
// }

const knex = require('knex')(options);

const users = [
	{firstname: 'name1', lastname: 'lname1', login: 'log1', password: 'pass1', email: 'mail1@yh.fr'},
	{firstname: 'name2', lastname: 'lname2', login: 'log2', password: 'pass2', email: 'mail2@yh.fr'},
	{firstname: 'name3', lastname: 'lname3', login: 'log3', password: 'pass3', email: 'mail3@yh.fr'}
]

knex('users').insert(users).then(() => console.log("data inserted"))
.catch((err) => { console.log(err); throw err })
.finally(() => {
	knex.destroy();
});