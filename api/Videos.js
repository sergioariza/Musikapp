module.exports = function(app, apiRoutes, Videos) {
    app.get('/videos/:user', function(req, res) {
        return Videos.find({
            "user": req.params.user
        }, function(err, videos) {
            if (!err) {
                res.header("Access-Control-Allow-Origin", "*");
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

    app.get('/videos/:user/:begin/:end', function(req, res) {
        return Videos.find({
            "user": req.params.user,
            "id": {$gte: req.params.begin, $lte: req.params.end}
        }, function(err, videos) {
            if (!err) {
                res.header("Access-Control-Allow-Origin", "*");
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

    apiRoutes.post('/videos', function(req, res) {
        var videos = new Videos({
            user: req.body.user,
            id: req.body.id,
            title: req.body.title,
            description: req.body.description,
            youtubeURL: req.body.youtubeURL
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

    apiRoutes.put('/videos', function(req, res) {
        return Videos.findOne({
            "user": req.body.user,
            "id": req.body.id
        }, function(err, videos) {
            if (!videos) {
                res.statusCode = 404;
                return res.send({
                    error: 'Not found'
                });
            }

            if (req.body.user) videos.user = req.body.user;
            if (req.body.id) videos.id = req.body.id;
            if (req.body.title) videos.title = req.body.title;
            if (req.body.description) videos.description = req.body.description;
            if (req.body.youtubeURL) videos.youtubeURL = req.body.youtubeURL;

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

    apiRoutes.delete('/videos/:user/:id', function(req, res) {
        return Videos.findOne({
            "user": req.params.user,
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
