//Module dependencies
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var passport = require('passport');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('./api/db/mongo_database.js');
var secret = require('./api/secret.js');

//All environments
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
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/'));

//Development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

//Config API Services
var configLoginAPI = require('./api/db/apiServices/LoginAPI.js')(app, passport, jwt, secret);
var configNewsAPI = require('./api/db/apiServices/NewsAPI.js')(app);
var configShowsAPI = require('./api/db/apiServices/ShowsAPI.js')(app);
var configVideosAPI = require('./api/db/apiServices/VideosAPI.js')(app);

app.use(function(err, req, res, next) {
    if (err.constructor.name === 'UnauthorizedError') {
        res.status(401).send('Unauthorized');
    }
});

//PassportJS main config
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

//Server creation
http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
