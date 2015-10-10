var express 	= require('express');
var http 		= require('http');
var path 		= require('path');
var url 		= require('url');
var fs			= require('fs');

var app = express();

app.set('port', process.env.PORT || 3000);

app.get('/user/:id', function(req, res){
	var id = req.params.id;
	var path = './data/data.json';
	console.log(id);
	
	var content = fs.readFileSync(path);

	res.send(JSON.parse(content));
});


http.createServer(app).listen(app.get('port'), function() {
	console.log('Server listening on port ' + app.get('port'));
});