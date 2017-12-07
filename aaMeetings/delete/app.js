var express = require('express'),
    app = express();
var fs = require('fs');

// var moment = require('moment-timezone'); 

// Postgres
const { Pool } = require('pg');
var db_credentials = new Object();
db_credentials.user = 'ryez';
db_credentials.host = process.env.AWSRDS_EP;
db_credentials.database = 'zupar';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

// Mongo
var collName = 'aadatafiles';
var MongoClient = require('mongodb').MongoClient;
var url = process.env.ATLAS;



// HTML wrappers for AA data
var index1 = fs.readFileSync("index1.txt");
var index3 = fs.readFileSync("index3.txt");

app.get('/s', function(req, res) {
    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);

    // SQL query
    var q = `SELECT EXTRACT(DAY FROM sensortime AT TIME ZONE 'America/New_York') as sensorday,
                EXTRACT(MONTH FROM sensortime AT TIME ZONE 'America/New_York') as sensormonth,
                count(*) as num_obs,
                avg(irmovement) as dailymovement,
                avg(potentiometerstrength) as dailymood
                FROM movementData
                GROUP BY sensorday, sensormonth;`;

    client.connect();
    client.query(q, (qerr, qres) => {
        res.send(qres.rows);
        console.log('responded to request');
    });
    client.end();
});

app.get('/aa', function(req, res) {

    MongoClient.connect(url, function(err, db) {
        if (err) {return console.dir(err);}

        var dateTimeNow = new Date();
        var sun = 3;
        // console.log(dateTimeNow)
        var today = dateTimeNow.getDay();
        console.log(sun.getDay())
        var tomorrow;
        if (today == 6) {tomorrow = 0;}
        else {tomorrow = today + 1}
        var hour = dateTimeNow.getHours();

        var collection = db.collection(collName);

        collection.aggregate([ // start of aggr egation pipeline
            // match by day and time
            { $match :
                { $or : [
                    { $and: [
                        
                        //$gte is greater than
                        
                        //  { day : "Monday" } , { startTimeHour : 10 }
                        { day : "Thursday" }
                    ]},
                    { $and: [
                        
                        //    { day : "Monday" } , { startTimeHour : 10 }

                        { day : "Saturday" }
                    ]}
                ]}
            },
            //Add sort stage ascending decending sort
            
            //single for loop
            

            // group by meeting group
            { $group : { _id : {
                //it's challenging to have my meeting name as group
                latLong : "$latLong",
                meetingGroup : "$group",
                // zone : "$zone",
                // floor : "$floor",
                address : "$address",
                // building : "$building",
                // zone : "$zone",
                // details : "$details",
                access : "$access",
                // meetingType: "$meetingType",
                // day:"$day",
                // startTimeHour:"$startTimeHour",
                // startTimeMinute:"$startTimeMinute"
                },
                     meetingDay : { $push : "$day"
                     },
                    // day : "$_id.day"
                    startTimeHour : { $push : "$startTimeHour" },
                    startTimeMinutes : { $push : "$startTimeMinute" }
                // meetingType : { $push : "$meetingType" }
            }
            },
            
            
            
            // group meeting groups by latLong
            {
                $group : { _id : { 
                    latLong : "$_id.latLong",
                    // meetingGroup2 : "$_id.meetingGroup"
                },
                
                                    meetingGroups : { $push : {groupInfo : "$_id" , meetingDay : "$meetingDay", startTimeHour : "$startTimeHour", startTimeMinutes : "$startTimeMinutes"}},

                    // meetingGroups : { $push : {groupInfo : "$_id" , meetingDay : "$meetingDay"}},
                    // meetingGroups : { $push : {groupInfo : "$_id" , startTimeHour: "$startTimeHour", startTimeMinutes : "$startTimeMinutes"}},
                   
                    // meetingGroups : { $push :"$group" }

                    // meetingGroups : { $push : {groupZone: "$zone"}}
                }
            },
            
            
            
        //   function loopthrough(thingforlooping) {
            
        //     thingforlooping.forEach (function(d){
        //         return thingforlooping;
        //     });
            
        //   }
            
            
            // group meeting by groups
            // {
                
            
            // $group : { _id : { 
            //         meetingGroup : "$_id.meetingGroup"
                
            // },
            //         meetingGroups : { $push : {groupInfo : "$_id" }}

            //         // meetingGroups : { $push : {groupZone: "$zone"}}
            
            //   }
            // }
            

            
            
            
            
            
            
            ]).toArray(function(err, docs) { // end of aggregation pipeline
            if (err) {console.log(err)}

            else {
                res.writeHead(200, {'content-type': 'text/html'});
                res.write(index1);
                res.write(JSON.stringify(docs));
                res.end(index3);
            }
            db.close();
        });
    });

});

app.listen(process.env.PORT, function() {
// app.listen(3000, function() {
    console.log('Server listening...');
});
