(function () {
    angular
        .module("DietTrackerApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, $rootScope, $http, $filter) {
        //$scope.currentDate = new Date();
        $scope.$location = $location;
        $rootScope.homeTab = $scope.homeTab;
        $rootScope.profileTab = $scope.profileTab;
        $rootScope.foodLogTab = $scope.foodLogTab;
        $rootScope.signOutTab = $scope.signOutTab ;
        $rootScope.loginTab = $scope.loginTab;

        $http.get("/api/loggedin/user")
            .success(function(user) {
                if(user != '0') {
                    $rootScope.currentUser = user;
                    $scope.currentUserName = user.UserName;
                    $rootScope.homeTab = false;
                    $rootScope.profileTab = false;
                    $rootScope.foodLogTab = false;
                    $rootScope.signOutTab = false;
                    $rootScope.loginTab = true;
                    //$scope.foodLogClick = foodLogClick;

                    //function foodLogClick() {
                    //    $location.url("/food-log/"+user.UserName);
                    //}
                }
                else {
                    $rootScope.homeTab = false;
                    $rootScope.profileTab = true;
                    $rootScope.foodLogTab = true;
                    $rootScope.signOutTab = true;
                    $rootScope.loginTab = false;
                }
            });

    }

})();