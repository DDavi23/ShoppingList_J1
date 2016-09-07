var router = require('express').Router();
var mongoUtil = require( '../mongoUtil' );


router.post('/', function (req, res){
	var db = mongoUtil.getDb();
	db.createCollection('shoppingLists', function(err, collection) {});
	var shoppingLists = db.collection('shoppingLists');

	var doc = {mykey:1};
	// shoppingLists.insert(doc, {w:1}, function(err, result) {
	// 	console.log('you inserted doc');
	// });
	res.send(req);
});


module.exports = router;