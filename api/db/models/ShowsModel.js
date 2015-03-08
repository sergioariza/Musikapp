//Login & User API Services
var mongoose = require('../mongo_database.js');
var Schema = mongoose.Schema;

var ShowsDetails = new Schema({
    user: String,
    id: Number,
    title: String,
    body: String,
    bandsWith: String,
    place: String,
    datePublished: String,
    dateShow: String,
    hourShow: String,
    linkGoogleMaps: String,
    photoURL: String
}, {
    collection: 'shows',
    versionKey: false
});

var showsModel = mongoose.model('shows', ShowsDetails);

module.exports = showsModel;
