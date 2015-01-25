module.exports = function(app) {
    //Videos model
    var Videos = require('../models/VideosModel.js');

    app.get('/videos', function(req, res) {
        return Videos.find(function(err, videos) {
            if (!err) {
                return res.send(videos);
            } else {
                res.statusCode = 500;
                console.log('Internal error(%d): %s', res.statusCode, err.message);
                return res.send({
                    error: 'Server error'
                });
            }
        });
    });

    app.post('/videos', function(req, res) {
        var videos = new Videos({
            id: req.body.id,
            name: req.body.name,
            hobby: req.body.hobby,
            favoriteMusic: req.body.favoriteMusic
        });

        videos.save(function(err) {
            if (err) {
                console.log('Error while saving video: ' + err);
                res.send({
                    error: err
                });
                return;
            } else {
                console.log("Video created");
                return res.send({
                    status: 'OK',
                    videos: videos
                });
            }
        });
    });

    app.put('/videos/:id', function(req, res) {
        return Videos.findOne({
            "id": req.params.id
        }, function(err, videos) {
            if (!shows) {
                res.statusCode = 404;
                return res.send({
                    error: 'Not found'
                });
            }

            if (req.body.id) videos.id = req.body.id;
            if (req.body.name) videos.name = req.body.name;
            if (req.body.hobby) videos.hobby = req.body.hobby;
            if (req.body.favoriteMusic) videos.favoriteMusic = req.body.favoriteMusic;

            return videos.save(function(err) {
                if (!err) {
                    console.log('Updated');
                    return res.send({
                        status: 'OK',
                        videos: videos
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

                res.send(videos);
            });
        });
    });

    app.delete('/videos/:id', function(req, res) {
        return Videos.findOne({
            "id": req.params.id
        }, function(err, videos) {
            if (!videos) {
                res.statusCode = 404;
                return res.send({
                    error: 'Not found'
                });
            }

            return videos.remove(function(err) {
                if (!err) {
                    console.log('Removed video');
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
