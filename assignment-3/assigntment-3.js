// Organizing for the data that represents 
// Data retreival is priority vs. storage
// put addresses into an array
// get geographic coordinates from google maps API
// https://developers.google.com/maps/documentation/javascript/tutorial
// paramaters can pe appended to the back of URL
// 

var request = require('request'); // npm install request
var async = require('async'); // npm install async
var fs = require('fs');
var API_key = fs.readFileSync('./cred.txt','utf8');
console.log(API_key);

// SETTING ENVIRONMENT VARIABLES (in Linux): 
// export NEW_VAR="Content of NEW_VAR variable"
// printenv | grep NEW_VAR
// https://www.google.com/maps/place/300+Ashland+Pl,+Brooklyn,+NY+11217
// key - I need to get a key
// guides - get an api key

// var apiKey = process.env.GMAKEY;

// var meetingsData = [];
// var addresses = ["63 Fifth Ave, New York, NY", "16 E 16th St, New York, NY", "2 W 13th St, New York, NY"];
// // eachSeries in the async module iterates over an array and operates on each item in the array in series
// async.eachSeries(addresses, function(value, callback) {
//     var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value.split(' ').join('+') + '&key=' + apiKey;
//     var thisMeeting = new Object;
//     // this meeting is only available within this specific function
//     thisMeeting.address = value;
//     request(apiRequest, function(err, resp, body) {
//         if (err) {throw err;}
//         thisMeeting.latLong = JSON.parse(body).results[0].geometry.location;
//         // this location added to the object
//         meetingsData.push(thisMeeting);
//     });
    
//     setTimeout(callback, 250);
//     // two seconds between every call: most apis have a limit to frequency you can call
// }, function() {
//     console.log(meetingsData);
// });

// // write the array to file