//Creamos nuestro modulo de aplicación AngularJS llamado "app"
//y módulo de servicios llamado "appServices"
var app = angular.module("app", ['ngRoute', 'appServices']);
var appServices = angular.module('appServices', []);

/*
var options = {};
options.api = {};
options.api.base_url = "http://localhost:3001";
*/

var checkLoggedin = function($q, $timeout, $http, $location, $window, UserServices){
	var deferred = $q.defer();
		
	UserServices.loggedin().success(function(user){
		if (user !== '0'){
			$timeout(deferred.resolve, 0);
		}
		else {
			UserServices.logout().success(function(data) {
				$timeout(function(){ deferred.reject(); }, 0);
		        $window.location = "/";
		    }).error(function(status, data) {
		            console.log(status);
		            console.log(data);
		        }
			);
		}
	});
		
	return deferred.promise;
};

//Hacemos el ruteo de nuestra aplicación
app.config(function($routeProvider){
	$routeProvider
	.when("/", {
		title: 'Home',
		templateUrl : "views/templates/index.html",
		resolve: {
			loggedin: checkLoggedin
		}
	})
	.when('/news', {
		title: 'Noticias',
		templateUrl : "views/templates/news.html",
		controller : "newsController",
		resolve: {
			loggedin: checkLoggedin
		}
    })
	.when("/shows", {
		title: 'Conciertos',
		templateUrl : "views/templates/shows.html",
		controller : "showsController",
		resolve: {
			loggedin: checkLoggedin
		}
	})
	.when("/videos", {
		title: 'Vídeos',
		templateUrl : "views/templates/videos.html",
		controller : "videosController",
		resolve: {
			loggedin: checkLoggedin
		}
	})
 	.otherwise({ redirectTo : "/"})
});