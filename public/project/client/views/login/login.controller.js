(function () {

    angular
        .module("DietTrackerApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location) {
        $scope.$location = $location;
    }

}) ();