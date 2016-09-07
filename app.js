var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoUtil = require( './mongoUtil' );

mongoUtil.connectToServer( function( err ) {
  // start the rest of your app here
} );

/*
// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/shoppingList", function(err, db) {
  if(!err) {
    console.log("Follow the lights to the DB");

  db.createCollection('shoppingLists', function(err, collection) {});  
  }

  var shoppingLists = db.collection('shoppingLists');

});
*/

// MIDDLEWARE //////////////////////////////////////////////////////////
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// API ROUTES //////////////////////////////////////////////////////////

// create user route (these are end-points for browser to access API)
app.use('/api/shopping-lists', require('./routes/shopping-lists'));




app.get('/', function (req, res) {
  res.send('Hello World!');
});

///////// TODO /////////

/*
1. Connect to a MongoDB (check out different ORM options)
2. Data Models
3. Middleware? (check out workout log)
4. API Routes
*/

app.listen(5000, function () {
  console.log('app is listening in the upside down on port 5000');
});