module.exports = function(mongoose, Schema) {
	//Users API Services
	var userDetail = new Schema({
	    username: String,
	    password: String
	}, {collection: 'userInfo'});

	var usersModel = mongoose.model('userInfo', userDetail);
	return usersModel;
};