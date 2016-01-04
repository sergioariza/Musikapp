module.exports = function(mongoose, Schema) {
    //Shows API Services
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
    return showsModel;
};