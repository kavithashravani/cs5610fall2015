(function () {
    angular
        .module("DietTrackerApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, $location, SearchService) {
        $scope.$location = $location;
        $scope.search = search;


        function search() {
            SearchService.findItems($scope.searchItem)
                .then(function(searchResults) {
                    $scope.searchResults = searchResults.foods.food;
                    console.log(searchResults);
            });
        }
    }

})();