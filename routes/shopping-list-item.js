var router = require('express').Router();
var mongoUtil = require( '../mongoUtil' );


// ADD ITEM TO LIST

router.post('/', function (req, res){
	// mongo set up
	var db = mongoUtil.getDb();
	db.createCollection('shoppingLists', function(err, collection) {});
	var shoppingLists = db.collection('shoppingLists');

	var newItem = req.body;

	shoppingLists.update({id:req.body.listId}, {$push:{items:newItem}}, {w:1}, function(err, result) {
		console.log('You pushed!');
	});
	res.send(newItem);

});


// DELETE ALL ITEMS FROM LIST

router.put('/', function (req, res){
	// mongo set up
	var db = mongoUtil.getDb();
	db.createCollection('shoppingLists', function(err, collection) {});
	var shoppingLists = db.collection('shoppingLists');

	shoppingLists.update({id:req.body.listId}, {$unset:{items:[]}}, {w:1}, function(err, result) {
		console.log('You pushed!');
	});

});


module.exports = router;