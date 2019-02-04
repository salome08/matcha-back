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
      .catch(() => {next(new Error('Password is not update, try later'))});
    })
  },
  editGender: (gender, user_id, res, next) => {
    User.updateGender(user_id, gender)

    .catch(() => {next(new Error('gender is not update, try later'))});
  },
  editAffinity: (affinity, user_id, res, next) => {
    User.updateAffinity(user_id, affinity)

    .catch(() => {next(new Error('affinity is not update, try later'))});
  },
  editBio: (bio, user_id, res, next) => {
    User.updateBio(user_id, bio)

    .catch(() => {next(new Error('bio is not update, try later'))});
  },
  editName: (name, user_id, res, next) => {
    User.updateName(user_id, name)

    .catch(() => {next(new Error('name is not update, try later'))});
  },
  editLastname: (lastname, user_id, res, next) => {
    User.updateLastname(user_id, lastname)

    .catch(() => {next(new Error('lastname is not update, try later'))});
  },
  editEmail: (email, user_id, res, next) => {
    User.updateEmail(user_id, email)

    .catch(() => {next(new Error('email is not update, try later'))});
  },

}
