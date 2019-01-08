const express = require('express');
const router = express.Router();
const User = require('../db/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./middleware');
const mail = require('../mail/mail');

router.get('/', authMiddleware.takeToken ,(req, res) => {
	jwt.verify(req.token, 'secretkey', (err, authData) => {
		if(err){
			res.sendStatus(403);
		}
		else{
			res.json({
				message: 'hello 🔓',
				authData
			});
		}
	});
});

function validUser(user) {
	const validName = typeof user.firstName == 'string' &&
		user.firstName.trim() != '';
	const validLastName = typeof user.lastName == 'string' &&
		user.lastName.trim() != '';
	const validLogin = typeof user.username == 'string' &&
		user.username.trim() != '';
	const validEmail = typeof user.email == 'string' &&
		user.email.trim() != '';
	const validPassword = typeof user.password == 'string' &&
		user.password.trim() != '' &&
		user.password.trim().length >= 6;

	return validEmail && validPassword && validName && validLastName &&
		validLogin;
}

function validUserLog(user) {
	const validLogin = typeof user.username == 'string' &&
		user.username.trim() != '';
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
				console.log(req.body.username);
				User
				.getOneByLogin(req.body.username)
				.then(user => {
					if(!user){
						//unique login
						bcrypt
						.hash(req.body.password, 8)
						.then((hash) => {
							const user = {
								firstname: req.body.firstName,
								lastname: req.body.lastName,
								login: req.body.username,
								password: hash,
								email: req.body.email,
								created_at: new Date()
							};
							User
							.create(user)
							.then(user => {
								res.json({
									user,
									message: '🔓'
								});
								mail.sendConfirmationMail(user);
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
		.getOneByLogin(req.body.username)
		.then(user => {
			console.log('user', user);
			if(user){
				//compare password to hashed password
				bcrypt
				.compare(req.body.password, user.password)
				.then((result) => {
    				//if the passwords matched
    				if(result){
							if(user.is_active){
								//create jsonwebtoken with key to save in local storage
								jwt.sign({user: user}, 'secretkey', {expiresIn: '2000s'},(err, token) => {
									res.json({
										user,
										token
									});
								});
							}
							else {
								next(new Error('Please confirm your email'));
							}
    				}
  					else {
  						next(new Error('Wrong password'));
  					}
				});
			}
			else{
				next(new Error('User do not exist'));
			}
		})
		//find in db
	}
	else {
		next(new Error('Invalid login'));
	}
});

module.exports = router;
