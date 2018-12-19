
//FORMAT of token : Authorization: Bearer token
module.exports = {
  takeToken: function(req, res, next){
  	//get auth header validUser
  	const bearerHeader = req.headers.authorization;
  	//check if its undefined
  	if(typeof bearerHeader !== 'undefined'){
  		//split at the space
  		const bearer = bearerHeader.split(' ');
  		const token = bearer[1];
  		req.token = token;
  		//next middleware
  		next();
  	}
  	else {
  		res.sendStatus(403);
  	}
  }
}
