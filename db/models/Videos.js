module.exports = function(mongoose, Schema) {
	//Videos API Services
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
	return videosModel;
};
