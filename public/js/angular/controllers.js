app.controller("homeController", function appController($scope, $http, $location, $window, UserServices) {
    $scope.logout = function() {
        UserServices.logout().success(function(data) {
                delete $window.sessionStorage.token;
                delete $window.sessionStorage.user;
                $window.location = "/";
            })
            .error(function(status, data) {
                console.log(status);
                console.log(data);
            });
    };
});

app.controller("newsController", function newsController($scope, $http, $window, NewsServices, UserServices) {
    NewsServices.getAllNews($window.sessionStorage.user).success(function(data) {
            $scope.news = data;
        })
        .error(function(status, data) {
            UserServices.logout().success(function(data) {
                    delete $window.sessionStorage.token;
                    delete $window.sessionStorage.user;
                    $window.location = "/";
                })
                .error(function(status, data) {
                    console.log(status);
                    console.log(data);
                });
        });

    $scope.user = $window.sessionStorage.user;
    $scope.id = -1;
    $scope.title = '';
    $scope.body = '';
    $scope.date = '';
    $scope.photoURL = '';

    $scope.edit = true;
    $scope.operationInProgress = false;
    $scope.incomplete = false;

    $scope.editItem = function(id) {
        if (id == 'new') {
            $scope.edit = false;
            $scope.incomplete = true;
            $scope.id = $scope.news.length;
            $scope.title = '';
            $scope.body = '';
            $scope.date = '';
            $scope.photoURL = '';
        } else {
            $scope.edit = true;
            $scope.id = $scope.news[id].id;
            $scope.title = $scope.news[id].title;
            $scope.body = $scope.news[id].body;
            $scope.date = $scope.news[id].date;
            $scope.photoURL = $scope.news[id].photoURL;
        }

        $scope.operationInProgress = true;
    };

    $scope.saveItem = function() {
        if ($scope.edit) {
            var found = false;
            for (var i = 0; i < $scope.news.length; i++) {
                if ($scope.news[i].id == $scope.id) {
                    $scope.news[i].title = $scope.title;
                    $scope.news[i].body = $scope.body;
                    $scope.news[i].date = $scope.date;
                    $scope.news[i].photoURL = $scope.photoURL;
                    found = true;
                    break;
                }
            }

            if (found) {
                addOrModifyItem();
            }
        } else {
            addOrModifyItem();
        }
    };

    function addOrModifyItem() {
        var newItem = {
            user: $scope.user,
            id: $scope.id,
            title: $scope.title,
            body: $scope.body,
            date: $scope.date,
            photoURL: $scope.photoURL
        };

        $scope.id = -1;
        $scope.title = '';
        $scope.body = '';
        $scope.date = '';
        $scope.photoURL = '';
        $scope.operationInProgress = false;

        if ($scope.edit) {
            NewsServices.updateNews(newItem);
        } else {
            $scope.news.push(newItem);
            NewsServices.createNews(newItem);
        }
    }

    $scope.removeItem = function removeItem(row, id) {
        var index = $scope.news.indexOf(row);

        if (index !== -1) {
            $scope.news.splice(index, 1);
            NewsServices.removeNews($scope.user, id);
        }
    };

    $scope.$watch('title', function() {
        $scope.test();
    });
    $scope.$watch('body', function() {
        $scope.test();
    });
    $scope.$watch('date', function() {
        $scope.test();
    });

    $scope.test = function() {
        $scope.incomplete = false;

        if (!$scope.title.length || !$scope.body.length || !$scope.date.length || !$scope.operationInProgress) {
            $scope.incomplete = true;
        }
    };
});

