My project isn't set in stone yet because I haven't experimented with the capabilities of my sensor, but I think I'm going to document my cleaning habits by placing an IR motion sensor beside my vacuum. I'm expecting to use the potentiometer to adjust the strength of the IR sensor. My database model will be denormalized in order to simplify querying. I'm expecting it to be a small data set (around 15 events). I'll only store data when my sensor returns "true."

<img width="535" alt="screen shot 2017-10-22 at 7 24 23 pm" src="https://user-images.githubusercontent.com/15457713/31867493-d07fd468-b75e-11e7-9273-29e2c0c77015.png">

Here's the code I used for my table:

**_How I created a table_**

CREATE TABLE movementData (
irMovement bool,
potentiometerStrength int,
sensorTime timestamp DEFAULT current_timestamp);


**_How I inserted items into the table:_**

INSERT INTO movementData(irMovement, potentiometerStrength, sensorTime)
VALUES (true, 4500, DEFAULT);


**_How I performed the query_**
SELECT *
FROM movementData