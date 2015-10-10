var express 	= require('express');
var http 		= require('http');
var path 		= require('path');
var url 		= require('url');
var fs			= require('fs');

var app = express(),
	db = JSON.parse(fs.readFileSync("./data/data.json"));

app.set('port', process.env.PORT || 3000);


app.get('/user/:id', function(req, res){
	var content = db[req.params.id];
	if (content) {
		res.send(content);
	} else {
		res.status(404).end();
	}
});

app.put('/', function(req, res) {

});

app.post('/', function(req, res) {

});

http.createServer(app).listen(app.get('port'), function() {
	console.log('Server listening on port ' + app.get('port'));
});