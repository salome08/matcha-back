const express = require('express');
const router = express.Router();
const User = require('../db/user');
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
	res.json({
		message: '🔐'
	});
});

function validUser(user) {
	const validName = typeof user.firstname == 'string' &&
		user.firstname.trim() != '';
	const validLastName = typeof user.lastname == 'string' &&
		user.lastname.trim() != '';
	const validLogin = typeof user.login == 'string' &&
		user.login.trim() != '';
	const validEmail = typeof user.email == 'string' &&
		user.email.trim() != '';
	const validPassword = typeof user.password == 'string' &&
		user.password.trim() != '' &&
		user.password.trim().length >= 6;

	return validEmail && validPassword && validName && validLastName &&
		validLogin;
}

function validUserLog(user) {
	const validLogin = typeof user.login == 'string' &&
		user.login.trim() != '';
	const validPassword = typeof user.password == 'string' &&
		user.password.trim() != '' &&
		user.password.trim().length >= 6;

	return  validPassword && validLogin;
}

router.post('/signup', (req, res, next) => {
	if(validUser(req.body)) {
		User
		.getOneByEmail(req.body.email)
		.then(user => {
			console.log('user', user);
			if(!user){
				//if user do not exist
				//check for unique login
				User
				.getOneByLogin(req.body.login)
				.then(user => {
					if(!user){
						//unique login
						bcrypt
						.hash(req.body.password, 8)
						.then((hash) => {
							const user = {
								firstname: req.body.firstname,
								lastname: req.body.lastname,
								login: req.body.login,
								password: hash,
								email: req.body.email,
								created_at: new Date()
							};
							User
							.create(user)
							.then(id => {
								res.json({
									id,
									message: '🔓'
								});
							})
						});
					}
					else{
						next(new Error('Login already used'));
					}
				});

			}
			else {
				next(new Error('Email in  use'));
			}
		});
	}
	else {
		next(new Error('Invalid user'));
 	}
});

router.post('/login', (req, res, next) => {
	if(validUserLog(req.body)){
		//check to see if it's in db
		User
		.getOneByLogin(req.body.login)
		.then(user => {
			console.log('user', user);
			if(user){
				//compare password to hashed password
				bcrypt
				.compare(req.body.password, user.password)
				.then((result) => {
    				//if the passwords matched
    				if(result){
							//sentting the set-cookie header
							res.cookie('user_id', user.id, {
								httpOnly: 'true',
								// secure: 'true', secure when the production
								secure: req.app.get('env') === 'development',
								signed: 'true'
							});
							res.json({
    						result,
								message: 'Logged in 🔓'
							});
    				}
    					else {
    						next(new Error('Invalid login'));
    					}
				});
			}
			else{
				next(new Error('Invalid login'));
			}
		})
		//find in db
	}
	else {
		next(new Error('Invalid login'));
	}
});

module.exports = router;
