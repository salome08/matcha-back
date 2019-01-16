const express = require('express');
const router = express.Router();
const User = require('../db/user');
const Token = require('../db/token');
const mail = require('../mails/mail');
const jwt = require('jsonwebtoken');


router.get('/confirmation', (req, res, next) => {
  // exports.confirmationPost = function (req, res, next) {
  const user_id = req.query.id;
  const token = req.query.token;

  // Find a matching token
  Token
  .getOne(token)
  .then((token) => {
    if (token) {
      // If we found a token, find a matching user
      User
      .getOne(user_id)
      .then((user) => {
        if(user){
          if (!user.is_active){
            User
            .activate(user_id)
            .then(() => {
              res.json({
                message: 'The account has been verified. Please log in.'
              });
            });
          }
          else {
            next(new Error('This user has already been verified.'));
          }
        }
        else {
          next(new Error('We were unable to find a user for this token.'));
        }
      });
    }
    else {
      next(new Error('We were unable to find a valid token. Your token may have expired.'));
    }
  });
});

router.post('/resetPassword', (req, res, next) => {
  //verify token
  res.json({
    message: 'ok'
  });
});

router.post('/forgotpassword', (req, res, next) => {
  const email = req.body.email;
  //Find matching email in db
  User
  .getOneByEmail(email)
  .then((user) => {
    if(user){
    const user_id = user.id;

    //create token
    jwt.sign({user: user}, 'forgotPasswordToken', (err, token) => {
      if (err) {
        next(new Error(err));
      }
      else{
          const tokens = {
          user_id: user_id,
          token: token,
          created_at: new Date()
        };
        Token
        .create(tokens)
        .then(token  => {
          // if (token){
            res.json({
              message: 'token is in db'
            });

          //send mail
            mail.sendForgotPasswordMail(email, tokens, (err, res) => {
              if (err) {
                next(new Error('Error: Email has not been send'));
              }
            });
          // }
          // else {
          //   next (new Error('Error storage in database'));
          // }
        })
      }
    });
  }
  else {
    next (new Error('We were unable to find an account for this email'));
  }
});
  //get user_id for this email and create token for this user

  //send email with token

});
// router.post('/resend');
module.exports = router;
