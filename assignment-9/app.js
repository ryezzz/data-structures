var request = require('request');
const { Client } = require('pg');

// PARTICLE PHOTON
var device_id = process.env.PHOTON_ID;
var access_token = process.env.PHOTON_TOKEN;
var particle_variable = 'json';

var device_url = 'https://api.particle.io/v1/devices/' + device_id + '/' + particle_variable + '?access_token=' + access_token;


// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user ='ryez';
db_credentials.host = process.env.AWSRDS_EP;
db_credentials.database = 'zupar';
db_credentials.port = 5432;
db_credentials.password = process.env.AWSRDS_PW;



console.log (db_credentials);
var getAndWriteData = function() {
    // Make request to the Particle API to get sensor values
    request(device_url, function(error, response, body) {
        // Store sensor values in variables
        var device_json_string = JSON.parse(body).result;
        var potentiometer = JSON.parse(device_json_string).potentiometer;
        var ir_sensor = JSON.parse(device_json_string).ir_sensor;

        // Connect to the AWS RDS Postgres database
        const client = new Client(db_credentials);
        client.connect();

        // Construct a SQL statement to insert sensor values into a table
        var thisQuery = "INSERT INTO movementData(" + "irMovement" + "," + "potentiometerStrength" + "," + "sensorTime" +")"+"VALUES"+"(" + ir_sensor + "," + potentiometer +","+ "DEFAULT" + ");";

        // Construct a SQL statement to insert sensor values into a table
        console.log(thisQuery); // for debugging

        // Connect to the AWS RDS Postgres database and insert a new row of sensor values
        client.query(thisQuery, (err, res) => {
            console.log(err, res);
            client.end();
        });
    });
};

// Modify interval argement
// write a new row of sensor data every five minutes
// processing needs to happen on photon - chaning the value of signal and holding it for 5 seconds - hold for 1 minutes
// every second is okay


// environment variables in assignment 3 - go straignt into linux terminal



setInterval(getAndWriteData, 30000);
