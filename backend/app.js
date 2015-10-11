var express 	= require('express');
var http 		= require('http');
var path 		= require('path');
var url 		= require('url');
var fs			= require('fs');
var login 		= require("./login/app.js");
var passport 	= require("./login/middleware");


var app = express(),
	db = JSON.parse(fs.readFileSync("./data/data.json"));

app.set('port', process.env.PORT || 3000);

// login system
login.set("redirectUrl", "http://localhost:3000/#loggedIn")
app.use("/auth", login);
app.use(passport.initialize());
app.use(passport.session());

// use req.isAuthenticated to test if a user is authenticated

app.get('/user', function(req, res){
	if (!req.isAuthenticated) res.status(405).end();
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
