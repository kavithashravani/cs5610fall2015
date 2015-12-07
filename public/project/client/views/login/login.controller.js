(function () {

    angular
        .module("DietTrackerApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $location, ngDialog, $route, UserService) {
        var loginModel = this;
        loginModel.login = login;
        //$scope.$location = $location;

        function login() {
            var user = {
                UserName: loginModel.username,
                Password: loginModel.password
            }
            UserService
                .login(user)
                .then(function (user) {
                    if(user != null && user != "UnAuthorized") {
                        $rootScope.currentUser = user;
                        $location.url("/profile/"+$rootScope.currentUser.UserName);
                    }
                    else {
                        loginModel.message = "Incorrect credentials";
                        var loginErrorDialog = ngDialog.open({
                            template: "./views/login/loginFailedDialog.view.html",
                            className: 'ngdialog-theme-default',
                        });
                    }
                });
        }
    }

}) ();