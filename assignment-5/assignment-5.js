var fs = require('fs');

var dbName = 'assignment-5';
var collName = 'all_meeting_data';

// Connection URL
var url = 'mongodb://' + process.env.IP + ':27017/' + dbName;


var myQuery = [
    { $match : { day : "Tuesdays" } },
    { $match : { $or: [{ start_time : "7:00"}, { start_time : "7:30"}, { start_time : "8:00"}, { start_time : "11:00"}, { start_time : "12:00"}] } }, 
    { $match : { start_time_AMPM: "PM" } },
    
    
   
    
    
    // db.restaurants.find( { "grades.score": { $gt: 30 } } )

    ];


// db.restaurants.find(
//   { $or: [ { "cuisine": "Italian" }, { "address.zipcode": "10075" } ] }
// )

// Retrieve
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(url, function(err, db) {
    if (err) {return console.dir(err);}

    var collection = db.collection(collName);

    // Select three Citibike stations
    collection.aggregate(myQuery).toArray(function(err, docs) {
        if (err) {console.log(err)}
        
        else {
            console.log("Writing", docs.length, "documents as a result of this aggregation.");
            fs.writeFileSync('mongo_aggregation_result.JSON', JSON.stringify(docs, null, 4));
        }
        
        db.close();
        
    });

}); //MongoClient.connect