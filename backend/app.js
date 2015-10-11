var express 	= require('express');
var http 		= require('http');
var path 		= require('path');
var url 		= require('url');
var fs			= require('fs');

var person 		= require('./person');

var app = express(),
	db = JSON.parse(fs.readFileSync("./data/data.json"));

app.set('port', process.env.PORT || 3000);


app.get('/user', function(req, res){
	var content = db[req.user.id];
	if (content) {
		res.send(content);
	} else {
		res.status(404).end();
	}
});

app.put('/user/:id', function(req, res) {
	// var id = req.user.id;
	// var name = req.user.name;

	// db.push(new person.Person(id,name));
	// console.log(db);
});

app.put('/user/:id/:retailer', function(req, res) {
	var key = req.query['key']
	var newPoints = req.query['points'];

	var id = req.params['id'];
	var retailer = req.params['retailer'];

	//Needs retailer authentication
	if(key) {
		db[id].user_monsters.find(function(element){
			return element.company == retailer;
		}).points = newPoints;

		fs.writeFile("./data/data.json", JSON.stringify(db), function() {
			res.send("successfully modified");			
		});

	} else {
		res.status(401).end();
	}
});

http.createServer(app).listen(app.get('port'), function() {
	console.log('Server listening on port ' + app.get('port'));
});