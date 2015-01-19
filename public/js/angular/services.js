appServices.factory('UserServices', function($http) {
    return {
        logout: function() {
            return $http.post('/logout');
        }
    };
});

appServices.factory('NewsServices', function($http) {
    return {
    	getAllNews: function() {
            return $http.get("/news");
            //return $http({url: '/news', method: 'GET'})
        },
        updateNews: function(newItem) {
            return $http.put("/news/" + newItem.id, newItem);
        },
        createNews: function(newItem) {
            return $http.post("/news", newItem);
        },
        removeNews: function(id) {
            return $http.delete("/news/" + id);
        }
    };
});

appServices.factory('ShowsServices', function($http) {
    return {
    	getAllShows: function() {
            return $http.get("/shows");
        },
        updateShows: function(newItem) {
            return $http.put("/shows/" + newItem.id, newItem);
        },
        createShows: function(newItem) {
            return $http.post("/shows", newItem);
        },
        removeShows: function(id) {
            return $http.delete("/shows/" + id);
        }
    };
});

appServices.factory('VideosServices', function($http) {
    return {
    	getAllVideos: function() {
            return $http.get("/videos");
        },
        updateVideos: function(newItem) {
            return $http.put("/videos/" + newItem.id, newItem);
        },
        createVideos: function(newItem) {
            return $http.post("/videos", newItem);
        },
        removeVideos: function(id) {
            return $http.delete("/videos/" + id);
        }
    };
});