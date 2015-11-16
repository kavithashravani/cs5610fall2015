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
                .then(function(Users) {
                    for(var i = 0; i < Users.length; i++) {
                        if(registerModel.curUser.username == Users[i].username) {
                            $rootScope.currentUser = Users[i];
                        }
                    }
                    $location.url("/profile");
            });
        }
    }


})();