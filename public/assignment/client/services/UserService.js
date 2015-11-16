(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $q) {

        var user_service = {
            findAllUsers: findAllUsers,
            findUserByUsernameAndPassword: findUserByUsernameAndPassword,
            createUser: createUser,
            updateUser: updateUser,
            deleteUserById: deleteUserById
        };
        return user_service;

        function findUserByUsernameAndPassword(username, password) {
            var deferred = $q.defer();
            $http.get("/api/assignment/user?username="+username+"&password="+password)
                .success(function(response) {
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function findAllUsers() {
            var deferred = $q.defer();
            $http.get("/api/assignment/user")
                .success(function(users) {
                    deferred.resolve(users);
                });
            return deferred.promise;
        }

        function createUser(user) {
            var deferred = $q.defer();
            $http.post("/api/assignment/user", user)
                .success(function(user) {
                    deferred.resolve(user);
                });
            return deferred.promise;
        }

        function deleteUserById(id) {
            var deferred = $q.defer();
            $http.delete("/api/assignment/user/"+id)
                .success(function(users) {
                    deferred.resolve(users);
                });
            return deferred.promise;
        }

        function updateUser(id, updateUser) {
            var deferred = $q.defer();
            $http.put("/api/assignment/user/"+id, updateUser)
                .success(function(updatedUser) {
                    deferred.resolve(updatedUser);
                });
            return deferred.promise;
        }

    }

})();