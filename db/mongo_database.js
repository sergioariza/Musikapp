var mongoose = require('mongoose');
var mongodbURL_local = 'mongodb://localhost/MusikappDB';

mongoose.connect(mongodbURL_local);
module.exports = mongoose;