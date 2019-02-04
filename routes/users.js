const express = require('express');
const router = express.Router();
const User = require('../db/user');
const authMiddleware = require('../auth/middleware');
const Sticker = require('../db/sticker');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Edit = require('./editProfileFunctions');



router.get('/', (req, res) => {
  // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
  // return 401 not authorised if token is null or invalid
  jwt.verify(req.token, 'secretkey', (err, authData) => {
		if(err){
			res.sendStatus(401);
		}
		else{
      User.getAll().then(users => {
        res.json(users);
      })
		}
	});
});

router.put('/editProfile', (req, res, next) => {
  const user_id = req.body.user_id;
  const toEdit = req.body.toEdit;
    if (toEdit.gender){
      Edit.editGender(toEdit.gender, user_id, res, next);
    }
    if (toEdit.affinity){
      Edit.editAffinity(toEdit.affinity, user_id, res, next);
    }
    if (toEdit.bio){
      Edit.editBio(toEdit.bio, user_id, res, next);
    }
    if (toEdit.tags){
      Edit.editTags(toEdit.tags, user_id, res, next);
    }
    if (toEdit.name){
      Edit.editName(toEdit.name, user_id, res, next);
    }
    if (toEdit.lastname){
      Edit.editLastname(toEdit.lastname, user_id, res, next);
    }
    if (toEdit.email){
      Edit.editEmail(toEdit.email, user_id, res, next);
    }
    if (toEdit.password){
      Edit.editPassword(toEdit.password, user_id, res, next)
    }
    res.json(200);
});


router.get('/:id', (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
		if(err){
			res.sendStatus(401);
		}
		else{
      User.getOne(req.params.id).then((user) => {
        res.json(user);
      });
		}
	});
});

router.delete('/:id', (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
		if(err){
			res.sendStatus(401);
		}
		else{
      User.deleteOne(req.params.id).then(() => {
        res.json({
          status: 200,
          message: 'user deleted'
        });
      });

		}
	});
});

router.get('/:id/sticker', (req,res)=>{
  if (!isNaN(req.params.id)) {
    Sticker.getByUser(req.params.id).then(stickers => {
      res.json(stickers);
    });
  } else {
    resError(res, 500, "Invalid ID");
  }
})

function resError(res, statusCode, message) {
  res.status(statusCode);
  res.json({message});
}

module.exports = router;
