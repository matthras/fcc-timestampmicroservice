// Test URLs
// localhost:8080/1450137600
// localhost:8080/December%2015,%202015
// Expected Output
// { "unix": 1450137600, "natural": "December 15, 2015" }

var express = require('express');
var app = express();

app.get('/:timestring', function(req,res) {
  var timestring = req.params.timestring;
  // Check timestring to see if it's a number or not using parseInt. If the string has words/non-numbers in it, it'll be 'NaN
  if(!isNaN(parseInt(timestring))) {
    console.log("It's a number!")
  } else {
    console.log("It's definitely not a number.")
  }
  res.send('Hello World!')
})

app.listen(8080, console.log('Listening on port 8080'))