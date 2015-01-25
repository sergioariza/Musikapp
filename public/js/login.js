var app = angular.module("app", ['ngRoute']);

app.controller('UserCtrl', function($scope, $http, $window) {
    $scope.user = {
        username: 'john.doe',
        password: 'foobar'
    };

    $scope.showWarning = false;

    $scope.submit = function() {
        $http
            .post('/login', $scope.user)
            .success(function(data, status, headers, config) {
                $window.sessionStorage.token = data.token;
                $window.location = "/home";
                $scope.showWarning = false;
            })
            .error(function(data, status, headers, config) {
                // Erase the token if the user fails to log in
                delete $window.sessionStorage.token;
                $scope.showWarning = true;
            });
    };
});
