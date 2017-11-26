
I'm going to see if there's a negative relationship between time spent at home and my mood by recording my activity with sensors. I'll be documenting activity in my apartment with an IR sensor and recording mood with a potentiometer.

![img_8515](https://user-images.githubusercontent.com/15457713/32155573-7571a5fa-bd0e-11e7-88a7-bc0964c4c642.JPG)

Here's the first set of data being sent to an SQL server from the two sensors: https://github.com/ryezzz/data-structures/blob/master/assignment-9/initialdata.txt

Here's the code I used to send the data. This app lives on an EC2 instance using PM2:
https://github.com/ryezzz/data-structures/blob/master/assignment-9/app.js

