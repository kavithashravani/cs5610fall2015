(function() {

    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($location, $rootScope, UserService) {
        var loginModel = this;
        loginModel.$location = $location;
        loginModel.login = login;

        function login() {
            UserService.findUserByUsernameAndPassword(loginModel.username, loginModel.password)
                .then(function(currentUser) {
                $rootScope.currentUser = currentUser;
                $location.url("/profile");
            });
        }
    }


})();