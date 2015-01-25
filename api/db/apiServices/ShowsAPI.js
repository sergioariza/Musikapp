module.exports = function(app) {
    //Shows model
    var Shows = require('../models/ShowsModel.js');

    app.get('/shows', function(req, res) {
        return Shows.find(function(err, shows) {
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
            id: req.body.id,
            name: req.body.name,
            hobby: req.body.hobby,
            favoriteMusic: req.body.favoriteMusic
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

    app.put('/shows/:id', function(req, res) {
        return Shows.findOne({
            "id": req.params.id
        }, function(err, shows) {
            if (!shows) {
                res.statusCode = 404;
                return res.send({
                    error: 'Not found'
                });
            }

            if (req.body.id) shows.id = req.body.id;
            if (req.body.name) shows.name = req.body.name;
            if (req.body.hobby) shows.hobby = req.body.hobby;
            if (req.body.favoriteMusic) shows.favoriteMusic = req.body.favoriteMusic;

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

    app.delete('/shows/:id', function(req, res) {
        return Shows.findOne({
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
