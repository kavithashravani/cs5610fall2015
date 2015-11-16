(function () {

    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, $rootScope, UserService) {
        $scope.$location = $location;
        $scope.register = register;
        function register() {
            $scope.curUser = {username: $scope.username, password: $scope.password, email: $scope.email};
            UserService.createUser($scope.curUser)
                .then(function(newUser) {
                    $scope.curUser = newUser;
                    $rootScope.currentUser = newUser;
                    $location.url("/profile");
            });
        }
    }


})();