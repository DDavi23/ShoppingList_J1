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

/* 

TODO - Server-Side
1. Add a router.get to grab all shopping lists
2. Can probably delete the shopping-list-item route

TODO - Client-Side
1. Set up angular framework
2. Create service for API calls (make GET call)
3. Create controller that assigns GET response to array
4. Layout home page that lists all shopping lists from array

*/

module.exports = router;