var express = require('express');
var app = express();

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