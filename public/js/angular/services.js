var options = {};
options.api = {};
options.api.base_url = "http://localhost:3001";

/*services.factory('AuthenticationService', function() {
    var auth = {
        isAuthenticated: false,
        isAdmin: false
    }   

    return auth;
});*/

services.factory('UserService', function ($http) {
    return {
        logOut: function() {
            return $http.get(options.api.base_url + '/logout');
        }
    }
});