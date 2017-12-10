This is a web scraping of AA meetings in Manhattan. I started with a series of disorganized, difficult to read websites such as [this](http://visualizedata.github.io/datastructures/data/m01.html), parsed and mapped them. Here is the final product that shows the user meetings within in the next 24 hours: http://ec2-34-207-205-222.compute-1.amazonaws.com:3000/aa

<img width="602" alt="screen shot 2017-12-09 at 6 18 57 pm" src="https://user-images.githubusercontent.com/15457713/33800655-3bcc7d56-dd12-11e7-9c41-5f057e986451.png">

I parsed many more pieces of data than I decided to display on the map. Data such as "building" were repetitive, so I decided to remove them. 

<img width="396" alt="screen shot 2017-12-09 at 10 21 11 pm" src="https://user-images.githubusercontent.com/15457713/33801642-6f47e5ea-dd2f-11e7-86bc-e93c9875f75c.png">


[Here's](https://raw.githubusercontent.com/ryezzz/data-structures/master/aaMeetings/generatingmapfiles/app.js) my app and mongo query.

[Here's](https://raw.githubusercontent.com/ryezzz/data-structures/master/aaMeetings/finalparse.js
) my parsing code

[Here's](https://raw.githubusercontent.com/ryezzz/data-structures/master/aaMeetings/generatingmapfiles/index3.html) my final parsing of the data to get it ready for display.