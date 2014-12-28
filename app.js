/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/MyDatabase');
var app = express();

// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(passport.initialize());
app.use(passport.session()); 
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var Schema = mongoose.Schema;

var UserDetail = new Schema({
    username: String,
    password: String
}, {collection: 'userInfo'});

var UserDetails = mongoose.model('userInfo', UserDetail);

var infoUser = null;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


passport.use(new LocalStrategy(
  function(username, password, done) {
    process.nextTick(function () {
    UserDetails.findOne({'username':username},
    function(err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (user.password != password) { return done(null, false); }
      return done(null, user);
    });
    });
  }
));

app.get('/', function(req, res) {
  res.sendfile('login.html');
});

app.get('/loginFailure' , function(req, res, next){
  res.send('Failure to authenticate');
});

app.get('/home' , function(req, res, next){
  res.sendfile('public/views/home.html');
});

app.post('/login',
  passport.authenticate('local'), function(req, res){
    infoUser = req.user;
    res.redirect('/home');
});

app.post('/logout', function(req, res){
  infoUser = null;
  res.sendfile('login.html');
});

app.get('/loggedin', function(req, res){
  res.send(infoUser ? infoUser : '0');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});