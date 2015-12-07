(function () {
    angular
        .module("DietTrackerApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $location, $http, $rootScope, SearchService) {
        $scope.$location = $location;
        $scope.search = search;
        $http.get("/api/loggedin/user")
            .success(function(user) {
                if(user != '0') {
                    $rootScope.currentUser = user;
                    $scope.currentUser = user.UserName;
                    $scope.signUpTab = true;

                    $rootScope.homeTab = false;
                    $rootScope.profileTab = false;
                    $rootScope.foodLogTab = false;
                    $rootScope.signOutTab = false;
                    $rootScope.loginTab = true;

                }
                else {
                    $scope.signUpTab = false;

                    $rootScope.homeTab = false;
                    $rootScope.profileTab = true;
                    $rootScope.foodLogTab = true;
                    $rootScope.signOutTab = true;
                    $rootScope.loginTab = false;
                }
            });

        function search() {
            SearchService.findItems($scope.searchItem)
                .then(function(searchResults) {
                    console.log(searchResults);
                    $scope.searchResults = chunk(searchResults.recipes.recipe, 2);

            });
        }

        function chunk(arr, size) {
            var newArr = [];
            for (var i=0; i<arr.length; i+=size) {
                newArr.push(arr.slice(i, i+size));
            }
            return newArr;
        }
    }

})();