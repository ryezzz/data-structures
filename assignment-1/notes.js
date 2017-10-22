// console.log("hello world");
// var five = 2+3;

// console.log(five);s


var request = require('request');
// part of the node platform
var fs = require('fs');

request('http://visualizedata.github.io/datastructures/data/m01.html', function (error, response, body) {
//   Http request with a 200 status code - Everything great
// if everything is great do this
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/assignment-1/data/file1.txt', body);
  }
  else {console.error('request failed')}
})

// writing some data to a file

// functions (called methods) 

// callback function 

// module.js:491
//     throw err;
//     ^
// THIS MEANS MODULE HAS NOT BEEN INSTALLED (REQUEST MODULE)
// Error: Cannot find module 'request'
//     at Function.Module._resolveFilename (module.js:489:15)
//     at Function.Module._load (module.js:439:25)
//     at Module.require (module.js:517:17)
//     at require (internal/module.js:11:18)
//     at Object.<anonymous> (/home/ubuntu/workspace/test.js:7:15)
//     at Module._compile (module.js:573:30)
//     at Object.Module._extensions..js (module.js:584:10)
//     at Module.load (module.js:507:32)
//     at tryModuleLoad (module.js:470:12)
//     at Function.Module._load (module.js:462:3)

// DIRECTORY DOESN"T EXIST

// Error: ENOENT: no such file or directory, open '/home/ubuntu/workspace/data/thesis.txt'
//     at Object.fs.openSync (fs.js:652:18)
//     at Object.fs.writeFileSync (fs.js:1299:33)
//     at Request._callback (/home/ubuntu/workspace/test.js:15:8)
//     at Request.self.callback (/home/ubuntu/workspace/node_modules/request/request.js:188:22)
//     at emitTwo (events.js:125:13)
//     at Request.emit (events.js:213:7)
//     at Request.<anonymous> (/home/ubuntu/workspace/node_modules/request/request.js:1171:10)
//     at emitOne (events.js:115:13)
//     at Request.emit (events.js:210:7)
//     at IncomingMessage.<anonymous> (/home/ubuntu/workspace/node_modules/request/request.js:1091:12)

// FS MODULE IS ALREADY INSTALLED


//     // function createFiles(foo) {
    // var request = require('request');
    //     // part of the node platform
    //     var fs = require('fs');
    
    //     request(links[i], function (error, response, body) {

    //      if (!error && response.statusCode == 200) {
    //      fs.writeFileSync('/home/ubuntu/workspace/assignment-1/data/file'+ i-- +'.txt', body);
    //     //  I used this console.log to figure out that "i" was looping at it's maximum value thereby overwriting the data file each ti
    //     // I solved this by subtracting one from i on each loop
    //      console.log(i);
    //      }
    //      else {console.error('request failed')}
        
    //     })
    // }
        
       
       
       
    //   for (var i=0; i<links.length; i++){
    
    //     createFiles(i);
    //     // console.log("loop"+i);    
    // }
    
  var test = function (callback) {
  return callback();  
  console.log('test'); //shouldn't be printed
}

var test2 = function(callback){
  callback();
  console.log('test2') //printed 3rd
}

test(function(){
  console.log('callback1') //printed first
  test2(function(){
  console.log('callback2') //printed 2nd
  })
});


// var test = function (callback) {
//   return callback();  
//   console.log('test') //shouldn't be printed
// }

// var test2 = function(callback){
//   callback();
//   console.log('test2') //printed 2nd
// }

// test(function(){
//   console.log('callback1') //printed first
//   test2(function(){
//     setTimeout(function(){
//       console.log('callback2') //printed 3rd
//     },100)
//   })
// });


nod