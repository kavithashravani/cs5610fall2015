(function() {

    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, $rootScope, UserService) {
        $scope.$location = $location;
        $scope.login = login;

        function login() {
            UserService.findUserByUsernameAndPassword($scope.username, $scope.password, function(user) {
                $rootScope.currentUser = user;
                $location.url("/profile");
            });
        }
    }


})();