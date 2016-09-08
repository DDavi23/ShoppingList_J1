var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoUtil = require( './mongoUtil' );


// MONGO DB //////////////////////////////////////////////////////////
mongoUtil.connectToServer( function( err ) {
  // start the rest of your app here
} );


// MIDDLEWARE //////////////////////////////////////////////////////////
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


// API ROUTES //////////////////////////////////////////////////////////
app.use('/api/shopping-lists', require('./routes/shopping-lists'));
app.use('/api/shopping-list-item', require('./routes/shopping-list-item'));


// MAIN ROUTE //////////////////////////////////////////////////////////
app.get('/', function (req, res) {
  res.send('Hello World!');
});


// SERVER //////////////////////////////////////////////////////////
app.listen(5000, function () {
  console.log('app is listening in the upside down on port 5000');
});