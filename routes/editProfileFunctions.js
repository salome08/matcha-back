const UserTags = require('../db/user_tags');
const Tags = require('../db/tags');
const bcrypt = require('bcryptjs');
const User = require('../db/user');



module.exports = {
  editTags: (tags, user_id, res, next) => {
    tags.forEach(tag => {
      //for each tag that has been changed
      //check if its exist already
      Tags
      .getOneByTagName(tag.id)
      .then(result => {
        if (result.length === 0){
          //if tag did not already exist
          Tags
          .create(tag.id)
          .then(result => {
            const tag_id = result;
            UserTags
            .getOneByMatchUserTag(user_id, tag_id)
            .then(match => {
              if (match.length === 0){
                //match user-tag dont exist in db
                UserTags
                .create(user_id, tag_id);
              }
            })
          });
        }
        else {
          const tag_id = result[0].id;
          UserTags
          .getOneByMatchUserTag(user_id, tag_id)
          .then(match => {
            if (match.length === 0){
              //match user-tag dont exist in db
              UserTags
              .create(user_id, tag_id);
            }
          })
        }
      })
      .catch(err => {
        console.log(err);
      });
    })
  },
  editPassword: (password, user_id, res, next) => {
    bcrypt
    .hash(password, 8)
    .then(hash => {
      User.updatePassword(user_id, hash)
      .then(() => {
        res.json({message: 'password has been changed'});
      })
      .catch(() => {next(new Error('Password is not update, try later'))});
    })
  },

}
