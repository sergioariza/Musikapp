module.exports = function(app, Users, jwt, secret, path) {

    app.get('/', function(req, res) {
        //res.sendfile('./public/login.html');
        res.sendFile(path.resolve('./public/login.html'));
    });
    
    app.post('/login', function(req, res) {
        Users.findOne({
            username: req.body.username
        }, function(err, user) {
            if (err) {
                res.json({
                    success: false,
                    message: "Error en el login"
                });
            } else if (!user) {
                res.json({
                    success: false,
                    message: "Usuario no registrado"
                });
            } else if (user.password != req.body.password) {
                res.json({
                    success: false,
                    message: "El password es incorrecto"
                });
            } else {
                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, secret, {
                    expiresInMinutes: 60 // expires in 1 hour(s)
                });
                res.json({
                    success: true,
                    token: token,
                    user: user.username
                });
            }
        });
    });

    app.get('/loginError', function(req, res, next) {
        res.send('Error en login');
    });

    app.get('/userUnknown', function(req, res, next) {
        res.send('Usuario no existe');
    });

    app.get('/incorrectPassword', function(req, res, next) {
        res.send('Password incorrecto');
    });

    app.post('/logout', function(req, res) {
        //res.sendfile('./public/login.html');
        res.sendFile(path.resolve('./public/login.html'));
    });

    app.get('/home', function(req, res, next) {
        //res.sendfile('./public/home.html');
        res.sendFile(path.resolve('./public/home.html'));
    });
};
