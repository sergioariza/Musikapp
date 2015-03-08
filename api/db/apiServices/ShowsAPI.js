module.exports = function(app) {
    //Shows model
    var Shows = require('../models/ShowsModel.js');
    var expressJwt = require('express-jwt');
    var secret = require('../../secret.js');

    app.use('/shows', expressJwt({
        secret: secret.secretToken
    }));
    
    app.get('/shows/:user', function(req, res) {
        return Shows.find({
            "user": req.params.user
        }, function(err, shows) {
            if (!err) {
                return res.send(shows);
            } else {
                res.statusCode = 500;
                console.log('Internal error(%d): %s', res.statusCode, err.message);
                return res.send({
                    error: 'Server error'
                });
            }
        });
    });

    app.post('/shows', function(req, res) {
        var shows = new Shows({
            user: req.body.user,
            id: req.body.id,
            title: req.body.title,
            body: req.body.body,
            bandsWith: req.body.bandsWith,
            place: req.body.place,
            datePublished: req.body.datePublished,
            dateShow: req.body.dateShow,
            hourShow: req.body.hourShow,
            linkGoogleMaps: req.body.linkGoogleMaps,
            photoURL: req.body.photoURL
        });

        shows.save(function(err) {
            if (err) {
                console.log('Error while saving show: ' + err);
                res.send({
                    error: err
                });
                return;
            } else {
                console.log("Show created");
                return res.send({
                    status: 'OK',
                    shows: shows
                });
            }
        });
    });

    app.put('/shows', function(req, res) {
        return Shows.findOne({
            "user": req.body.user,
            "id": req.params.id
        }, function(err, shows) {
            if (!shows) {
                res.statusCode = 404;
                return res.send({
                    error: 'Not found'
                });
            }

            if (req.body.user) shows.user = req.body.user;
            if (req.body.id) shows.id = req.body.id;
            if (req.body.title) shows.title = req.body.title;
            if (req.body.body) shows.body = req.body.body;
            if (req.body.bandsWith) shows.bandsWith = req.body.bandsWith;
            if (req.body.place) shows.place = req.body.place;
            if (req.body.datePublished) shows.datePublished = req.body.datePublished;
            if (req.body.dateShow) shows.dateShow = req.body.dateShow;
            if (req.body.hourShow) shows.hourShow = req.body.hourShow;
            if (req.body.linkGoogleMaps) shows.linkGoogleMaps = req.body.linkGoogleMaps;
            if (req.body.photoURL) shows.photoURL = req.body.photoURL;

            return shows.save(function(err) {
                if (!err) {
                    console.log('Updated');
                    return res.send({
                        status: 'OK',
                        shows: shows
                    });
                } else {
                    if (err.name == 'ValidationError') {
                        res.statusCode = 400;
                        res.send({
                            error: 'Validation error'
                        });
                    } else {
                        res.statusCode = 500;
                        res.send({
                            error: 'Server error'
                        });
                    }

                    console.log('Internal error(%d): %s', res.statusCode, err.message);
                }

                res.send(shows);
            });
        });
    });

    app.delete('/shows/:user/:id', function(req, res) {
        return Shows.findOne({
            "user": req.params.user,
            "id": req.params.id
        }, function(err, shows) {
            if (!shows) {
                res.statusCode = 404;
                return res.send({
                    error: 'Not found'
                });
            }

            return shows.remove(function(err) {
                if (!err) {
                    console.log('Removed show');
                    return res.send({
                        status: 'OK'
                    });
                } else {
                    res.statusCode = 500;
                    console.log('Internal error(%d): %s', res.statusCode, err.message);
                    return res.send({
                        error: 'Server error'
                    });
                }
            });
        });
    });
};
