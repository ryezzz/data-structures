
<img width="713" alt="screen shot 2017-12-10 at 11 19 29 pm" src="https://user-images.githubusercontent.com/15457713/33815894-1c53ea9e-de03-11e7-9045-7bd4c72d25fc.png">

For this project, I recorded my movement and mood using two sensors and then sent the data to 
an SQL table [located within an EC2 instance here](http://ec2-34-207-205-222.compute-1.amazonaws.com:3000/s)


Here is my SQL query. I'm sorting by amount of movement, lowest to highest.

_SELECT EXTRACT(DAY FROM sensortime AT TIME ZONE 'America/New_York') as sensorday,
                EXTRACT(MONTH FROM sensortime AT TIME ZONE 'America/New_York') as sensormonth,
                count(*) as num_obs,
                avg(irmovement) as dailymovement,
                avg(potentiometerstrength) as dailymood
                FROM movementData
                GROUP BY sensorday, sensormonth
                ORDER BY dailymovement_

The full running application code is available [here](https://github.com/ryezzz/data-structures/blob/master/aaMeetings/generatingmapfiles/app.js). 
                
[Here](https://github.com/ryezzz/data-structures/blob/master/assignment-9/app.js) is the code that allowed me to insert my photon data into my SQL table.