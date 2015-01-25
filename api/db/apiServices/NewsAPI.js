module.exports = function(app) {
    //News model
    var News = require('../models/NewsModel.js');

    app.get('/news', function(req, res) {
        return News.find(function(err, news) {
            if (!err) {
                return res.send(news);
            } else {
                res.statusCode = 500;
                console.log('Internal error(%d): %s', res.statusCode, err.message);
                return res.send({
                    error: 'Server error'
                });
            }
        });
    });

    app.post('/news', function(req, res) {
        var news = new News({
            id: req.body.id,
            name: req.body.name,
            hobby: req.body.hobby,
            favoriteMusic: req.body.favoriteMusic
        });

        news.save(function(err) {
            if (err) {
                console.log('Error while saving news: ' + err);
                res.send({
                    error: err
                });
                return;
            } else {
                console.log("News created");
                return res.send({
                    status: 'OK',
                    news: news
                });
            }
        });
    });

    app.put('/news/:id', function(req, res) {
        return News.findOne({
            "id": req.params.id
        }, function(err, news) {
            if (!news) {
                res.statusCode = 404;
                return res.send({
                    error: 'Not found'
                });
            }

            if (req.body.id) news.id = req.body.id;
            if (req.body.name) news.name = req.body.name;
            if (req.body.hobby) news.hobby = req.body.hobby;
            if (req.body.favoriteMusic) news.favoriteMusic = req.body.favoriteMusic;

            return news.save(function(err) {
                if (!err) {
                    console.log('Updated');
                    return res.send({
                        status: 'OK',
                        news: news
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

                res.send(news);
            });
        });
    });

    app.delete('/news/:id', function(req, res) {
        return News.findOne({
            "id": req.params.id
        }, function(err, news) {
            if (!news) {
                res.statusCode = 404;
                return res.send({
                    error: 'Not found'
                });
            }

            return news.remove(function(err) {
                if (!err) {
                    console.log('Removed news');
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
