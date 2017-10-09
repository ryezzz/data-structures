
// npm install mongodb

var request = require('request');


var dbName = 'assignment-5'; // name of Mongo database (created in the Mongo shell)
var collName = 'all_meeting_data'; // name of Mongo collection (created in the Mongo shell)

// Request the JSON data 
// Insert the list of address data (contained in an array) in the Mongo collection
request('https://raw.githubusercontent.com/ryezzz/data-structures/master/assignment-5/meetings.JSON', function(error, response, body) {
    var aaData = JSON.parse(body);

    // Connection URL
    var url = 'mongodb://' + process.env.IP + ':27017/' + dbName;

    // Retrieve
    var MongoClient = require('mongodb').MongoClient; 

    MongoClient.connect(url, function(err, db) {
        if (err) {return console.dir(err);}

        var collection = db.collection(collName);
        // THIS IS WHERE THE DOCUMENT(S) IS/ARE INSERTED TO MONGO:
        collection.insert(aaData);
        db.close();

    }); //MongoClient.connect

}); //request

// Database was goine
// Make sure data is there before pulling
// if firstcell.text!=" "