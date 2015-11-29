(function() {
    angular
        .module("DietTrackerApp")
        .factory("UserService", UserService);

    function UserService($http, $q) {
        var userServiceApi = {
            login: login,
            createUser: createUser
        };

        return userServiceApi;

        function login(user) {
            var deferred = $q.defer();
            $http.post("/api/login/user", user)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function createUser(user) {
            var deferred = $q.defer();
            $http.post("/api/register/user", user)
                .success(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;

        }
    }


})();