var async = require('async'); // npm install async
var fs = require('fs');

var links = ['http://visualizedata.github.io/datastructures/data/m01.html',  
             'http://visualizedata.github.io/datastructures/data/m02.html', 
             'http://visualizedata.github.io/datastructures/data/m03.html',  
             'http://visualizedata.github.io/datastructures/data/m04.html',  
             'http://visualizedata.github.io/datastructures/data/m05.html',  
             'http://visualizedata.github.io/datastructures/data/m06.html',  
             'http://visualizedata.github.io/datastructures/data/m07.html',  
             'http://visualizedata.github.io/datastructures/data/m08.html',  
             'http://visualizedata.github.io/datastructures/data/m09.html',  
             'http://visualizedata.github.io/datastructures/data/m10.html' ]
            // dfd   f
            
  var request = require('request');
         var fs = require('fs');
         request(links[0], function (error, response, body) {
          if (!error && response.statusCode == 200) {
          fs.writeFileSync('/home/ubuntu/workspace/assignment-1/data/file'+ 1 +'.txt', body);
          }
          else {console.error('request failed')}
         })
         
  var request = require('request');
         var fs = require('fs');
         request(links[1], function (error, response, body) {
          if (!error && response.statusCode == 200) {
          fs.writeFileSync('/home/ubuntu/workspace/assignment-1/data/file'+ 2 +'.txt', body);
          }
          else {console.error('request failed')}
         })
        
  var request = require('request');
         var fs = require('fs');
         request(links[2], function (error, response, body) {
          if (!error && response.statusCode == 200) {
          fs.writeFileSync('/home/ubuntu/workspace/assignment-1/data/file'+ 3 +'.txt', body);
          }
          else {console.error('request failed')}
         })

  var request = require('request');
         var fs = require('fs');
         request(links[3], function (error, response, body) {
          if (!error && response.statusCode == 200) {
          fs.writeFileSync('/home/ubuntu/workspace/assignment-1/data/file'+ 4 +'.txt', body);
          }
          else {console.error('request failed')}
         })

  var request = require('request');
         var fs = require('fs');
         request(links[4], function (error, response, body) {
          if (!error && response.statusCode == 200) {
          fs.writeFileSync('/home/ubuntu/workspace/assignment-1/data/file'+ 5 +'.txt', body);
          }
          else {console.error('request failed')}
         })

  var request = require('request');
         var fs = require('fs');
         request(links[5], function (error, response, body) {
          if (!error && response.statusCode == 200) {
          fs.writeFileSync('/home/ubuntu/workspace/assignment-1/data/file'+ 6 +'.txt', body);
          }
          else {console.error('request failed')}
         })


  var request = require('request');
         var fs = require('fs');
         request(links[6], function (error, response, body) {
          if (!error && response.statusCode == 200) {
          fs.writeFileSync('/home/ubuntu/workspace/assignment-1/data/file'+ 7 +'.txt', body);
          }
          else {console.error('request failed')}
         })

  var request = require('request');
         var fs = require('fs');
         request(links[7], function (error, response, body) {
          if (!error && response.statusCode == 200) {
          fs.writeFileSync('/home/ubuntu/workspace/assignment-1/data/file'+ 8 +'.txt', body);
          }
          else {console.error('request failed')}
         }) 
        
  var request = require('request');
         var fs = require('fs');
         request(links[8], function (error, response, body) {
          if (!error && response.statusCode == 200) {
          fs.writeFileSync('/home/ubuntu/workspace/assignment-1/data/file'+ 9 +'.txt', body);
          }
          else {console.error('request failed')}
         })
        
  var request = require('request');
         var fs = require('fs');
         request(links[9], function (error, response, body) {
          if (!error && response.statusCode == 200) {
          fs.writeFileSync('/home/ubuntu/workspace/assignment-1/data/file'+ 10 +'.txt', body);
          }
          else {console.error('request failed')}
         })
    
