(function() {
    angular
        .module("DietTrackerApp")
        .factory("UserService", UserService);

    function UserService($http, $q) {
        var userServiceApi = {
            login: login,
            createUser: createUser,
            updateUser: updateUser,
            signOut: signOut,
            findUserByUserName: findUserByUserName,
            followUser: followUser,
            unFollowUser: unFollowUser
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

        function updateUser(userName, user) {
            var deferred = $q.defer();
            $http.put("/api/profile/"+userName, user)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function signOut(user) {
            var deferred = $q.defer();
            $http.post("/api/logout", user)
                .success(function(response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        function findUserByUserName(userName) {
            var deferred = $q.defer();
            $http.get("/api/profile/"+userName)
                .success(function(user) {
                    deferred.resolve(user);
                });
            return deferred.promise;
        }

        function followUser(currentUserName, followUserName) {
            var deferred = $q.defer();
            $http.put("/api/user/"+currentUserName+"/follow/"+followUserName)
                .success(function(user) {
                    deferred.resolve(user);
                });
            return deferred.promise;
        }

        function unFollowUser(currentUserName, unfollowUserName) {
            var deferred = $q.defer();
            $http.put("/api/user/"+currentUserName+"/unfollow/"+unfollowUserName)
                .success(function(user) {
                    deferred.resolve(user);
                });
            return deferred.promise;
        }
    }


})();