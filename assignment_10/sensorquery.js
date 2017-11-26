var express = require('express'),
    app = express();
const { Pool } = require('pg');

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user ='ryez';
db_credentials.host = process.env.AWSRDS_EP;
db_credentials.database = 'zupar';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

app.get('/', function(req, res) {
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
        
        
    // var q = `SELECT EXTRACT(DAY FROM sensortime AT TIME ZONE 'America/New_York') as sensorday, 
    //          EXTRACT(MONTH FROM sensortime AT TIME ZONE 'America/New_York') as sensormonth, 
    //          count(*) as num_obs, 
    //          max(lightsensor) as max_light, 
    //          min(lightsensor) as min_light,
    //          max(tempsensor) as max_temp, 
    //          min(tempsensor) as min_temp
    //          FROM sensordata 
    //          GROUP BY sensormonth, sensorday;`;
             
    client.connect();
    client.query(q, (qerr, qres) => {
        res.send(qres.rows);
        console.log('responded to request');
    });
    client.end();
});

app.listen(3000, function() {
    console.log('Server listening...');
});