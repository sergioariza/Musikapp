// =================================================================
// Module dependencies =============================================
// =================================================================
var express 	= require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var jwt    = require('jsonwebtoken');
var secret = require('./api/secret.js').secret;
var mongoose = require('./db/mongo_database.js');
var path = require('path');
var Schema = mongoose.Schema;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// =================================================================
// DB Models =======================================================
// =================================================================
var UsersModel = require('./db/models/Users.js')(mongoose, Schema);
var NewsModel = require('./db/models/News.js')(mongoose, Schema);
var ShowsModel = require('./db/models/Shows.js')(mongoose, Schema);
var VideosModel = require('./db/models/Videos.js')(mongoose, Schema);

// =================================================================
// Config API Services =============================================
// =================================================================
// -----------------------------------------------------------------
// Get an instance of the router for api routes
// -----------------------------------------------------------------
var apiRoutes = express.Router();
// -----------------------------------------------------------------
// No middleware necessary since this isnt authenticated
// -----------------------------------------------------------------
var configUsersAPI = require('./api/Users.js')(app, UsersModel, jwt, secret, path);

// ---------------------------------------------------------
// Route middleware to authenticate and check token
// ---------------------------------------------------------
var verifyToken = function(req, res) {
	// check header or url parameters or post parameters for token
	var token = req.body.token || req.param('token') || req.headers['x-access-token'];
	// decode token
	if (token) {
		// verifies secret and checks exp
		jwt.verify(token, secret, function(err, decoded) {			
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });		
			} else {
				// if everything is good, save to request for use in other routes and return 200
				req.decoded = decoded;	
				return res.status(200).send({ 
					success: true,
					decoded: req.decoded
				});
			}
		});
	} else {
		// if there is no token
		// return an error
		return res.status(403).send({ 
			success: false, 
			message: 'No token provided.'
		});
	}
};

app.post("/verifyToken", function(req, res) {
	return verifyToken(req, res);
});

apiRoutes.use(function(req, res) {
	return verifyToken(req, res);
});

var configNewsAPI = require('./api/News.js')(app, apiRoutes, NewsModel);
var configShowsAPI = require('./api/Shows.js')(app, apiRoutes, ShowsModel);
var configVideosAPI = require('./api/Videos.js')(app, apiRoutes, VideosModel);

app.use(apiRoutes);

// =================================================================
// Start the server ================================================
// =================================================================
var port = process.env.PORT || 3001;
app.listen(port);
console.log('Musikapp started at http://localhost:' + port);