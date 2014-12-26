//creamos nuestro modulo llamado app
var app = angular.module("app", ['ngRoute']);
var services = angular.module('services', []);

//hacemos el ruteo de nuestra aplicación
app.config(function($routeProvider){
	$routeProvider
	.when("/", {
		title: 'Home',
		templateUrl : "views/templates/index.html"
	})
	.when('/news', {
		title: 'Noticias',
		templateUrl : "views/templates/news.html",
		controller : "newsController"
    })
	.when("/shows", {
		title: 'Conciertos',
		templateUrl : "views/templates/shows.html",
		controller : "showsController"
	})
	.when("/videos", {
		title: 'Vídeos',
		templateUrl : "views/templates/videos.html",
		controller : "videosController"
	})
 	.otherwise({ redirectTo : "/"})
});

/*app.run(function($rootScope, $location, $window, AuthenticationService) {
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
        //redirect only if both isAuthenticated is false and no token is set
        if (nextRoute != null && nextRoute.access != null && nextRoute.access.requiredAuthentication 
            && !AuthenticationService.isAuthenticated && !$window.sessionStorage.token) {
            UserService.logout().success(function(data) {
            	//No hacemos nada aquí
                }).error(function(status, data) {
                    console.log(status);
                    console.log(data);
                });
        }
    });
});*/