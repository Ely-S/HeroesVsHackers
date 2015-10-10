var express 	= require('express');
var http 		= require('http');
var path 		= require('path');
var url 		= require('url');

var app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){
	res.status(200).send('some res');
});

http.createServer(app).listen(app.get('port'), function() {
	console.log('Server listening on port ' + app.get('port'));
});