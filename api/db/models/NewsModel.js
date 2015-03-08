//Login & User API Services
var mongoose = require('../mongo_database.js');
var Schema = mongoose.Schema;

var NewsDetails = new Schema({
    user: String,
    id: Number,
    title: String,
    body: String,
    date: String,
    photoURL: String
}, {
    collection: 'news',
    versionKey: false
});

var newsModel = mongoose.model('news', NewsDetails);

module.exports = newsModel;
