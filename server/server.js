const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
let port = process.env.PORT || 1234;

const app = express()

app.use(express.static('public')); //servir fichiers statiques: img, css, js

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



// app.set('port', process.env.port || 1234);
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
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

app.listen(port, () => console.log('server listening on: ', port))
