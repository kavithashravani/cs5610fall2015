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
                    $scope.searchResults = chunk(searchResults.recipes.recipe, 2);
                    console.log(searchResults);
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