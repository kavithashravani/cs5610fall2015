(function() {

    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, $rootScope, UserService) {
        $scope.$location = $location;
        $scope.login = login;

        function login() {
            UserService.findUserByUsernameAndPassword($scope.username, $scope.password)
                .then(function(currentUser) {
                $rootScope.currentUser = currentUser;
                $location.url("/profile");
            });
        }
    }


})();