app.controller("showsController", function showsController($scope, $http, $window, ShowsServices, UserServices) {
    ShowsServices.getAllShows($window.sessionStorage.user).success(function(data) {
            $scope.shows = data;
        })
        .error(function(status, data) {
            UserServices.logout().success(function(data) {
                    delete $window.sessionStorage.token;
                    delete $window.sessionStorage.user;
                    $window.location = "/";
                })
                .error(function(status, data) {
                    console.log(status);
                    console.log(data);
                });
        });

    $scope.user = $window.sessionStorage.user;
    $scope.id = -1;
    $scope.title = '';
    $scope.body = '';
    $scope.bandsWith = '';
    $scope.place = '';
    $scope.dateShow = '';
    $scope.hourShow = '';
    $scope.datePublished = '';
    $scope.linkGoogleMaps = '';
    $scope.photoURL = '';
    $scope.edit = true;
    $scope.operationInProgress = false;
    $scope.incomplete = false;
    $('#map-canvas').hide();
    $('#map-none').show();

    $scope.editItem = function(id) {
        if (id == 'new') {
            $scope.edit = false;
            $scope.incomplete = true;
            $scope.id = $scope.shows.length;
            $scope.title = '';
            $scope.body = '';
            $scope.bandsWith = '';
            $scope.place = '';
            $scope.dateShow = '';
            $scope.hourShow = '';
            $scope.datePublished = '';
            $scope.linkGoogleMaps = '';
            $scope.photoURL = '';
        } else {
            $scope.edit = true;
            $scope.id = $scope.shows[id].id;
            $scope.title = $scope.shows[id].title;
            $scope.body = $scope.shows[id].body;
            $scope.bandsWith = $scope.shows[id].bandsWith;
            $scope.place = $scope.shows[id].place;
            $scope.dateShow = $scope.shows[id].dateShow;
            $scope.hourShow = $scope.shows[id].hourShow;
            $scope.datePublished = $scope.shows[id].datePublished;
            $scope.linkGoogleMaps = $scope.shows[id].linkGoogleMaps;
            $scope.photoURL = $scope.shows[id].photoURL;
        }

        $scope.operationInProgress = true;
    };

    $scope.saveItem = function() {
        if ($scope.edit) {
            var found = false;
            for (var i = 0; i < $scope.shows.length; i++) {
                if ($scope.shows[i].id == $scope.id) {
                    $scope.shows[i].title = $scope.title;
                    $scope.shows[i].body = $scope.body;
                    $scope.shows[i].bandsWith = $scope.bandsWith;
                    $scope.shows[i].place = $scope.place;
                    $scope.shows[i].dateShow = $scope.dateShow;
                    $scope.shows[i].hourShow = $scope.hourShow;
                    $scope.shows[i].datePublished = $scope.datePublished;
                    $scope.shows[i].linkGoogleMaps = $scope.linkGoogleMaps;
                    $scope.shows[i].photoURL = $scope.photoURL;
                    found = true;
                    break;
                }
            }

            if (found) {
                addOrModifyItem();
            }
        } else {
            addOrModifyItem();
        }
    };

    function addOrModifyItem() {
        var showItem = {
            user: $scope.user,
            id: $scope.id,
            title: $scope.title,
            body: $scope.body,
            bandsWith: $scope.bandsWith,
            place: $scope.place,
            datePublished: $scope.datePublished,
            dateShow: $scope.dateShow,
            hourShow: $scope.hourShow,
            linkGoogleMaps: $scope.linkGoogleMaps,
            photoURL: $scope.photoURL
        };

        $scope.id = -1;
        $scope.title = '';
        $scope.body = '';
        $scope.bandsWith = '';
        $scope.place = '';
        $scope.dateShow = '';
        $scope.hourShow = '';
        $scope.datePublished = '';
        $scope.linkGoogleMaps = '';
        $scope.photoURL = '';
        $scope.operationInProgress = false;
        $('#map-canvas').hide();
        $('#map-none').show();

        if ($scope.edit) {
            ShowsServices.updateShows(showItem);
        } else {
            $scope.shows.push(showItem);
            ShowsServices.createShows(showItem);
        }
    }

    $scope.removeItem = function removeItem(row, id) {
        var index = $scope.shows.indexOf(row);

        if (index !== -1) {
            $scope.shows.splice(index, 1);
            ShowsServices.removeShows($scope.user, id);
        }
    };

    $scope.$watch('title', function() {
        $scope.test();
    });
    $scope.$watch('body', function() {
        $scope.test();
    });
    $scope.$watch('bandsWith', function() {
        $scope.test();
    });
    $scope.$watch('place', function() {
        $scope.test();
    });
    $scope.$watch('dateShow', function() {
        $scope.test();
    });
    $scope.$watch('hourShow', function() {
        $scope.test();
    });
    $scope.$watch('datePublished', function() {
        $scope.test();
    });
    $scope.$watch('linkGoogleMaps', function() {
        $scope.test();
    });
    $scope.$watch('photoURL', function() {
        $scope.test();
    });

    $scope.test = function() {
        $scope.incomplete = false;

        if (!$scope.title.length || !$scope.body.length || !$scope.bandsWith.length ||
            !$scope.place.length || !$scope.dateShow.length || !$scope.hourShow.length || !$scope.datePublished.length ||
            !$scope.linkGoogleMaps.length || !$scope.photoURL.length || !$scope.operationInProgress) {
            $scope.incomplete = true;
        }
    };
});

