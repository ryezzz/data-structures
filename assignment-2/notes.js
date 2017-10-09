var fs = require('fs');
var cheerio = require('cheerio');
// var slice = require('node-slice');


var content = fs.readFileSync('data/file2.txt');

// I removed whitespace to see results more easily. Whitespace only ignored in XML mode
var $ = cheerio.load(content, {
    ignoreWhitespace: true,
    xmlMode: true
});

//CREATE OBJECT OUTSIDE OF LOOP AND CONDITIONAL
var dataObj = new Object();

var arrayTest = []; 

// $("td").removeAttr('style') == "border-bottom:1px solid #dedede; width:90px;"


// $("td").children().next()(function(i, elem){
    
//     function isEmpty (dataPiece, dataProName){
//         //create an isempty function so that I don't have to repeat this on every element
//         if (dataPiece) {
//             //put string within dataObject
//             dataObj[dataProName] = dataPiece; 
//         } else {
//             dataObj[dataProName] = "No " + [dataProName] + " listed";
//         }
    
//     }

//     if ($(elem).attr('style') == "border-bottom:1px solid #e3e3e3; width:260px" ){
//         var dayTime = $(elem)
//                       .next()
//                       .text()
//                       .split(' From ')
//                       .join()
//                       .split(' to ')
//                       .join()
//                       .split(' Meeting Type ')
//                       .join()
//                       .split("   ")
//                       .join()
//                       .split(' Special Interest ')
//                       .join()
//                       .replace("=", ":")
//                       .split(',');
//         //turns into real array
//         var dayArray = Array.from(dayTime);
//         // console.log (dayTime); 
        
//                         //  isEmpty(dayTime, "test");
                       
//                       dayArray.forEach(function callback(currentValue, index, array) {
//                             // console.log(currentValue);
//                             console.log(index);
//                             // console.log(array);
//                             });
                      
                       
//                 //   dayArray.for(function(elem, j){
//                 //       console.log(j);
//                 //       isEmpty(elem[j], "test");
                      
//                 //       });
                        
//                         // dayTime.forEach(function callback(currentValue, index, array) {
//                         // dataObj.test = currentValue;

//                         // //your iterator
//                         // });
                       
//                     //   dayTime.each(function(i, elem){
                            
//                     //   console.log ($(elem).text());
                            
//         // console.log (dayTime);
//                         //This targets the first day/time. I have to target all of them.
                        
                    
//                         // var day = dayTime[0].replace(' ', '');
//                         // var startTime = dayTime[1];
//                         // var endTime  = dayTime[2];

                        
//                         //     isEmpty (day, "day");
//                         //     isEmpty (startTime, "start_time");
//                         //     isEmpty (endTime, "end_time");

//     }   
    
//     console.log(dataObj)
    
// });



// old prject structure
$("td").each(function(i, elem){
    
    //create dataObj object. Everything is going to go within this object
    // in order to be within the same object, i have to create this object within this conditional. As soon as I take it outside this loop, it appears as a second obect 



    function isEmpty (dataPiece, dataProName){
        //create an isempty function so that I don't have to repeat this on every element
        if (dataPiece) {
            //put string within dataObject
            dataObj[dataProName] = dataPiece; 
        } else {
            dataObj[dataProName] = "No " + [dataProName] + " listed";
        }
    
    }
    
    
   
    
if ($(elem).attr('style') == "border-bottom:1px solid #e3e3e3; width:260px" ){
    
    
//splits all elements from day/time TD into an array so that I can target them with an index
         var dayTime = $(elem)
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
                        var day = dayTime[0].replace(' ', '');
                        var startTime = dayTime[1];
                        var endTime  = dayTime[2];
                        var meetingType = dayTime[3];
                        var special = dayTime[4];
                        
                            isEmpty (day, "day");
                            isEmpty (startTime, "start_time");
                            isEmpty (endTime, "end_time");
                            isEmpty (meetingType, "meeting_type");
                            isEmpty (special, "special_group");
                        
                            // for (let j in dayTime) {
                            //         // var Daysarray = dayTime[j*5].indexOf("days");
                            //         // //  if (dayTime[j].indexOf("days")){
                            //              isEmpty (dayTime[j], "Day");
                            //      }
                                // }
        //                 .split(',')[1]
    //                 .slice(1);
    
    // timeBlock.forEach(function(times){
    //     console.log ("times")
    // });
    
    // timle
    
    // var day = $(elem).next().text().trim().split('=').reverse().join("").split('   ');
    // isEmpty(day, "day");
    
    // var type = $(elem).next().text().trim().split('=').reverse().join("").split('   ');
    // isEmpty(type, "type");
    
    // var special = $(elem).next().text().trim().split('=').reverse().join("").split('   ');
    // isEmpty(special, "special");
            //   });
        
    // }
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
                    .children('b')
                    .text().trim()
                    .split('-')[0]
                    .slice(0, -1)
                    .toLowerCase()
                    .replace(':ii', ':II');
                    
        isEmpty(group, "group");


        // FLOOR
        // Split splits a string in half [1] selects the correct index. Slice deletes space at beginning of text
        var floor =$(elem)
                    .contents()
                    .get(6)
                    .nodeValue.trim()
                    .split(',')[1]
                    .slice(1);

        isEmpty(floor, "floor");
            


        // GENERAL ADDRESS 
        var firstHalf = $(elem)
                        .contents()
                        .get(6)
                        .nodeValue.trim()
                        .replace(/,.*,/, '')
                        .split(',')[0]
                        .split('(')[0] +" NYC";
        
        
        
        var secondHalf = $(elem)
                        .contents()
                        .get(8)
                        .nodeValue.trim()
                        .slice(-6);
        
        isEmpty(firstHalf+secondHalf, "address");
       
       
              
        // DETAILS BOX
              
        var details = $(elem).children('div')
                        .text()
                        .slice(1)
                        .slice(0, -1)
                        .replace("*", "");   
       
        isEmpty(details, "details");
               
        // ACCESS
        
        var access = $(elem)
                    .children()
                    .last()
                    .text()
                    .slice(1)
                    .slice(0, -1);
                    
        
        if (access.length!=17) {
            dataObj.access = ("no");
        } else {
            dataObj.access = ("yes");
        };
        
        
    // //content of object
    console.log(dataObj)
    
}

});


