var router = require('express').Router();
var mongoUtil = require( '../mongoUtil' );


router.post('/', function (req, res){
	// mongo set up
	var db = mongoUtil.getDb();
	db.createCollection('shoppingLists', function(err, collection) {});
	var shoppingLists = db.collection('shoppingLists');

	var item = req.body;
	shoppingLists.insert(item, {w:1}, function(err, result) {
		console.log('you inserted ' + item.name);
	});
	res.send(item.name);
});


module.exports = router;