app.controller("videosController", function videosController($scope, $http, $window, $sce, VideosServices, UserServices) {
    VideosServices.getAllVideos($window.sessionStorage.user).success(function(data) {
            $scope.videos = data;
        })
        .error(function(status, data) {
            UserServices.logout().success(function(data) {
                    delete $window.sessionStorage.token;
                    delete $window.sessionStorage.user;
                    $window.location = "/";
                })
                .error(function(status, data) {
                    console.log(status);
                    console.log(data);
                });
        });

    $scope.user = $window.sessionStorage.user;
    $scope.id = -1;
    $scope.title = '';
    $scope.description = '';
    $scope.youtubeURL = '';
    $scope.code = '';
    $scope.isValidYoutubeURLLink = false;
    $scope.edit = true;
    $scope.operationInProgress = false;
    $scope.incomplete = false;

    $scope.editItem = function(id) {
        if (id == 'new') {
            $scope.edit = false;
            $scope.incomplete = true;
            $scope.id = $scope.videos.length;
            $scope.title = '';
            $scope.description = '';
            $scope.youtubeURL = '';
        } else {
            $scope.edit = true;
            $scope.id = $scope.videos[id].id;
            $scope.title = $scope.videos[id].title;
            $scope.description = $scope.videos[id].description;
            $scope.youtubeURL = $scope.videos[id].youtubeURL;
        }

        changedYoutubeURL();
        $scope.operationInProgress = true;
    };

    $scope.saveItem = function() {
        if ($scope.edit) {
            var found = false;
            for (var i = 0; i < $scope.videos.length; i++) {
                if ($scope.videos[i].id == $scope.id) {
                    $scope.videos[i].title = $scope.title;
                    $scope.videos[i].description = $scope.description;
                    $scope.videos[i].youtubeURL = $scope.youtubeURL;
                    found = true;
                    break;
                }
            }

            if (found) {
                addOrModifyItem();
            }
        } else {
            addOrModifyItem();
        }
    };

    function addOrModifyItem() {
        var videoItem = {
            user: $scope.user,
            id: $scope.id,
            title: $scope.title,
            description: $scope.description,
            youtubeURL: $scope.youtubeURL
        };

        $scope.id = -1;
        $scope.title = '';
        $scope.description = '';
        $scope.youtubeURL = '';
        $scope.operationInProgress = false;
        changedYoutubeURL();

        if ($scope.edit) {
            VideosServices.updateVideos(videoItem);
        } else {
            $scope.videos.push(videoItem);
            VideosServices.createVideos(videoItem);
        }
    }

    $scope.removeItem = function removeItem(row, id) {
        var index = $scope.videos.indexOf(row);

        if (index !== -1) {
            $scope.videos.splice(index, 1);
            VideosServices.removeVideos($scope.user, id);
        }
    };

    $scope.$watch('title', function() {
        $scope.test();
    });
    $scope.$watch('description', function() {
        $scope.test();
    });
    $scope.$watch('youtubeURL', function() {
        $scope.test();
    });

    $scope.test = function() {
        $scope.incomplete = false;

        if (!$scope.title.length || !$scope.description.length || !$scope.youtubeURL.length || !$scope.isValidYoutubeURLLink || !$scope.operationInProgress) {
            $scope.incomplete = true;
        }
    };

    function getId(url) {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regExp);

        if (match && match[2].length == 11) {
            return match[2];
        } else {
            return 'error';
        }
    }

    function changedYoutubeURL() {
        var myId = getId($scope.youtubeURL);

        if (myId == 'error') {
            $scope.isValidYoutubeURLLink = false;
            $scope.code = '';
        } else {
            $scope.isValidYoutubeURLLink = true;
            $scope.code = myId;
        }
    }

    $scope.changedYoutubeURLEvent = function() {
        changedYoutubeURL();
    };
});

app.directive('myYoutube', function($sce) {
    return {
        restrict: 'EA',
        scope: {
            code: '='
        },
        replace: true,
        template: '<div style="height:390px; width: 100%;"><iframe style="overflow:hidden;height:100%;width:100%" width="100%" height="100%" src="{{url}}" frameborder="0" allowfullscreen></iframe></div>',
        link: function(scope) {
            scope.$watch('code', function(newVal) {
                if (newVal && newVal !== '') {
                    scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + newVal);
                }
            });
        }
    };
});
