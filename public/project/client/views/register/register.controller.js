(function () {

    angular
        .module("DietTrackerApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $locaiton) {
        $scope.$location = $location;
    }

})();