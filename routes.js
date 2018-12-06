const express = require('express');
const router = express.Router();


//Uses routes with exact matches
router.get('/router', (req, res) => {
	res.json({
		message: 'hello from the router!'
	});
});

router.get('/', (req, res) =>{
	res.json({
		message: 'Hello World!'
	});
});


//Extract data from requests using path params
router.get('/:name/favColor/:color/favFood/:food', (req, res) => {
	console.log(req.params);
	res.json({
		name: req.params.name,
		favColor: req.params.color,
		favFood: req.params.food
	});
});

////Extract data from requests using query
//search?type=student&year=2018
router.get('/search', (req, res) => {
	console.log(req.query);
	res.json({
		message: req.query
	})
});


module.exports = router;