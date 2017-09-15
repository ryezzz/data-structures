var fs = require('fs');
var request = require('request'); // npm install request
var async = require('async'); // npm install async
var cheerio = require('cheerio');
var content = fs.readFileSync('data/file2.txt');
var $ = cheerio.load(content, {
    ignoreWhitespace: false,
    xmlMode: false
});

var apiKey = fs.readFileSync('./cred.txt','utf8');
// console.log(API_key);


// var apiKey = process.env.GMAKEY;

var meetingsData = [];

// create meetings array
$("tr").children().each(function(i, elem){
    
    if($(elem).attr('style') == "border-bottom:1px solid #e3e3e3; width:260px"){
        meetingsData.push($(elem).contents().get(6).nodeValue.trim())
    }
});



var addresses = ["63 Fifth Ave, New York, NY", "16 E 16th St, New York, NY", "2 W 13th St, New York, NY"];

// eachSeries in the async module iterates over an array and operates on each item in the array in series
async.eachSeries(addresses, function(value, callback) {
    var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value.split(' ').join('+') + '&key=' + apiKey;
    var thisMeeting = new Object;
    thisMeeting.address = value;
    request(apiRequest, function(err, resp, body) {
        if (err) {throw err;}
        thisMeeting.latLong = JSON.parse(body).results[0].geometry.location;
        meetingsData.push(thisMeeting);
    });
    setTimeout(callback, 2000);
}, function() {
    console.log(meetingsData);
});

console.log(meetingsData);