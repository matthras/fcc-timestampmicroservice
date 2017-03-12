// Test URLs
// localhost:8080/1450137600
// localhost:8080/December%2015,%202015
// Expected Output
// { "unix": 1450137600, "natural": "December 15, 2015" }

var express = require('express');
var app = express();

app.get('/:timestring', function(req,res) {
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var timestring = req.params.timestring;
  var timenumber = parseInt(timestring); // If timestring is not a number, timenumber = NaN
  var returnObject = {};
  // Checking the input to see if it's NaN or not.
  if(!isNaN(timenumber)) {
    returnObject.unix = timenumber;
    // Construct date from Unix number, multiply by 1000 because it's in milliseconds.
    var date = new Date(timenumber*1000);
    var naturalString = months[date.getMonth()] + " " + date.getUTCDate() + ", " + date.getFullYear();
    returnObject.natural = naturalString; 
  } else {
    var timeArray = timestring.replace(',','').split(' ');
    // e.g. ['December', '15', '2015']
    
    // Checks if:
    // the first element in timeArray is a month that matches the months given and
    // the array is of length 3
    if(timeArray.length !== 3 || months.indexOf(timeArray[0]) === -1){
      returnObject = null;
    } else {
      var date = new Date(parseInt(timeArray[2]),months.indexOf(timeArray[0]), timeArray[1])
      returnObject.natural = timestring;
      returnObject.unix = date.getTime()/1000;
    }
  }
  res.send(returnObject)
})

app.listen(8080, console.log('Listening on port 8080'))