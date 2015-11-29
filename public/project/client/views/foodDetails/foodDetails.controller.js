(function () {
    angular
        .module("DietTrackerApp")
        .controller("FoodDetailsController", FoodDetailsController);

    function FoodDetailsController($rootScope, $routeParams, $location, FoodDetailsService) {
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
                food_ID: null,
                foodApi_ID: foodId,
                UserName: "abc",
                Servings: foodDetailsModel.serving,
                foodType: foodDetailsModel.foodType,
                foodName: foodDetailsModel.details.recipe_name,
                calories: parseInt(foodDetailsModel.details.serving_sizes.serving.calories) * parseInt(foodDetailsModel.serving),
                Date: foodDetailsModel.logDate
            }
            $rootScope.currentFoodLog = foodLog;
            $location.url("/food-log/"+"abc"+"/"+foodDetailsModel.logDate);
        }

    }

}) ();