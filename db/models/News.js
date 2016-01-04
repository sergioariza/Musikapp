module.exports = function(mongoose, Schema) {
	//News API Services
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
	return newsModel;
};