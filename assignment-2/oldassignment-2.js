var fs = require('fs');
var cheerio = require('cheerio');
// var slice = require('node-slice');


var content = fs.readFileSync('data/file2.txt');

// I removed whitespace to see results more easily. Whitespace only ignored in XML mode
var $ = cheerio.load(content, {
    ignoreWhitespace: true,
    xmlMode: true
});


// $("tr").children().each(function(i, elem){
//     if($(elem).attr('style') == "border-bottom:1px solid #e3e3e3; width:260px"){
        
//         // I took the first half of my element and returned its value minus the content in between the two commas and removed the content after
//         // The firt ( with the split method
//         // I added " NY" back in to help accomodate for any addresses missing zip code
//         var firstHalf = $(elem).contents().get(6).nodeValue.trim().replace(/,.*,/, '').split(',')[0].split('(')[0] +" NY";
        
//         // I removed everything from the second half of my element except the last 5 digits (zip code)
//         // I'm assuming anything without a zip code will be searchable with other information
//         var secondHalf = $(elem).contents().get(8).nodeValue.trim().slice(-6);



//         console.log (firstHalf+secondHalf);
        
        
//     }
// });
// var allData = [];
// var idNumberData= [];
// var addressData = [];
// var floorData = [];
// var buildingData =[];
// var dayData = [];
// var groupData = [];
// var unknown = "No Information";






$("td").each(function(i, elem){
    //create dataObj object. Everything is going to go within this object
    var dataObj = new Object(); 
    // in order to be within the same object, i have to create this object within this conditional. As soon as I take it outside this loop, it appears as a second obect 




    function isEmpty (dataPiece, dataProName){
        //create an isempty function so that I don't have to repeat this on every element
        if (dataPiece) {
            dataObj[dataProName] = dataPiece; 
        } 
    
    }
    
    
   if ($(elem).attr('style') == "border-bottom:1px solid #e3e3e3;width:350px;"){
        var time =  $(elem).children().first();
        var days = [];
        
        // Loop to attach day to each meeting
              $(elem).children('b').each(function(j, dayElem){
                        //  loop to attach type to each day
                        // $(elem).children('b').each(function(i, typeElem){
                            var day = $(elem).text().trim().split('=').reverse().join("").split('   ');
                                isEmpty(day, "day");
                                
                                    // var building = $(elem).children().first().text().split(/['$]/).join("");
                                    
                                    isEmpty(building,"building");
        
                        //  });
              });
    
   } else if ($(elem).attr('style') == "border-bottom:1px solid #e3e3e3; width:260px" ){
       //This appears within the correct objects. My creation of day has to be outside and then come back in and stick it into the object? How will I loop? 
        //dayloop
    
        

        var building = $(elem).children().first().text().split(/['$]/).join("");
        isEmpty(building,"building");
        
        
        
        var group = $(elem).children('b').text().trim().split('-')[0].toLowerCase();
        isEmpty(group, "group");



        // Split splits a string in half [1] selects the correct index. Slice deletes space at beginning of text
        var floor =$(elem).contents().get(6).nodeValue.trim().split(',')[1].slice(1);
        // so floor doesn't get confused with zip code I tested for length and if it's an integer
            //  if (floor.length == 5 && parseInt(floor)){
                //  allData.push(unknown);
        // if floor is empty I want to fill array with unknown variable so everything stays the same length
            // } else {
                isEmpty(floor, "floor");
            

        // General address 
        var firstHalf = $(elem).contents().get(6).nodeValue.trim().replace(/,.*,/, '').split(',')[0].split('(')[0] +" NYC";
        
        
        
        var secondHalf = $(elem).contents().get(8).nodeValue.trim().slice(-6);
        
        
        
               isEmpty(firstHalf+secondHalf, "address");
               
        // addressData.push("BUILDING " + building + " GROUP: " + group+ "Address: " + firstHalf+secondHalf + addressNotes);
        
        
        // DAY AND TIME SECTION Inside meeting section
        
        //  var day = $(elem).nextAll().text();
        //  dataObj.day = day;
         
        } 
        
        
    // allData.push(dataObj);
    console.log(dataObj)

});


// console.log(allData);




// Make id number

// for (var j=1; j<addressData.length; j++){
//             var idNumber = 0;
//             idNumber = idNumber + j;
//             idNumberData.push(idNumber);
//         }






        //if day entry is bad (less than 3 letters), return null value, No information variable
        // if ($(elem).text().trim().split(' ')[0] == "Saturdays"){
        //     console.log ("Mondays");
        // };
        
        // $(elem).children().text().trim().split(' ')[0];
        // if (day.length<3){
        //     dayData.push(unknown);
        // } else { tempEmpty(day)}
        
        
        
        
        
        
        
  // if ($(elem).attr('style') == "border-bottom:1px solid #e3e3e3;width:350px;"){
    //     // var time =  $(elem).children().first();
        
    //     //Loop to attach day to each meeting
    //         //   $(elem).children('b').each(function(j, dayElem){
    //                      //loop to attach type to each day
    //                     // $(elem).children('b').each(function(i, typeElem){
    //                         // var type = $(elem).text().trim().split('=').reverse().join("").split('   ');
    //                         // if (type.length>3){
    //                         // allData.push(type);
    //                         // }
    //                     //  });
                        
    //                     // console.log ($(dayElem).html());
    //                     //  console.log('_________')
                        
    //                     // I need to revisit the text loop through I used today in major studio
                        
                        
    //              var day = $(elem).text().split('Meeting Type').join("").split('From').join("").split('to').join("").split(' ').join("").split('SpecialInterest').join("");
    //               if (day.length>3){
    //                   // Do I want my key to have many values? How will I connect the seperate time values then?
    //                   // Do I want to nest my addresses within my days? 
    //                 //   dayArray = []
                      
    //                 //   dayArray.push (day)
                      
    //                 //   isEmpty(day,"day")
    //                 dataObj.day = day;
    //                     console.log(dataObj)
    //               }
                  
                          
    //              var Time = $(elem).text().split('Meeting Type').join("").split('From').join("").split('to').join("").split(' ').join("").split('SpecialInterest').join("");
                  
    //             // var day = $(dayElem).text();
    //             // if(day.text =="Mon") { 
    //             //         console.log("Mon");
    //             //   }
                
    //         //   });


    
    //     var parsed = $(elem).remove().children('b');
    //     var time = $(elem).text().split('Meeting Type').join("").split('From').join("").split('to').join("").split(' ').join("").split('Special Interest').join("");
        
    //     var timeSecond = $(elem).contents().get(4).nodeValue;
        

        // }