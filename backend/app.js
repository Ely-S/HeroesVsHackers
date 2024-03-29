var express 	= require('express');
var http 		= require('http');
var path 		= require('path');
var url 		= require('url');
var fs			= require('fs');
var login 		= require("./login/app.js");
var passport 	= require("./login/middleware");
var serveStatic = require('serve-static');

var person 		= require('./person');

var dataPath = "./data/data.json";

var app = express(),
	db = JSON.parse(fs.readFileSync(dataPath));

app.set('port', process.env.PORT || 3000);

// login system
login.set("redirectUrl", "http://localhost:3000/#loggedIn");
login.set("db", db);
login.set("getUser", function(username) {
	for (var i in db){
		if (db[i].name === username) {
			return db[i];
		}
	} 
	return false;
});

login.set("onlogin", function(user) {
	//check if user exists
	if(db[user.id]) {
		return;
	} else { 	//if not create new user
		db[user.id] = new person.Person(user.id, user.name);

		fs.writeFile(dataPath, JSON.stringify(db), function() {
			/*don't write anything to request. Request redirects in parent calling function
			res.send("successfully modified");*/
		});
	}
});


app.use("/auth", login);
app.use(passport.initialize());
app.use(passport.session());

// use req.isAuthenticated() to test if a user is authenticated

// holds clients waiting for updates
var connections = {};

app.get('/user', function(req, res){
	if (!req.isAuthenticated()) res.status(401).end();
	var content = db[req.params.id];

	if (content) {
		res.send(content);
	} else {
		res.status(404).end();
	}
});
///auth/login
app.put('/user/:id', function(req, res) {
	// var id = req.user.id;
	// var name = req.user.name;

	// db.push(new person.Person(id,name));
	// console.log(db);
});

/*app.get('/user.json', function(req, res){
  console.log(req.isAuthenticated());
  if(req.isAuthenticated()) {
	var user = db[req.user.id],
		person = new Person(user.id, user.name);
  	return res.json(person.to_JSON());
  } else {
	  return res.status(401).end()
  }
});

*/

app.get('/user/:id/:retailer', function(req, res) {
	var key = req.query['key']

	var id = req.params['id'];
	var retailer = req.params['retailer'];

	if(key) {
		var retailer = db[id].user_monsters.find(function(element){
			return element.company == retailer;
		});
		var points =  retailer.points;
		var percentage = retailer.percentage;
		//If the user never joined

		var stats = {
			"points" : points ,
			"percentage" : percentage 
		}

		res.send(stats);
	} else {
		res.sendStatus(401).end();
	}	
});

app.get("/update", function(req, res){
	connections[req.user.id] = req;
});

app.put('/user/:id/:retailer', function(req, res) {
	var key = req.query['key']
	var newPoints = req.query['points'];

	var id = req.params['id'];
	var retailer = req.params['retailer'];

	//Needs retailer authentication
	if(key) {
		db[id].user_monsters.find(function(element) {
			return element.company == retailer;
		}).points = newPoints;

		var con = connections[id]; 
		if (con) {
			connections[id].send(db[id]).end();
			delete(connections[id]);
		}

		fs.writeFile(dataPath, JSON.stringify(db), function() {
			res.send("successfully modified");			
		});

	} else {
		res.status(401).end();
	}
});

app.use(express.static('../frontend'));

http.createServer(app).listen(app.get('port'), function() {
	console.log('Server listening on port ' + app.get('port'));
});

/*
req.user = {
  "id": "1040256966025303",
  "displayName": "Eli Sako",
  "name": {},
  "provider": "facebook",
  "_raw": "{\"name\":\"Eli Sako\",\"id\":\"1040256966025303\"}",
  "_json": {
    "name": "Eli Sako",
    "id": "1040256966025303"
  }
}

*/
