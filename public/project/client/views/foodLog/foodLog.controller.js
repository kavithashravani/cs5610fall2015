(function () {
    angular
        .module("DietTrackerApp")
        .controller("FoodLogController", FoodLogController)
        .controller("PieChartController", PieChartController);

        function FoodLogController($rootScope, $scope, $location, $http, $routeParams, $filter, FoodLogService) {
            var foodLogModel = this;
            $http.get("/api/loggedin/user")
                .success(function(user) {
                    if (user == '0') {
                        $location.url("/home")
                    }
                });
            var insertFoodLogItem = $rootScope.currentFoodLog;
            var userName = $routeParams["userName"];
            var date = $filter('date')(new Date(), "mediumDate");
            if(insertFoodLogItem != undefined) {
                date = insertFoodLogItem.Date;
            }
            var items = [];
            foodLogModel.deleteItem = deleteItem;
            foodLogModel.retrieveLog = retrieveLog;
            $scope.foodLogData;
            //$scope.charTab = true;

            function init() {
                if(insertFoodLogItem != undefined) {
                    FoodLogService.insertFoodLog(insertFoodLogItem)
                        .then(function(foodLogItem) {
                            items.push(foodLogItem);
                            foodLogModel.logs = items;
                            $rootScope.currentFoodLog = undefined;
                            buildCategories();
                            //console.log(foodLogItem);
                        });
                }
                FoodLogService.findFoodLogByUserName(userName, date)
                    .then(function(foodLogItems) {
                        items = foodLogItems;
                        foodLogModel.logs = items
                        //console.log(foodLogItems);
                        buildCategories();
                    });

            }
            init();

            function deleteItem(foodItemId, userName, ItemDate) {
                FoodLogService.deleteFoodLogItem(foodItemId, userName, ItemDate)
                    .then(function(foodLogItem) {
                        foodLogModel.logs = foodLogItem;
                        //console.log("after delete" + foodLogItem);
                        items = foodLogItem;
                        //console.log("after delete items" + items);
                        buildCategories();
                    });
            }

            function buildCategories() {
                var snack = [];
                var breakfast = [];
                var lunch = [];
                var dinner = [];
                var fat = 0.0, carb = 0.0, prot = 0.0;
                for(var i = 0; i < items.length; i++) {
                    //console.log(items[i].foodType)
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
                //console.log(foodLogModel);
                $scope.foodLogData = foodLogModel;
                $scope.$broadcast('changeInfoodLog', $scope.foodLogData);
            }

            function retrieveLog() {
                var selectDate = $filter('date')(foodLogModel.selectDate, "mediumDate");
                FoodLogService.findFoodLogByUserName(userName, selectDate)
                    .then(function(foodLogItems) {
                        items = foodLogItems;
                        foodLogModel.logs = foodLogItems
                        //console.log(foodLogItems);
                        buildCategories();
                    });
            }

        }

    function PieChartController($scope) {
        $scope.foodLogData;
        $scope.chartTab = true;

        $scope.$on("changeInfoodLog", function(event, foodLogData) {
            $scope.foodLogData = foodLogData;
            if($scope.foodLogData.logs.length == 0) {
                $scope.chartTab = false;
            }
            else {
                $scope.chartTab = true;
            }
            var chart1 = {};
            chart1.type = "PieChart";
            chart1.cssStyle = "height:200px; width:300px;";
            chart1.data = {
                "cols": [
                    {id: "Category", label: "Category", type: "string"},
                    {id: "breakfast", label: "breakfast", type: "number"},
                    {id: "lunch", label: "lunch", type: "number"},
                    {id: "dinner", label: "dinner", type: "number"},
                    {id: "snack", label: "snack", type: "number"}
                ], "rows": [
                    {
                        c: [
                            {v: "Fat"},
                            {v: $scope.foodLogData.fat},
                        ]
                    },
                    {
                        c: [
                            {v: "Carbohydrate"},
                            {v: $scope.foodLogData.carb},
                        ]
                    },
                    {
                        c: [
                            {v: "Protein"},
                            {v: $scope.foodLogData.prot},
                        ]
                    }
                ]
            };

            chart1.options = {
                "title": "Calorie breakdown for the day",
                "isStacked": "true",
                "fill": 20,
                "displayExactValues": true,
                "vAxis": {
                    "title": "Calories unit", "gridlines": {"count": 6}
                },
                "hAxis": {
                    "title": "Date"
                }
            };

            chart1.formatters = {};

            $scope.chart = chart1;
        });
    }
})();