var express = require('express')
  , serveStatic = require('serve-static')
  , passport = require("./middleware")
  , util = require('util')
  , logger = require('morgan')
  , session = require('express-session')
  , bodyParser = require("body-parser")
  , cookieParser = require("cookie-parser")
  , methodOverride = require('method-override');

var app = express();

// configure Express
  // app.use(logger());
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true  }));
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(serveStatic(__dirname + '/public'));

app.get('/user.json', function(req, res){
  console.log(req.isAuthenticated());
  if(req.isAuthenticated()) return res.send(req.user);
  return res.status(401).end()
});

// GET /auth/facebook
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Facebook authentication will involve
//   redirecting the user to facebook.com.  After authorization, Facebook will
//   redirect the user back to this application at /auth/facebook/callback
app.get('/login',
  passport.authenticate('facebook'),
  function(req, res){
    // The request will be redirected to Facebook for authentication, so this
    // function will not be called.
});


// GET /auth/facebook/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    app.get("onlogin")(req.user);
    res.redirect(app.get("redirectUrl"));
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


app.post('/login/login', function(req, res){
  var user = app.get("getUser")(req.params.username);
  if(user.password === req.params.password) {
    req.login(user, function(err) {
      return res.redirect(app.get("redirectUrl"));
    });
  }
  return res.status(401).end();
});

app.post('/login/signup', function(req, res){
  if(!app.get("getUser")(req.params.username)) {
    app.get("onlogin")({
      id: Math.floor((Math.random())*Math.pow(10, 17)),
      password: req.params.password,
      username: req.params.username
    });
    return res.status(401).end();
  }
  return res.status(200).end();
});

//app.listen(3000);


// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

module.exports = app;