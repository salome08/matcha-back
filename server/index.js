const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.set('port', process.env.port || 1234);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req, res) => {
	res.send('hello');
})

app.post('/register', (req, res) => {
	console.log(req.body);
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var login = req.body.login;
	var password = req.body.password;
	var email = req.body.email;

	console.log("voici le mdp: " + password);
})

app.listen(1234, () => console.log('server listening at 1234'))
