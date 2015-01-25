//Login & User API Services
var mongoose = require('../mongo_database.js');
var Schema = mongoose.Schema;

var ShowsDetails = new Schema({
    id: Number,
    name: String,
    hobby: String,
    favoriteMusic: String
}, {collection: 'shows', versionKey: false});

var showsModel = mongoose.model('shows', ShowsDetails);

module.exports = showsModel;