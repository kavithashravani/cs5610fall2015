(function () {
    angular
        .module("DietTrackerApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location, $rootScope, $http, $filter) {
        //$scope.currentDate = new Date();
        $scope.$location = $location;
        $http.get("/api/loggedin/user")
            .success(function(user) {
                if(user != '0') {

                    //$scope.currentDate = $filter('date')(new Date(), "yyyy-MM-dd");
                    $rootScope.currentUser = user;
                    $scope.currentUser = user.UserName;
                    $scope.homeTab = false;
                    $scope.profileTab = false;
                    $scope.foodLogTab = false;
                    $scope.signOutTab = false;
                    $scope.loginTab = true;
                    $scope.foodLogClick = foodLogClick;

                    function foodLogClick() {
                        $location.url("/food-log/"+user.UserName);
                    }
                    //$("#homeTab").show();
                    //$("#profileTab").show();
                    //$("#foodLogTab").show();
                    //$("#signOutTab").show();
                    //$("#loginTab").hide();
                }
                else {
                    $scope.homeTab = false;
                    $scope.profileTab = true;
                    $scope.foodLogTab = true;
                    $scope.signOutTab = true;
                    $scope.loginTab = false;
                    //$("#homeTab").show();
                    //$("#loginTab").show();
                    //$("#profileTab").hide();
                    //$("#foodLogTab").hide();
                    //$("#signOutTab").hide();
                }
            });

    }

})();