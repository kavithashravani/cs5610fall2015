(function () {
    angular
        .module("DietTrackerApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $location, $http, $rootScope, SearchService) {
        $scope.$location = $location;
        $scope.search = search;
        $scope.click = false;
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
            $scope.click = true;
            SearchService.findItems($scope.searchItem)
                .then(function(searchResults) {
                    var Results = []
                    for(key in searchResults) {
                        if (searchResults[key].recipes.total_results != 0) {
                             Results.push(searchResults[key].recipes.recipe);
                        }
                    }
                    $scope.searchResults = chunk(Results, 3);
                    //console.log($scope.searchResults);
            });
        }

        function chunk(arr, size) {
            var newArr = [];
            for (var i=0; i< arr.length; i++) {
                for(var j=0; j < arr[i].length; j+=size) {
                    newArr.push(arr[i].slice(j, j+size));
                }
            }
            return newArr;
        }
    }

})();