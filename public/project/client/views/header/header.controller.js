(function () {
    angular
        .module("DietTrackerApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $location) {
        $scope.$location = $location;
    }

})();