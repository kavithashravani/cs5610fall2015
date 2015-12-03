(function () {
    angular
        .module("DietTrackerApp")
        .factory("FoodLogService", FoodLogService);

    function FoodLogService($http, $q) {
        var foodLogService = {
            insertFoodLog: insertFoodLog,
            findFoodLogByUserName: findFoodLogByUserName,
            deleteFoodLogItem: deleteFoodLogItem
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

        function deleteFoodLogItem(foodItemId, userName, ItemDate) {
            var deferred = $q.defer();
            $http.delete("/api/foodLog/"+userName+"/"+foodItemId+"/"+ItemDate)
                .success(function(foodLogItems) {
                    deferred.resolve(foodLogItems);
                });
            return deferred.promise;
        }

        function buildCategories(foodLogItems) {
            var snack = [];
            var breakfast = [];
            var lunch = [];
            var dinner = [];
            var fat = 0.0, carb = 0.0, prot = 0.0;
            for(var i = 0; i < items.length; i++) {
                console.log(items[i].foodType)
                fat = fat + parseFloat(items[i].fat);
                carb = carb + parseFloat(items[i].carbohydrate);
                prot = prot + parseFloat(items[i].protein);
                if(items[i].foodType == "dinner") {
                    dinner.push(items[i]);
                }
                else if(items[i].foodType == "lunch") {
                    lunch.push(items[i]);
                }
                else if(items[i].foodType == "breakfast") {
                    breakfast.push(items[i]);
                }
                else if(items[i].foodType == "snack") {
                    snack.push(items[i]);
                }
            }
            foodLogModel.dinner = dinner;
            foodLogModel.lunch = lunch;
            foodLogModel.breakfast = breakfast;
            foodLogModel.snack = snack;
            foodLogModel.fat = fat;
            foodLogModel.carb = carb;
            foodLogModel.prot = prot;
            console.log(foodLogModel);
        }
    }

})();