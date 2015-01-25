module.exports = function(app, passport, jwt, secret) {
    var LocalStrategy = require('passport-local').Strategy;
    var Users = require('../models/UsersModel.js');

    passport.use(new LocalStrategy(function(username, password, done) {
        process.nextTick(function() {
            Users.findOne({
                'username': username
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }
                if (user.password != password) {
                    return done(null, false);
                }
                return done(null, user);
            });
        });
    }));


    app.get('/', function(req, res) {
        res.sendfile('./public/views/login.html');
    });

    app.get('/loginFailure', function(req, res, next) {
        res.send('Failure to authenticate');
    });

    app.post('/login', passport.authenticate('local'), function(req, res) {
        var token = jwt.sign(req.user.username, secret.secretToken, {
            expiresInMinutes: 60
        });
        res.json({
            token: token
        });
        res.redirect('/home');
    });

    app.post('/logout', function(req, res) {
        res.sendfile('./public/views/login.html');
    });

    app.get('/home', function(req, res, next) {
        res.sendfile('public/views/home.html');
    });
};
