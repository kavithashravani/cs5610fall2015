(function () {

    angular
        .module("DietTrackerApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $rootScope, $location, UserService) {
       var registerModel = this;
        //registerModel.$location = $location;
        registerModel.register = register;

        function register() {

            var newUser = {
                UserName: registerModel.userName,
                FirstName: registerModel.firstName,
                LastName: registerModel.lastName,
                Email: registerModel.emailId,
                Age: parseInt(registerModel.age),
                Weight: parseInt(registerModel.weight),
                Password: registerModel.password
            }

            UserService.createUser(newUser)
                .then(function(response) {
                    if(response != null) {
                        $rootScope.currentUser = response;
                        $location.url("/profile");
                    }
                    else {
                        registerModel.message = "user already exists";
                    }
                });
        }
    }

})();