//var services = angular.module('services', []);

//Creamos nuestro modulo llamado app
var app = angular.module("app", ['ngRoute']);

var checkLoggedin = function($q, $timeout, $http, $location, $window){
	var deferred = $q.defer();
		
	$http.get('/loggedin').success(function(user){
		if (user !== '0'){
			$timeout(deferred.resolve, 0);
		}
		else {
			//$timeout(function(){ deferred.reject(); }, 0);
			$http.post("/logout").success(function(data) {
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