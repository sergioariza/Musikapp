var mongoose = require('../mongo_database.js');
var Schema = mongoose.Schema;

var VideosDetails = new Schema({
    user: String,
    id: Number,
    title: String,
    description: String,
    youtubeURL: String
}, {
    collection: 'videos',
    versionKey: false
});

var videosModel = mongoose.model('videos', VideosDetails);

module.exports = videosModel;
