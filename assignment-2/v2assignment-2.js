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
var dataObjArr = [];





//TD - Btags - contain the phrase "S From"
//






$("tbody").children().find('b:contains("From")').parent().each(function(i, elem){


// Time TD
// console.log($(elem).parent().children().next().text());

//Address TD
//console.log($(elem).parent().children().next().siblings().text());



    function isEmpty (dataPiece, dataProName){
        //create an isempty function so that I don't have to repeat this on every element
        if (dataPiece) {
            //put string within dataObject
            newDataObj[dataProName] = dataPiece; 
        } else {
            newDataObj[dataProName] = "No " + [dataProName] + " listed";
        }
    
    }
    
    
    
// if ($(elem).attr('style') == "border-bottom:1px solid #e3e3e3; width:260px" ){
        var dataObj = new Object();
//TIME/DAY - I can't get this to loop throught ALL times and days
        //  var dayTime = $(elem)
        //               .parent()
        //               .find('td')
        //               .eq(1)
        //               .html()
        //               .split('<br>')
        //               .next()
        //               .text()
        //               .split(' From ')
        //               .join()
        //               .split(' to ')
        //               .join()
        //               .split(' Meeting Type ')
        //               .join()
        //               .split("   ")
        //               .join()
        //               .split(' Special Interest ')
        //               .join()
        //               .replace("=", ":")
        //               .split(',');
        // console.log(dayTime);
//splits all elements from day/time TD into an array so that I can target them with an index
         var dayTime = $(elem)
                      .parent()
                      .find('td')
                      .eq(1)
                      .html()
                      .split('<br>');
                      
                    //   console.log(dayTime)
                      
        for(var i = 0; i<dayTime.length; i++){
            if(dayTime[i].match(/ From/g) !== null){
                var time = dayTime[i].match(/\d.+/gi);
                var day = dayTime[i].match(/Mondays|Tuesdays|Wednesdays|Thursdays|Fridays|Saturdays|Sundays/gi);
                var startTime = time.toString().slice("to</b>")[1].slice("<br/><b>")[1];
                var endTime = time.toString().slice(0, 8).trim();
                var newDataObj = new Object();
 
                isEmpty(endTime, "endTime")
                isEmpty(startTime, "StartTime")
                isEmpty(day, "day");
                isEmpty(time,"Time");
                
                
                var building = $(elem)
                        .parent()
                        .children()
                        .next()
                        .siblings()
                        .children()
                        .first()
                        .text()
                        .split(/['$]/)
                        .join("");
                        isEmpty(building,"building");
                        
                        
                var group = $(elem)
                    .parent()
                    .children()
                    .next()
                    .siblings()
                    .children('b')
                    .text().trim()
                    .split('-')[0]
                    .slice(0, -1)
                    .toLowerCase()
                    .replace(':ii', ':II');
                    
                    isEmpty(group, "group");
                    
                    
                    
                var floor = $(elem)
                    .parent()
                    .children()
                    .next()
                    .siblings()
                    .contents()
                    .get(6)
                    .nodeValue.trim()
                    .split(',')[1]
                    .slice(1);

                    isEmpty(floor, "floor");
                    
                    
                 // GENERAL ADDRESS 
                 var firstHalf = $(elem)
                        .parent()
                        .children()
                        .next()
                        .siblings()
                        .contents()
                        .get(6)
                        .nodeValue.trim()
                        .replace(/,.*,/, '')
                        .split(',')[0]
                        .split('(')[0] +" NYC";
                        
                        
                  var secondHalf = $(elem)
                        .parent()
                        .children()
                        .next()
                        .siblings()
                        .contents()
                        .get(8)
                        .nodeValue.trim()
                        .slice(-6);
        
                 isEmpty(firstHalf+secondHalf, "address");
       
       
              
                // DETAILS BOX
                      
                var details = $(elem)
                                .parent()
                                .children()
                                .next()
                                .siblings()
                                .children('div')
                                .text()
                                .slice(1)
                                .slice(0, -1)
                                .replace("*", "");   
               
                isEmpty(details, "details");
               
                // ACCESS
                
                var access = $(elem)
                             .parent()
                             .children()
                             .next()
                             .siblings()
                            .children()
                            .last()
                            .text()
                            .slice(1)
                            .slice(0, -1);
                            
                
                if (access.length!=17) {
                    newDataObj.access = ("no");
                } else {
                    newDataObj.access = ("yes");
                }
        
                 dataObjArr.push(newDataObj);
                      ///end of for loop                 
                    }
            
    
            
console.log(newDataObj)
        }
                      

        // Date.prototype.getHours()
        // Date.prototype.getMinutes()
                //This targets the first day/time. I have to target all of them.

                        //     console.log(dayTime);
                        
                        // // var day = dayTime[1].trim();
                        // var day = dayTime[0].trim();
                        // var startTime = dayTime[1].slice(0, 5).trim();
                        
                        // var startAMPM = dayTime[1].slice(-2);
                        // var endTime  = dayTime[2].slice(0, 5).trim();
                        // var endAMPM  = dayTime[2].slice(-2);
                        // var meetingType = dayTime[3];
                        // var special = dayTime[4];
                        
                      
                        //     isEmpty (day, "day");
                        //     isEmpty (startTime, "start_time");
                        //     isEmpty(startAMPM, "start_time_AMPM");
                        //     isEmpty (endTime, "end_time");
                        //     isEmpty (endAMPM, "end_time_AMPM");
                        //     isEmpty (meetingType, "meeting_type");
                        //     isEmpty (special, "special_group");
                        
      
        
 
        
    //     console.log(dataObj.length)
    // // //content of object
    // console.log (dataObjArr);
    // }


});

// console.log(dataObjArr)

require('fs').writeFile(
    './array.JSON',
    JSON.stringify(dataObjArr),
    function (err) {
        if (err) {
            console.error('error');
        }
    }
); 


  

// FINAL STEP - Make array.JSON file


 
   


// // Make id number

// // for (var j=1; j<addressData.length; j++){
// //             var idNumber = 0;
// //             idNumber = idNumber + j;
// //             idNumberData.push(idNumber);
// //         }






     