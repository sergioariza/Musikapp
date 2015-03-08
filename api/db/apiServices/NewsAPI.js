module.exports = function(app) {
    //News model
    var News = require('../models/NewsModel.js');
    var expressJwt = require('express-jwt');
    var secret = require('../../secret.js');

    app.use('/news', expressJwt({
        secret: secret.secretToken
    }));
    
    app.get('/news/:user', function(req, res) {
        return News.find({
            "user": req.params.user
        }, function(err, news) {
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

    app.post('/news', expressJwt({
        secret: secret.secretToken
    }), function(req, res) {
        var news = new News({
            user: req.body.user,
            id: req.body.id,
            title: req.body.title,
            body: req.body.body,
            date: req.body.date,
            photoURL: req.body.photoURL
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

    app.put('/news', expressJwt({
        secret: secret.secretToken
    }), function(req, res) {
        return News.findOne({
            "user": req.body.user,
            "id": req.body.id
        }, function(err, news) {
            if (!news) {
                res.statusCode = 404;
                return res.send({
                    error: 'Not found'
                });
            }

            if (req.body.user) news.user = req.body.user;
            if (req.body.id) news.id = req.body.id;
            if (req.body.title) news.title = req.body.title;
            if (req.body.body) news.body = req.body.body;
            if (req.body.date) news.date = req.body.date;
            if (req.body.photoURL) news.photoURL = req.body.photoURL;

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

    app.delete('/news/:user/:id', expressJwt({
        secret: secret.secretToken
    }), function(req, res) {
        return News.findOne({
            "user": req.params.user,
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
