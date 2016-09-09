var router = require('express').Router();
var mongoUtil = require( '../mongoUtil' );


// GET ALL LISTS

router.get('/', function (req, res){
	
	// MONGO DB SETUP

	// Gets database from mongoUtil module
	var db = mongoUtil.getDb();
	// Creates a new collection called shoppingLists if not already created
	db.createCollection('shoppingLists', function(err, collection) {});
	// Assigns collection to var shoppingLists
	var shoppingLists = db.collection('shoppingLists');

	// Queries the collection for all documents (lists) and returns them as an array inside var lists
	shoppingLists.find().toArray(function(err, lists) {
    	res.send(lists);
    });

});


// GET SINGLE LIST

router.get('/:id', function (req, res){
	
	// MONGO SETUP
	var db = mongoUtil.getDb();
	db.createCollection('shoppingLists', function(err, collection) {});
	var shoppingLists = db.collection('shoppingLists');

	// Assigns the request parameter id value to var listId
	var listId = req.params.id;

	// Query collection by listId to find specific list (match by list.id)
	shoppingLists.find({id:listId}).toArray(function(err, list) {
    	res.send(list);
    });

});


// CREATE LIST

router.post('/', function (req, res){

	// MONGO DB SETUP
	var db = mongoUtil.getDb();
	db.createCollection('shoppingLists', function(err, collection) {});
	var shoppingLists = db.collection('shoppingLists');

	// Assigns req.body(which should be the list object) to var list
	var list = req.body;

	// Inserts list into shoppingLists collection
	shoppingLists.insert(list, {w:1}, function(err, result) {
		res.send("You created a new list: " + list.name);
	});

});



// DELETE SINGLE LIST

router.delete('/', function (req, res){
	
	// MONGO DB SETUP
	var db = mongoUtil.getDb();
	db.createCollection('shoppingLists', function(err, collection) {});
	var shoppingLists = db.collection('shoppingLists');

	// Assigns req.body(which should be the list object) to var list
	var list = req.body;

	// Queries collection by list.id and removes it.
	shoppingLists.remove({id:list.id}, {w:1}, function(err, result) {
		res.send('You deleted a list: ' + list.name);
	});

});


// UPDATE SINGLE LIST

router.put('/', function (req, res){
	
	// MONGO DB SETUP
	var db = mongoUtil.getDb();
	db.createCollection('shoppingLists', function(err, collection) {});
	var shoppingLists = db.collection('shoppingLists');

	// Assigns req.body(which should be the list object) to var list
	var list = req.body;

	// Queries collection by the list.id and updates the entire list with new object
	shoppingLists.update({id:list.id}, {$set:list}, {w:1}, function(err, result) {
		res.send('You updated the shopping list: ' + list.name);
	});

});

module.exports = router;