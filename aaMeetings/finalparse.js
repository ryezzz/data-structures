var fs = require('fs');
var request = require('request'); // npm install request
var cheerio = require('cheerio');
// var slice = require('node-slice');

var meetings = [];
// So, I have to turn 
for( var i =1; i<11; i++){
var content = fs.readFileSync('data/file' + i + '.txt');
var zone = i;
// var content = fs.readFileSync('data/file2.txt');

// I removed whitespace to see results more easily. Whitespace only ignored in XML mode
var $ = cheerio.load(content, {
    ignoreWhitespace: true,
    xmlMode: true
});


    // function isEmpty (dataPiece, dataProName){
        
    //     if (dataPiece) {
    //         //put string within dataObject
    //         dataObj[dataProName] = dataPiece; 
    //     } else {
    //         dataObj[dataProName] = "No " + [dataProName] + " listed";
    //     }
    
    // }
    
//CREATE OBJECT OUTSIDE OF LOOP AND CONDITIONAL

///Plan: base everything off of the individual times: make an indvidual time for every meeting
function oneZoneParse(){
        
        
        
    
        $("tbody").find('tr').each(function(i, row) {
            // iterating through rows, aka meetings
            var thisMeeting = new Object();
            thisMeeting.eventname = 'item ' + i;
        
            thisMeeting.meetingTimesArray = [];
        
            var firstCell = $(row).find('td').eq(0);
            var secondCell = $(row).find('td').eq(1);
            var meetingsSplit = secondCell.html().split(' <br/> <br/> <b>');
        
            // iterating over meeting times
            for (var t = 0; t < meetingsSplit.length; t++) {
                var thisMeetingtimefirst = new Object();
        
                
                var secondCellIterated = meetingsSplit[t];
                
                thisMeetingtimefirst.zone = zone;
                thisMeetingtimefirst.group = firstCell
                                            .html()
                                            .split('</h4><br/> <b>').pop().split('-').shift()
                                            .split(' <h4 style="margin:0;padding:0;"/><br/> <b>').pop().split(')').shift()
                                            .replace('42nd AT 9:00pm ', 'undefined')
                                            .replace('(', '')
                                            .trim()
        
                                var firstHalf = firstCell
                                                .contents()
                                                .get(6)
                                                .nodeValue
                                                .trim()
                                                .replace(/,.*,/, '')
                                                .split(',')[0]
                                                .split('(')[0] +" NYC";
                                                
                                            
                              var secondHalf = firstCell
                                              .contents()
                                              .get(8)
                                              .nodeValue
                                              .trim()
                                              .slice(-6);
                                            
                var address = firstHalf+secondHalf;
                thisMeetingtimefirst.address = address.replace('65 East 89th Street - Rectory basement NYC', '65 East 89th Street NYC')
                //701 West 168th Street @ Fort Washington Avenue NYC 10032
                
                
               thisMeetingtimefirst.building = firstCell
                                              .html()
                                              .split(' <h4 style="margin:0;padding:0;">').pop().split('</h4><br/> <b>')
                                              .shift()
                                              .split(' <h4 style="margin:0;padding:0;"/>')[0]
                                              
        
        
                   thisMeetingtimefirst.floor = firstCell
                                             .contents()
                                             .get(6)
                                             .nodeValue.trim()
                                             .split(',')[1]
                                             .slice(1);
                                             
                       
            thisMeetingtimefirst.meetingType = secondCellIterated
                                    .split(' <br/><b>Meeting Type</b> ')
                                    .pop()
                                    .split('<br/><b>Special Interest</b>')[0]
                                    .replace(" <br/> <br/>", "")
                                    .split(' <b>')
                                    .pop()
                                    .split('M ')
                                    .shift()
                                    .split('to</b>')[0];
                                    
                                    
                                    
                                 var specialIntrest = secondCellIterated
                                                    //   .replace('</b> Topic ', "Topic:")
        
                                                      .split('<b>Special Interest</b> ')
                                                      .pop()
                                                      .split(" <br/> <br/> ")
                                                      .shift()
                                                      .split('</b>')[0]
                                                      .split('From')
                                                      .pop()
                                 
   
                              
                              
                     thisMeetingtimefirst.details = firstCell.html()
                                              .split('<div class="detailsBox"> ')
                                              .pop()
                                              .split("</div> ")
                                              .shift()
                                              .split('<h4 style="margin:0;padding:0;">')[0]
                                              .replace('<br/>', '')
                                              .split('<h4 style="margin:0;padding:0;"/>')[0]
                                            // //   var details = $(elem).children('div')
                                            //     .text()
                                            //     .slice(1)
                                            //     .slice(0, -1)
                                            //     .replace("*", "");   
                                    
                            // if(meetingType){
                            // console.log(meetingType)
                            // // thisMeetingtimefirst.meeting_type
                            // }
                         ////Access 
                         var wheel = firstCell.html().split('alt="').pop().split('" width="20"').shift();
                        //  console.log(wheel)
                         if(wheel.toLowerCase()=="wheelchair access"){
                            thisMeetingtimefirst.access = "Yes";
                         } else {thisMeetingtimefirst.access = "No"}
                    //  }                           // .slice(1)
                    //                             // .split(' <br/> <br/> ', '')[1];
                                                        
                                                
                var starttimeFull =secondCellIterated.split(' From</b> ').pop().split(' <b>to</b> ').shift().split(':');
                var starttimeAMPM = starttimeFull[1].split(' ')
                var hour = +starttimeFull[0]
                var minute = starttimeAMPM[0]
                 
                
              
              function make24(ampm, hr, min){
                  
                 if(ampm[1] === "PM" && hr!=12){
                     return hr+12;
                 } else {
                     return hr}
                }
               
               
               
              var startHour = make24(starttimeAMPM, hour, minute)
              var startMinute = make24(starttimeAMPM, hour, minute)
              
                thisMeetingtimefirst.day = secondCellIterated.split('s From</b> ')[0]
                                                             .replace(' <b>', '')
              thisMeetingtimefirst.startTimeHour = (make24(starttimeAMPM, hour, minute))
              
              thisMeetingtimefirst.startTimeMinute = +minute

              
              
            //   thisMeetingtimefirst.endtime = secondCellIterated.split('to</b> ').pop().split(' <br/>').shift();
                
                //  console.log ("SINGLE MEETING ________________________::::::");
                //  console.log(thisMeetingtimefirst);
                // thisDay.meetingType = typeParsed;
                // thisDay.specialIntrest = intParsed;
                // console.log("meeting " + i + ' time ' + t + " : " + meetingsSplit[t]);
                meetings.push(thisMeetingtimefirst);
        
            }
        
        
    //   console.log ("SINGLE MEETING ________________________::::::");
        // TODO find way to iterate over meeting times {
        //var thisMeetingTime = new Object ();
        //thisMeetingTime.day =
        //thisMeetingTime.start =
    
        //thisMeeting.meetingTimesArray.push(thisMeetingTime);
        // }
    
    
    
    
        // meetings.push(thisMeeting);
        
    });
        //  console.log(meetings);
}

// });


oneZoneParse();

}

require('fs').writeFile('./array.JSON', JSON.stringify(meetings, null, 1),
    function(err) {
        if (err) {
            console.error('error');
        }
    }
);
