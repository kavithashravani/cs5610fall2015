(function () {
    angular
        .module("DietTrackerApp")
        .controller("FoodDetailsController", FoodDetailsController);

    function FoodDetailsController($rootScope, $routeParams, $location, FoodDetailsService, $filter) {
        var foodDetailsModel = this;
        var foodId = $routeParams["foodId"];
        foodDetailsModel.logFood = logFood;
        function init() {
            FoodDetailsService.findDetailsById(foodId)
                .then(function(details) {
                    foodDetailsModel.details = details.recipe;
                    console.log(details);
                });
        }
        init();
        function logFood() {

            var foodLog = {
                foodApi_ID: foodId,
                UserName: $rootScope.currentUser.UserName,
                Servings: foodDetailsModel.serving,
                foodType: foodDetailsModel.foodType,
                foodName: foodDetailsModel.details.recipe_name,
                calories: (parseFloat(foodDetailsModel.details.serving_sizes.serving.calories) * parseFloat(foodDetailsModel.serving)).toString(),
                fat:    (parseFloat(foodDetailsModel.details.serving_sizes.serving.fat) * parseFloat(foodDetailsModel.serving)).toString(),
                carbohydrate: (parseFloat(foodDetailsModel.details.serving_sizes.serving.carbohydrate) * parseFloat(foodDetailsModel.serving)).toString(),
                protein: (parseFloat(foodDetailsModel.details.serving_sizes.serving.protein) * parseFloat(foodDetailsModel.serving)).toString(),
                Date: $filter('date')(foodDetailsModel.logDate, "yyyy-MM-dd")
            }
            $rootScope.currentFoodLog = foodLog;
            $location.url("/food-log/"+$rootScope.currentUser.UserName);
            //"/"+$filter('date')(foodDetailsModel.logDate, "yyyy-MM-dd")
        }

    }

}) ();