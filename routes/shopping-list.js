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

// GET SINGLE LIST

router.get('/:id', function (req, res){
	// mongo set up
	var db = mongoUtil.getDb();
	db.createCollection('shoppingLists', function(err, collection) {});
	var shoppingLists = db.collection('shoppingLists');

	console.log('hey');
	var listId = req.params.id;

	shoppingLists.find({id:listId}).toArray(function(err, list) {
    	res.send(list);
    	console.log(list);
    });

});


// UPDATE ITEMS ARRAY

router.put('/', function (req, res){
	// mongo set up
	var db = mongoUtil.getDb();
	db.createCollection('shoppingLists', function(err, collection) {});
	var shoppingLists = db.collection('shoppingLists');

	/*
	var list = req.body;
	shoppingLists.update({id:req.body.listId}, {$set:{items:list.items}}, {w:1}, function(err, result) {
		console.log('You updated your items property!');
	});
	*/

	shoppingLists.update({id:req.body.listId}, {$unset:{items:[]}}, {w:1}, function(err, result) {
		console.log('You deleted your items array!');
	});

});

module.exports = router;