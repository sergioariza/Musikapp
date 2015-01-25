//Login & User API Services
var mongoose = require('../mongo_database.js');
var Schema = mongoose.Schema;

var userDetail = new Schema({
    username: String,
    password: String
}, {collection: 'userInfo'});

var usersModel = mongoose.model('userInfo', userDetail);

module.exports = usersModel;