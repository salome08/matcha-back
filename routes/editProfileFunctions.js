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
  editPassword: async (hash, user_id, res, next) => {

      let user = await User.updatePassword(user_id, hash);
      return user;
      // .catch(() => {next(new Error('Password is not update, try later'))});
  },
  editGender: async (gender, user_id, res, next) => {
     // User.updateGender(user_id, gender);
    // .then(usr => {
    let user = await User.updateGender(user_id, gender);
    return user;

    // console.log('user after update');
    //   return (usr);})
    // .catch(() => {next(new Error('gender is not update, try later'))});
  },
  editAffinity: async (affinity, user_id, res, next) => {
    let user = await User.updateAffinity(user_id, affinity);
    return user;
    // .then(user => {return user})
    // .catch(() => {next(new Error('affinity is not update, try later'))});
  },
  editBio: async (bio, user_id, res, next) => {
    let user = await User.updateBio(user_id, bio);
    return user;

    // .catch(() => {next(new Error('bio is not update, try later'))});
  },
  editName: async (name, user_id, res, next) => {
    let user = await User.updateName(user_id, name);
    return user;

    // .catch(() => {next(new Error('name is not update, try later'))});
  },
  editLastname: async (lastname, user_id, res, next) => {
    let user = await User.updateLastname(user_id, lastname);
    return user;

    // .catch(() => {next(new Error('lastname is not update, try later'))});
  },
  editEmail: async (email, user_id, res, next) => {
    let user = await User.updateEmail(user_id, email);
    return user;

    // .catch(() => {next(new Error('email is not update, try later'))});
  },

}
