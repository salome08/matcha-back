const express = require('express');
const router = express.Router();
const User = require('../db/user');
const Token = require('../db/token');
const jwt = require('jsonwebtoken');


router.post('/confirmation', (req, res, next) => {
  // exports.confirmationPost = function (req, res, next) {
  const user_id = req.query.id;
  const token = req.query.token;
  console.log('token : ', token);

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
// router.post('/resend');
module.exports = router;
