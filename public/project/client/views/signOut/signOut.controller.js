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
                        //$rootScope.homeTab = false;
                        //$rootScope.profileTab = true;
                        //$rootScope.foodLogTab = true;
                        //$rootScope.signOutTab = true;
                        //$rootScope.loginTab = false;
                        $location.url("/home");
                    }
                });
        }
        init();
    }
})();