(function () {
    angular
        .module("DietTrackerApp")
        .controller("FoodLogController", FoodLogController);

        function FoodLogController($rootScope, $location, $routeParams, FoodLogService) {
            //$scope.$location = $location;
            var foodLogModel = this;
            var insertFoodLogItem = $rootScope.currentFoodLog;
            var userName = $routeParams["userName"];
            var date = $routeParams["date"];
            var items = [];
            var snack = [];
            var breakfast = [];
            var lunch = [];
            var dinner = [];
            function init() {
                if(insertFoodLogItem != undefined) {
                    FoodLogService.insertFoodLog(insertFoodLogItem)
                        .then(function(foodLogItem) {
                            items.push(foodLogItem);f
                            foodLogModel.logs = foodLogItem;
                            console.log(foodLogItem);
                        });
                }
                FoodLogService.findFoodLogByUserName(userName, date)
                    .then(function(foodLogItems) {
                        items = foodLogItems;
                        foodLogModel.logs = foodLogItems
                        console.log(foodLogItems);
                        for(var i = 0; i < items.length; i++) {
                            console.log(items[i].foodType)
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
                        console.log(foodLogModel);

                    });

            }
            init();




        }
})();