const express = require('express');
const router = express.Router();
const User = require('../db/user');
const Token = require('../db/token');
const mail = require('../mails/mail');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


function verifyToken(id, token, next, callback) {
  Token
  .getOne(token)
  .then((token) => {
    if (token) {
      //check if id == user_id in token table
      if (token.user_id == id) {
        // If we found a token, find a matching user
        User
        .getOne(id)
        .then((user) => {
          if(user){
            return callback(user);
          }
          else {
            next(new Error('We were unable to find a user for this token.'));
          }
        });
      }
      else {
        next(new Error('Sorry, this Email do not match this token'));
      }
    }
    else {
      next(new Error('We were unable to find a valid token. Your token may have expired.'));
    }
  });
}

router.get('/confirmation', (req, res, next) => {
  // exports.confirmationPost = function (req, res, next) {
  const user_id = req.query.id;
  const token = req.query.token;

  // Find a matching token
  verifyToken(user_id, token, next, (user) => {
    if (!user.is_active){
      User
      .activate(user_id)
      .then(() => {
      //   res.json({
      //     message: 'The account has been verified. Please log in.'
      //   });
        return res.redirect('http://localhost:8080/login');
      });
    }
    else {
      // next(new Error('This user has already been verified.'));
      return res.redirect('http://localhost:8080/login');
    }
  });
});

router.put('/updatePassword', (req, res, next) => {
  //get values of user and new password
  const password  = req.body.password;
  const user_id = req.body.user_id;

  //crypt password
  if (password && user_id) {
    bcrypt
    .hash(password, 8)
    .then((hash) => {
      //change password in db
      User
      .updatePassword(user_id, hash)
      .then((response) => {
        if(response) {
          res.json({message: 'Password is update'});
        }
        else {
          next(new Error('Cannot change your password, try later'));
        }
      });
    });
  }
});

router.post('/resetPassword', (req, res, next) => {
  const token = req.body.token;
  const user_id = req.body.id;
  console.log('token :', token);
  //verify token contenue dans l'url
  verifyToken(user_id, token, next, (user) => {
    if (user) {
      res.json({user, message: 'tokenVerificationOK'});
    }
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
            mail.sendForgotPasswordMail(user.login, email, tokens, (err, res) => {
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
