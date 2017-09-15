var fs = require('fs');
var cheerio = require('cheerio');
// var slice = require('node-slice');


var content = fs.readFileSync('data/file2.txt');

// I removed whitespace to see results more easily. Whitespace only ignored in XML mode
var $ = cheerio.load(content, {
    ignoreWhitespace: true,
    xmlMode: true
});


$("tr").children().each(function(i, elem){
    if($(elem).attr('style') == "border-bottom:1px solid #e3e3e3; width:260px"){
        
        // I took the first half of my element and returned its value minus the content in between the two commas and removed the content after
        // The firt ( with the split method
        // I added " NY" back in to help accomodate for any addresses missing zip code
        var firstHalf = $(elem).contents().get(6).nodeValue.trim().replace(/,.*,/, '').split(',')[0].split('(')[0] +" NY";
        
        // I removed everything from the second half of my element except the last 5 digits (zip code)
        // I'm assuming anything without a zip code will be searchable with other information
        var secondHalf = $(elem).contents().get(8).nodeValue.trim().slice(-6);



        console.log (firstHalf+secondHalf);
        
        
    }
});

//  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//      alphabet = alphabet.replace(/H.*S/, 'HS')
//         console.log(alphabet);

        // Figuring out the structure of everything: 
        // The index within the conditional returns the index associated with that particular element, the index outside
        // shows all the elements in $
        
        //  Thought program was interpreting ( as having special meaning so I added ! after each (. That made the program ineffective. secondHalf = secondHalf.replace(/(.*)/, ''); deletes everything after (
        //  I checked the type of data that secondHalf is using console.log(typeof secondHalf). It's a string so it should be targeted as a string
        //  secondHalf = secondHalf.replace(/(.*)/, ''); deletes everything after (
        // I logged the index and figured out that each third index is associated with the text I want to target
        // Figured out that the ( ) were being treated as a regular expresson and deleting that whole part. I added the \ before each to make them read as characters vs. expressions


       
        // I defined my two variables as the two parts of the program with the plan of console.logging them together eventually
        // I searched for a way of merging text between two characters in a string. 
        // was working off of this https://stackoverflow.com/questions/12582164/how-to-remove-a-substring-between-two-specific-characters
        // but I can't get it working when targeting elements within variables.
        // var secondHalf = ($(elem).contents().get(8).nodeValue.trim());
// $("td").each(function(i, elem){
    
//     if($(elem).attr('style') == "border-bottom:1px solid #e3e3e3; width:260px"){
//         console.log($(elem).contents().get(6).nodeValue.trim())
//     }
// });

// console.log (week3);


// $("tr").children().each(function(i, elem){
//     if($(elem).attr('style')=="border-bottomL:1px solid #e3e3e3; width:260px"){
//         var data1 = $(elem).contents().get(6).nodeValue
//         var data2 = $(elem).contents().get(8).nodeValue
        
// week3.push(data1.trim().split(',') [0])
//     }
// });

// console.log (week3);



// for (var i=1; i<$('tr').length; i++){
    
//     $('tr').children().each(function(i, elem) {
//     var firstParse = $(elem).children().html()
//     // console.log($(elem).contents().get(6).nodeValue)
//     console.log (firstParse);
// });
// }



// var str1 = 'The morning is upon us.', // the length of str1 is 23.
//     str2 = str1.slice(1, 8),
//     str3 = str1.slice(4, -2),
//     str4 = str1.slice(12),
//     str5 = str1.slice(30);
// console.log(str2); // OUTPUT: he morn
// console.log(str3); // OUTPUT: morning is upon u
// console.log(str4); // OUTPUT: is upon us.
// console.log(str5); // OUTPUT: ""

