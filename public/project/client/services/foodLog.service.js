(function () {
    angular
        .module("DietTrackerApp")
        .factory("FoodLogService", FoodLogService);

    function FoodLogService($http, $q) {
        var foodLogService = {
            insertFoodLog: insertFoodLog,
            findFoodLogByUserName: findFoodLogByUserName
        }

        return foodLogService;

        function insertFoodLog(foodLog) {
            var deferred = $q.defer();
            $http.post("/api/foodLog", foodLog)
                .success(function(foodLog) {
                    deferred.resolve(foodLog);
                });
            return deferred.promise;
        }

        function findFoodLogByUserName(userName, date) {
            var deferred = $q.defer();
            $http.get("/api/foodLog/"+userName+"/"+date)
                .success(function(foodLogItems) {
                    deferred.resolve(foodLogItems);
                });
            return deferred.promise;
        }
    }

})();