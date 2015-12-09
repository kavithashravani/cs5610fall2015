(function() {
    angular
        .module("DietTrackerApp")
        .controller("SignOutController", SignOutController);

    function SignOutController($rootScope, $location, UserService) {
        var signOutModel = this;

        function init() {
            UserService
                .signOut($rootScope.currentUser)
                .then(function(response) {
                    if (response == "OK") {
                        $rootScope.currentUser = null;
                        $location.url("/home");
                    }
                });
        }
        init();
    }
})();