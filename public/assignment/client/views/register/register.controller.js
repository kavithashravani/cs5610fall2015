(function () {

    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $rootScope, UserService) {
        var registerModel = this;
        registerModel.$location = $location;
        registerModel.register = register;
        function register() {
            registerModel.curUser = {username: registerModel.username, password: registerModel.password, email: registerModel.email};
            UserService.createUser(registerModel.curUser)
                .then(function(user) {
                    if(registerModel.curUser.username == user.username) {
                        $rootScope.currentUser = user;
                        $location.url("/profile");
                    }
                    else {
                        console.log("Registration failed");
                    }
            });
        }
    }


})();