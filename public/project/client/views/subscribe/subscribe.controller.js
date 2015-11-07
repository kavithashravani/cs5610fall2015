(function () {
    angular
        .module("DietTrackerApp")
        .controller("SubscribeController", SubscribeController);

    function SubscribeController($scope, $location) {
        $scope.$location = $location;
    }

})();