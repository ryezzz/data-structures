// v2assignment-2.js
// DETAILS
// ACTIVITY
// v2assignment-2.js
// Sharing Info

// J
// General Info
// Type
// Javascript
// Size
// 5 KB (5,565 bytes)
// Storage used
// 5 KB (5,565 bytes)
// Location
// ryes_files
// Owner
// me
// Modified
// 6:20 PM by me
// Opened
// 12:34 AM by me
// Created
// 6:21 PM
// Description
// Add a description
// Download permissions
// Viewers can download

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

//CREATE OBJECT ARRAY FOR LATER EXPORT TO JSON
var dataObjArr = [];


//TARGET TIME ELEMENTS
//I'm trying to target all time elements and got the idea from Julian to target b:contains. I haven't used it successfully to loop
//through all times, though.

$("tbody").children().find('b:contains("From")').parent().each(function(i, elem){
// console.log($(elem).parent().next().text());
    
    
    
    
  //create an isempty function so that I don't have to repeat this on every element
  //This also returns a readible "unavailible"
    function isEmpty (dataPiece, dataProName){
        
        if (dataPiece) {
            //put string within dataObject
            dataObj[dataProName] = dataPiece; 
        } else {
            dataObj[dataProName] = "No " + [dataProName] + " listed";
        }
    
    }
    
    
    
    // if ($(elem).attr('style') == "border-bottom:1px solid #e3e3e3; width:260px" ){
            var dataObj = new Object();
//TIME/DAY - I can't get this to loop throught ALL times and days

//splits all elements from day/time TD into an array so that I can target them with an index
            var dayTime = $(elem)
                          .parent()
                          .next()
                          .next()
                          .text()
                          .split(' From ')
                          .join()
                          .split(' to ')
                          .join()
                          .split(' Meeting Type ')
                          .join()
                          .split("   ")
                          .join()
                          .split(' Special Interest ')
                          .join()
                          .replace("=", ":")
                          .split(',');

                        
                        //This targets the first day/time. I have to target all of them.

                            
                        var day = dayTime[0].trim();
                        var startTime = dayTime[1];
                        var endTime  = dayTime[2];
                        var meetingType = dayTime[3];
                        var special = dayTime[4];
                        
                        //Sends day/times to array
                        
                        
                            isEmpty (day, "day");
                            isEmpty (startTime, "start_time");
                            isEmpty (endTime, "end_time");
                            isEmpty (meetingType, "meeting_type");
                            isEmpty (special, "special_group");
                            

                        
                                            
                        // BUILDING
                        var building = $(elem)
                                        .children()
                                        .first()
                                        .text()
                                        .split(/['$]/)
                                        .join("");
                                        
                        isEmpty(building,"building");
                        
                        
                        //GROUP
                        var group = $(elem)
                                    // .children('b')
                                    .text().trim()
                                    .split('-')[0]
                                    .slice(0, -1)
                                    .toLowerCase()
                                    .replace(':ii', ':II');
                                    
                        isEmpty(group, "group");
                
                
                        // FLOOR
                        // Split splits a string in half [1] selects the correct index. Slice deletes space at beginning of text
                        var floor =$(elem)
                                    .parent()
                                    .contents()
                                    .get(6)
                                    .nodeValue.trim()
                                    .split(',')[1];
                                    // .slice(1);
                
                        isEmpty(floor, "floor");
                            
                
                
                        // GENERAL ADDRESS 
                        // var firstHalf = $(elem).parent()
                        //                 .contents()
                        //                 .get(6)
                        //                 .nodeValue.trim()
                        //                 .replace(/,.*,/, '')
                        //                 .split(',')[0]
                        //                 .split('(')[0] +" NYC";
                        
                        
                        
                        // var secondHalf = $(elem)
                        //                 .parent()
                        //                 .contents()
                        //                 .get(8)
                        //                 .nodeValue.trim()
                        //                 .slice(-6);
                        
                        // isEmpty(firstHalf+secondHalf, "address");
                       
                       
                              
                        // // DETAILS BOX
                        // var details = $(elem).children('div')
                        //                 .text()
                        //                 .slice(1)
                        //                 .slice(0, -1)
                        //                 .replace("*", "");   
                       
                        // isEmpty(details, "details");
                               
                        // // ACCESS
                        // var access = $(elem)
                        //             .children()
                        //             .last()
                        //             .text()
                        //             .slice(1)
                        //             .slice(0, -1);
                                    
                        // //tests for length
                        // if (access.length!=17) {
                        //     dataObj.access = ("no");
                        // } else {
                        //     dataObj.access = ("yes");
                        // };
                        
                        //push everything to data array so that I can then export to JSON
                        dataObjArr.push(dataObj);

                    // }
                
                
                });

console.log(dataObjArr)

require('fs').writeFile(
    './array.JSON',
    JSON.stringify(dataObjArr),
    function (err) {
        if (err) {
            console.error('error');
        }
    }
); 


  





     