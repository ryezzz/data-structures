var fs = require('fs');
var request = require('request'); // npm install request
var async = require('async'); // npm install async
var cheerio = require('cheerio');
var content = fs.readFileSync('data/file2.txt');
var $ = cheerio.load(content, {
    ignoreWhitespace: true,
    xmlMode: true
});

//JSON File Location
//https://raw.githubusercontent.com/ryezzz/data-structures/master/assignment-2/array.JSON

// // _______________________.gitignore key_______________________________
// // Will showed me how to creat a .gitignore file and place a link to cred.txt within it. Github will ignore that key
// // I also added the *.pyc, __pycache__, .* hidden file pattern here so it can't be found in C9 by any user other than me
var apiKey = fs.readFileSync('cred.txt*.pyc, __pycache__, .*','utf8');


// // _______________________import JSON from other project_______________________________

// Read Synchrously
console.log("\n *START* \n");
// https://raw.githubusercontent.com/ryezzz/data-structures/master/assignment-5/array.JSON
// https://raw.githubusercontent.com/ryezzz/data-structures/master/assignment-5/oldarray.JSON
request('https://raw.githubusercontent.com/ryezzz/data-structures/master/aaMeetings/miniarray.JSON', function(error, response, body) {
    var dataFromJSON = JSON.parse(body);
    console.log( dataFromJSON)
  

// _______________________ Console.logs lat and long for each address in meetingsDat _______________________________
var meetingsDataForObject= [];
    // makes all functions within fire synchronously so that meetingsData is concatenated into
    // thisMeeting object with corresponding geolocation information.
async.eachSeries(dataFromJSON, function(value, callback) {
    // take each address from meetingsData adds web google api address in front and replaces spaces with periods. Returns each as string
    var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value.address.split(' ').join('+') + '&key=' + apiKey;
    
    // create the this meeting object
    var thisMeeting = new Object;
    // // set thisMeeting address part of object to the corresponding item in meetingsData
    thisMeeting = value;
    // thisMeeting.floor = value;
    
    // google api requist
    request(apiRequest, function(err, resp, body) {
        if (err) {throw err;}
        thisMeeting.latLong = JSON.parse(body).results[0].geometry.location;
        meetingsDataForObject.push(thisMeeting);
    });
    
     //  setTimeout calls back eachSeries function after 250 milliseconds 
   
    setTimeout(callback, 2000);
    
    //  function fires at end the eachSeries loop
}, function() {
    
// I logged array
// console.log(JSON.stringify(addressData));
// // I double checked that meetingsDataForObject is an array
// console.log(Array.isArray(addressData));

// I printed array to a .txt file
console.log(meetingsDataForObject);

require('fs').writeFile(
    './meetings.JSON',
    JSON.stringify(meetingsDataForObject),
    function (err) {
        if (err) {
            console.error('error');
        }
    }
);    

// console.log(addressData);
    

});

});


// NOTES FOR FIGURING OUT THE FINAL SECTION

// Goals: console.log an array of objects. Each object should have the address and geographic coordinates for each meeting

// Declares addresses, replaces meetingsData spaces with + and pushes each index of meetingsData into addresses array.
// do I need to create an array from meetings data? right now it's returning as a string.
// I'm going to reduce addresses to one address and then create an object from that single address.
// Reducing addresses to one address makes the program work to the point of generating addresses.length number of address links to my first
// researching each series http://caolan.github.io/async/docs.html#eachSeries
// I replaced my seperate "addresses" array with the initial starter code in the API line. Doing everything
// seperately seemed more clear, but returns each API request as a string of all addresses together.
// I somehow merged my meetingsDataForObject variable with my thisMeeting Variable so returned to starter code to clean things up
// I managed to almost finish, but array of objects isn't showing the objects unless I target the index directly
// used json.stringify method to show everything
// I made a for loop to target each object individually: I deleted the for loop once I figured out that





// _______________________ Replaces spaces with + _______________________________
// Declares addresses, replaces meetingsData spaces with + and pushes each index of meetingsData into addresses array.
// var addresses = [];

// for(var i=0; i<meetingsData.length; i++){
// addresses.push(meetingsData[i].replace(/ /g, "+"))
// }

// addresses = addresses[1];



