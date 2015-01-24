var mongoose = require('mongoose');
var mongodbURL_local = 'mongodb://localhost/MyDatabase';

mongoose.connect(mongodbURL_local);
module.exports = mongoose;