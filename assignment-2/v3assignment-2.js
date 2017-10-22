var fs = require('fs');
var request = require('request'); // npm install request
var cheerio = require('cheerio');
// var slice = require('node-slice');


var content = fs.readFileSync('data/file2.txt');

// I removed whitespace to see results more easily. Whitespace only ignored in XML mode
var $ = cheerio.load(content, {
    ignoreWhitespace: true,
    xmlMode: true
});

//CREATE OBJECT OUTSIDE OF LOOP AND CONDITIONAL
var meetings = [];


$("tbody").find('tr').each(function(i, row) {
    // iterating through rows, aka meetings
    var thisMeeting = new Object();
    thisMeeting.eventname = 'item ' + i;

    // TODO event name

    // TODO event description

    thisMeeting.meetingTimesArray = [];

    var firstCell = $(row).find('td').eq(0);
    var secondCell = $(row).find('td').eq(1);
    var meetingsSplit = secondCell.html().split(' <br/> <br/> <b>');

    // iterating over meeting times
    for (var t = 0; t < meetingsSplit.length; t++) {
        var thisDay = new Object();
        // thisDay.raw = meetingsSplit[t];
        // thisDay.time= timeparsed;
        thisDay.day = meetingsSplit[t].split('From').toString();
        // thisDay.meetingType = typeParsed;
        // thisDay.specialIntrest = intParsed;
        // console.log("meeting " + i + ' time ' + t + " : " + meetingsSplit[t]);
        thisMeeting.meetingTimesArray.push(thisDay);

    }
    // TODO find way to iterate over meeting times {
    //var thisMeetingTime = new Object ();
    //thisMeetingTime.day =
    //thisMeetingTime.start =

    //thisMeeting.meetingTimesArray.push(thisMeetingTime);
    // }




    meetings.push(thisMeeting);
    
    console.log (meetings);
});

// });





require('fs').writeFile('./array.JSON', JSON.stringify(meetings, null, 1),
    function(err) {
        if (err) {
            console.error('error');
        }
    }
);
