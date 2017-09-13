var fs = require('fs');
var cheerio = require('cheerio');

var content = fs.readFileSync('data/file2.txt');

console.log(content);
var $ = cheerio.load(content, {
    ignoreWhitespace: true,
    xmlMode: true

});


// npm install cheerio

var fs = require('fs');
var cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
var content = fs.readFileSync('data/thesis.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);

$.kitties = ["rye", "zupancis"];
console.log($);

console.log (content);
// print names of thesis students
$('h3').each(function(i, elem) {
    console.log($(elem).text());
});

// print project titles
$('td').each(function(i, elem) {
    console.log($(elem).text());
    console.log(content);
});