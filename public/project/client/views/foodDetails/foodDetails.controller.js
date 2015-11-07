(function () {
    angular
        .module("DietTrackerApp")
        .controller("FoodDetailsController", FoodDetailsController);

    function FoodDetailsController($scope, $location) {
        $scope.$location = $location;
    }

}) ();