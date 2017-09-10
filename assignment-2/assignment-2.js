var fs = require('fs');
var cheerio = require('cheerio');

var content = fs.readFileSync('data/file2.txt');


var $ = cheerio.load(content, {
    ignoreWhitespace: true,
    xmlMode: true

});


$('h4').remove();
$('b').remove();
$('.detailsBox').remove();
$('span').remove();

for (var i=1; i<$('tr').length; i++){
    $('tr').children().eq(6*i).each(function(i, elem) {
    console.log($(elem).text());
});
}


