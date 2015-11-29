(function () {

    angular
        .module("DietTrackerApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $location, UserService) {
        var loginModel = this;
        loginModel.login = login;
        //$scope.$location = $location;

        function login() {
            var user = {
                UserName: loginModel.userName,
                Password: loginModel.password
            }
            UserService
                .login(user)
                .then(function (user) {
                    if(user != null) {
                        $rootScope.currentUser = user;
                        $location.url("/profile");
                    }
                    else {
                        loginModel.message = "Incorrect credentials";
                    }
                })
        }
    }

}) ();