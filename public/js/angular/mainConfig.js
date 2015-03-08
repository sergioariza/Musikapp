//Creamos nuestro modulo de aplicación AngularJS llamado "app"
//y módulo de servicios llamado "appServices"
var app = angular.module("app", ['ngRoute', 'appServices']);
var appServices = angular.module('appServices', []);

var isLogged = function($q, $timeout, $http, $location, $window, UserServices) {
    if (!$window.sessionStorage.token) {
        UserServices.logout()
            .success(function(data) {
                $timeout(function() {
                    deferred.reject();
                }, 0);
                delete $window.sessionStorage.token;
                delete $window.sessionStorage.user;
                $window.location = "/";
            })
            .error(function(status, data) {
                console.log(status);
                console.log(data);
            });
    }
};

//Hacemos el ruteo de nuestra aplicación
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            title: 'Musikapp - Inicio',
            templateUrl: "views/templates/index.html",
            resolve: {
                loggedin: isLogged
            }
        })
        .when('/news', {
            title: 'Musikapp - Noticias',
            templateUrl: "views/templates/news.html",
            controller: "newsController",
            resolve: {
                loggedin: isLogged
            }
        })
        .when("/shows", {
            title: 'Musikapp - Conciertos',
            templateUrl: "views/templates/shows.html",
            controller: "showsController",
            resolve: {
                loggedin: isLogged
            }
        })
        .when("/videos", {
            title: 'Musikapp - Vídeos',
            templateUrl: "views/templates/videos.html",
            controller: "videosController",
            resolve: {
                loggedin: isLogged
            }
        })
        .otherwise({
            redirectTo: "/"
        });
});

app.factory('authInterceptor', function($rootScope, $q, $window) {
    return {
        request: function(config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            return config;
        },
        response: function(response) {
            if (response.status === 401) {
                // handle the case where the user is not authenticated
                UserServices.logout().success(function(data) {
                    $timeout(function() {
                        deferred.reject();
                    }, 0);

                    delete $window.sessionStorage.token;
                    delete $window.sessionStorage.user;
                    
                    $window.location = "/";
                }).error(function(status, data) {
                    console.log(status);
                    console.log(data);
                });
            }
            return response || $q.when(response);
        }
    };
});

app.config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});

app.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);
