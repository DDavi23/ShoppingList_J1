var router = require('express').Router();
var mongoUtil = require( '../mongoUtil' );


// CREATE LIST

router.post('/', function (req, res){
	// mongo set up
	var db = mongoUtil.getDb();
	db.createCollection('shoppingLists', function(err, collection) {});
	var shoppingLists = db.collection('shoppingLists');

	var newList = req.body;
	shoppingLists.insert(newList, {w:1}, function(err, result) {
		console.log('you inserted ' + newList.name + " list");
	});
	res.send(newList);

});

// DELETE LIST

router.delete('/', function (req, res){
	// mongo set up
	var db = mongoUtil.getDb();
	db.createCollection('shoppingLists', function(err, collection) {});
	var shoppingLists = db.collection('shoppingLists');

	shoppingLists.remove({id:req.body.id}, {w:1}, function(err, result) {
		console.log('you deleted the list');
	});

});


// UPDATE LIST

router.put('/', function (req, res){
	// mongo set up
	var db = mongoUtil.getDb();
	db.createCollection('shoppingLists', function(err, collection) {});
	var shoppingLists = db.collection('shoppingLists');

	var list = req.body;

	shoppingLists.update({id:req.body.id}, {$set:list}, {w:1}, function(err, result) {
		console.log('You updated the shopping list!');
	});

});

module.exports = router;