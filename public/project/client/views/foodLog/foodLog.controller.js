(function () {
    angular
        .module("DietTrackerApp")
        .controller("FoodLogController", FoodLogController);

        function FoodLogController($scope, $location) {
            $scope.$location = $location;
        }

})();