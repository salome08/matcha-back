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
	const validEmail = typeof user.email == 'string' &&
		user.email.trim() != '';
	const validPassword = typeof user.password == 'string' &&
		user.password.trim() != '' &&
		user.password.trim().length >= 6;

	return validEmail && validPassword;
}

router.post('/signup', (req, res, next) => {
	if(validUser(req.body)) {
		User
		.getOneByEmail(req.body.email)
		.then(user => {
			console.log('user', user);
			if(!user){
				bcrypt.hash(req.body.password, 8)
					.then((hash) => {

					const user = {
						email: req.body.email,
						password: hash,
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
					//insert into db
					//redirect

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
	if(validUser(req.body)){
		//check to see if it's in db
		User
		.getOneByEmail(req.body.email)
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
								signed: 'true'
							});
							res.json({
    						result,
								message: 'Logging... 🔓'
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
