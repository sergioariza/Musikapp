//Login & User API Services
var mongoose = require('../mongo_database.js');
var Schema = mongoose.Schema;

var NewsDetails = new Schema({
    id: Number,
    name: String,
    hobby: String,
    favoriteMusic: String
}, {collection: 'news', versionKey: false});

var newsModel = mongoose.model('news', NewsDetails);

module.exports = newsModel;