// // Make id number

// // for (var j=1; j<addressData.length; j++){
// //             var idNumber = 0;
// //             idNumber = idNumber + j;
// //             idNumberData.push(idNumber);
// //         }






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






$("td").each(function(i, elem){

    function isEmpty (dataPiece, dataProName){
        //create an isempty function so that I don't have to repeat this on every element
        if (dataPiece) {
            //put string within dataObject
            dataObj[dataProName] = dataPiece; 
        } else {
            dataObj[dataProName] = "No " + [dataProName] + " listed";
        }
    
    }
    
    
    
if ($(elem).attr('style') == "border-bottom:1px solid #e3e3e3; width:260px" ){
        var dataObj = new Object();
//TIME/DAY - I can't get this to loop throught ALL times and days

//splits all elements from day/time TD into an array so that I can target them with an index
         var dayTime = $(elem)
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
        
        // Date.prototype.getHours()
        // Date.prototype.getMinutes()
                //This targets the first day/time. I have to target all of them.

                            
                        var day = dayTime[0]
                        var startTime = dayTime[1];
                        var endTime  = dayTime[2];
                        var meetingType = dayTime[3];
                        var special = dayTime[4];
                        
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
                    .children('b')
                    .text().trim()
                    .split('-')[0]
                    .slice(0, -1)
                    .toLowerCase()
                    .replace(':ii', ':II');
                    
        isEmpty(group, "group");


        // FLOOR
        // Split splits a string in half [1] selects the correct index. Slice deletes space at beginning of text
        var floor =$(elem)
                    .contents()
                    .get(6)
                    .nodeValue.trim()
                    .split(',')[1]
                    .slice(1);

        isEmpty(floor, "floor");
            


        // GENERAL ADDRESS 
        var firstHalf = $(elem)
                        .contents()
                        .get(6)
                        .nodeValue.trim()
                        .replace(/,.*,/, '')
                        .split(',')[0]
                        .split('(')[0] +" NYC";
        
        
        
        var secondHalf = $(elem)
                        .contents()
                        .get(8)
                        .nodeValue.trim()
                        .slice(-6);
        
        isEmpty(firstHalf+secondHalf, "address");
       
       
              
        // DETAILS BOX
              
        var details = $(elem).children('div')
                        .text()
                        .slice(1)
                        .slice(0, -1)
                        .replace("*", "");   
       
        isEmpty(details, "details");
               
        // ACCESS
        
        var access = $(elem)
                    .children()
                    .last()
                    .text()
                    .slice(1)
                    .slice(0, -1);
                    
        
        if (access.length!=17) {
            dataObj.access = ("no");
        } else {
            dataObj.access = ("yes");
        };
        
 
        dataObjArr.push(dataObj);
    // //content of object
    // console.log (dataObjArr);
    }


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


  

// FINAL STEP - Make array.JSON file


 
   


// // Make id number

// // for (var j=1; j<addressData.length; j++){
// //             var idNumber = 0;
// //             idNumber = idNumber + j;
// //             idNumberData.push(idNumber);
// //         }






         