var mongoose = require('../mongo_database.js');
var Schema = mongoose.Schema;

var VideosDetails = new Schema({
    id: Number,
    name: String,
    hobby: String,
    favoriteMusic: String
}, {collection: 'videos', versionKey: false});

var videosModel = mongoose.model('videos', VideosDetails);

module.exports = videosModel;