(function () {
    angular
        .module("DietTrackerApp")
        .factory("FoodDetailsService", FoodDetailsService);

    function FoodDetailsService($http, $q) {
        var foodDetailsService = {
            findDetailsById: findDetailsById
        }

        return foodDetailsService;

        function findDetailsById(foodId) {
            var deferred = $q.defer();
            $http.get("/api/foodDetails/"+foodId)
                .success(function(details) {
                    deferred.resolve(details);
                })
            return deferred.promise;
        }
    }

})();