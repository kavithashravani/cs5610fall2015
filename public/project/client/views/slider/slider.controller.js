(function () {
    angular
        .module("DietTrackerApp")
        .controller("SliderController", SliderController);

    function SliderController($scope, $location) {
        $scope.$location = $location;
    }

})();