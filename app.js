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

//Login & User API Services
var UserDetail = new Schema({
    username: String,
    password: String
}, {collection: 'userInfo'});

var Users = mongoose.model('userInfo', UserDetail);
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
    Users.findOne({'username':username},
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

//News API Services
var NewsDetails = new Schema({
    id: Number,
    name: String,
    hobby: String,
    favoriteMusic: String
}, {collection: 'news', versionKey: false});

var News = mongoose.model('news', NewsDetails);

app.get('/news', function(req, res){
  if (!infoUser) {
    return res.send(401);
  }

  return News.find(function(err, news) {
      if(!err) {
        return res.send(news);
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s', res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
  });
});

app.post('/news', function(req, res){
  if (!infoUser) {
    return res.send(401);
  }

  var news = new News({
      id:             req.body.id,
      name:           req.body.name,
      hobby :         req.body.hobby,
      favoriteMusic:  req.body.favoriteMusic
  });

  news.save(function(err) {
      if(err) {
        console.log('Error while saving news: ' + err);
        res.send({ error:err });
        return;
      } else {
        console.log("News created");
        return res.send({ status: 'OK', news: news});
      }
  });
});

app.put('/news/:id', function(req, res){
  if (!infoUser) {
    return res.send(401);
  }

  return News.findOne({"id": req.params.id}, function(err, news) {
      if(!news){
        res.statusCode = 404;
        return res.send({error: 'Not found'});
      }

      if (req.body.id != null) news.id = req.body.id;
      if (req.body.name != null) news.name = req.body.name;
      if (req.body.hobby != null) news.hobby = req.body.hobby;
      if (req.body.favoriteMusic != null) news.favoriteMusic  = req.body.favoriteMusic;

      return news.save(function(err){
        if(!err){
          console.log('Updated');
          return res.send({ status: 'OK', news: news });
        } else {
          if(err.name == 'ValidationError') {
            res.statusCode = 400;
            res.send({ error: 'Validation error' });
          } else {
            res.statusCode = 500;
            res.send({ error: 'Server error' });
          }

          console.log('Internal error(%d): %s', res.statusCode, err.message);
        }

        res.send(news);
      });
  });
});

app.delete('/news/:id', function(req, res){
  if (!infoUser) {
    return res.send(401);
  }

  return News.findOne({"id": req.params.id}, function(err, news) {
    if(!news){
      res.statusCode = 404;
      return res.send({error: 'Not found'});
    }

    return news.remove(function(err) {
      if(!err) {
        console.log('Removed news');
        return res.send({ status: 'OK' });
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s', res.statusCode, err.message);
        return res.send({ error: 'Server error' });
      }
    });
  });
});

//Shows API Services
var ShowsDetails = new Schema({
    id: Number,
    name: String,
    hobby: String,
    favoriteMusic: String
}, {collection: 'shows', versionKey: false});

var Shows = mongoose.model('shows', ShowsDetails);

app.get('/shows', function(req, res){
  if (!infoUser) {
    return res.send(401);
  }

  return Shows.find(function(err, shows) {
      if(!err) {
        return res.send(shows);
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s', res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
  });
});

app.post('/shows', function(req, res){
  if (!infoUser) {
    return res.send(401);
  }

  var shows = new Shows({
      id:             req.body.id,
      name:           req.body.name,
      hobby :         req.body.hobby,
      favoriteMusic:  req.body.favoriteMusic
  });

  shows.save(function(err) {
      if(err) {
        console.log('Error while saving show: ' + err);
        res.send({ error:err });
        return;
      } else {
        console.log("Show created");
        return res.send({ status: 'OK', shows: shows});
      }
  });
});

app.put('/shows/:id', function(req, res){
  if (!infoUser) {
    return res.send(401);
  }

  return Shows.findOne({"id": req.params.id}, function(err, shows) {
      if(!shows){
        res.statusCode = 404;
        return res.send({error: 'Not found'});
      }

      if (req.body.id != null) shows.id = req.body.id;
      if (req.body.name != null) shows.name = req.body.name;
      if (req.body.hobby != null) shows.hobby = req.body.hobby;
      if (req.body.favoriteMusic != null) shows.favoriteMusic  = req.body.favoriteMusic;

      return shows.save(function(err){
        if(!err){
          console.log('Updated');
          return res.send({ status: 'OK', shows: shows });
        } else {
          if(err.name == 'ValidationError') {
            res.statusCode = 400;
            res.send({ error: 'Validation error' });
          } else {
            res.statusCode = 500;
            res.send({ error: 'Server error' });
          }

          console.log('Internal error(%d): %s', res.statusCode, err.message);
        }

        res.send(shows);
      });
  });
});

app.delete('/shows/:id', function(req, res){
  if (!infoUser) {
    return res.send(401);
  }

  return Shows.findOne({"id": req.params.id}, function(err, shows) {
    if(!shows){
      res.statusCode = 404;
      return res.send({error: 'Not found'});
    }

    return shows.remove(function(err) {
      if(!err) {
        console.log('Removed show');
        return res.send({ status: 'OK' });
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s', res.statusCode, err.message);
        return res.send({ error: 'Server error' });
      }
    });
  });
});

//Videos API Services
var VideosDetails = new Schema({
    id: Number,
    name: String,
    hobby: String,
    favoriteMusic: String
}, {collection: 'videos', versionKey: false});

var Videos = mongoose.model('videos', ShowsDetails);

app.get('/videos', function(req, res){
  if (!infoUser) {
    return res.send(401);
  }

  return Videos.find(function(err, videos) {
      if(!err) {
        return res.send(videos);
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s', res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
  });
});

app.post('/videos', function(req, res){
  if (!infoUser) {
    return res.send(401);
  }

  var videos = new Videos({
      id:             req.body.id,
      name:           req.body.name,
      hobby :         req.body.hobby,
      favoriteMusic:  req.body.favoriteMusic
  });

  videos.save(function(err) {
      if(err) {
        console.log('Error while saving video: ' + err);
        res.send({ error:err });
        return;
      } else {
        console.log("Video created");
        return res.send({ status: 'OK', videos: videos});
      }
  });
});

app.put('/videos/:id', function(req, res){
  if (!infoUser) {
    return res.send(401);
  }

  return Videos.findOne({"id": req.params.id}, function(err, videos) {
      if(!shows){
        res.statusCode = 404;
        return res.send({error: 'Not found'});
      }

      if (req.body.id != null) videos.id = req.body.id;
      if (req.body.name != null) videos.name = req.body.name;
      if (req.body.hobby != null) videos.hobby = req.body.hobby;
      if (req.body.favoriteMusic != null) videos.favoriteMusic  = req.body.favoriteMusic;

      return videos.save(function(err){
        if(!err){
          console.log('Updated');
          return res.send({ status: 'OK', videos: videos });
        } else {
          if(err.name == 'ValidationError') {
            res.statusCode = 400;
            res.send({ error: 'Validation error' });
          } else {
            res.statusCode = 500;
            res.send({ error: 'Server error' });
          }

          console.log('Internal error(%d): %s', res.statusCode, err.message);
        }

        res.send(videos);
      });
  });
});

app.delete('/videos/:id', function(req, res){
  if (!infoUser) {
    return res.send(401);
  }

  return Videos.findOne({"id": req.params.id}, function(err, videos) {
    if(!videos){
      res.statusCode = 404;
      return res.send({error: 'Not found'});
    }

    return videos.remove(function(err) {
      if(!err) {
        console.log('Removed video');
        return res.send({ status: 'OK' });
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s', res.statusCode, err.message);
        return res.send({ error: 'Server error' });
      }
    });
  });
});

//Server creation
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});