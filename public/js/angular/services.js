appServices.factory('UserServices', function($http) {
    return {
        logout: function() {
            return $http.post('/logout');
        },
        getMaxId: function(arrayInput) {
            var maxIndex = -1;
            arrayInput.forEach(function(entry) {
                if (entry.id > maxIndex ) {
                    maxIndex = entry.id;
                }
            });
            return maxIndex;
        }
    };
});

appServices.factory('NewsServices', function($window, $http) {
    return {
        getAllNews: function(user) {
            return $http.get("/news/" + user);
        },
        updateNews: function(newItem) {
            return $http.put("/news", newItem);
        },
        createNews: function(newItem) {
            return $http.post("/news", newItem);
        },
        removeNews: function(user, id) {
            return $http.delete("/news/" + user + "/" + id);
        }
    };
});

appServices.factory('ShowsServices', function($http) {
    return {
        getAllShows: function(user) {
            return $http.get("/shows/" + user);
        },
        updateShows: function(showItem) {
            return $http.put("/shows", showItem);
        },
        createShows: function(showItem) {
            return $http.post("/shows", showItem);
        },
        removeShows: function(user, id) {
            return $http.delete("/shows/" + user + "/" + id);
        }
    };
});

appServices.factory('VideosServices', function($http) {
    return {
        getAllVideos: function(user) {
            return $http.get("/videos/" + user);
        },
        updateVideos: function(videoItem) {
            return $http.put("/videos", videoItem);
        },
        createVideos: function(videoItem) {
            return $http.post("/videos", videoItem);
        },
        removeVideos: function(user, id) {
            return $http.delete("/videos/" + user + "/" + id);
        }
    };
});
